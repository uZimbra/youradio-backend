import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { AppError } from "@shared/errors/AppError";
import { getMusicDuration } from "@utils/getMusicDurations";
import { inject, injectable } from "tsyringe";

type Request = {
  music: Express.Multer.File;
  cover: Express.Multer.File;
  name: string;
};

@injectable()
class CreateMusicUseCase {
  constructor(
    @inject("MusicRepository")
    private repository: IMusicRepository,
    @inject("StorageRepository")
    private storage: IStorageRepository
  ) {}

  async execute({ music, cover, name }: Request): Promise<Music> {
    const musicAlreadyExists = await this.repository.findByName(name);

    if (musicAlreadyExists) {
      throw new AppError("A music with this name already exists!", 400);
    }

    const duration = await getMusicDuration(music.path);

    await this.storage.saveObject({
      fileName: music.filename,
      filePath: music.path,
      mimetype: music.mimetype,
      bucket: process.env.AWS_S3_MUSIC_BUCKET,
    });

    await this.storage.saveObject({
      fileName: cover.filename,
      filePath: cover.path,
      mimetype: cover.mimetype,
      bucket: process.env.AWS_S3_COVER_BUCKET,
    });

    return this.repository.create({
      name,
      duration,
      coverUri: cover.filename,
      musicKey: music.filename,
      size: music.size,
      type: music.mimetype,
    } as ICreateMusicDTO);
  }
}

export { CreateMusicUseCase };
