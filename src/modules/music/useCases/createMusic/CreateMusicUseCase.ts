import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { AppError } from "@shared/errors/AppError";
import { getMusicDuration } from "@utils/getMusicDurations";
import { uploadFileToS3 } from "@utils/uploadFileToS3";
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
    private repository: IMusicRepository
  ) {}

  async execute({ music, cover, name }: Request): Promise<Music> {
    const musicAlreadyExists = await this.repository.findByName(name);

    if (musicAlreadyExists) {
      throw new AppError("A music with this name already exists!", 400);
    }

    const duration = await getMusicDuration(music.path);

    await uploadFileToS3(
      music.filename,
      music.path,
      music.mimetype,
      process.env.AWS_S3_MUSIC_BUCKET
    );

    const coverUri = await uploadFileToS3(
      cover.filename,
      cover.path,
      cover.mimetype,
      process.env.AWS_S3_COVER_BUCKET
    );

    const musicToSave = {
      name,
      duration,
      coverUri,
      musicKey: music.filename,
      size: music.size,
      type: music.mimetype,
    } as ICreateMusicDTO;

    return this.repository.create(musicToSave);
  }
}

export { CreateMusicUseCase };
