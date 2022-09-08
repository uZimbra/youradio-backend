import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { AppError } from "@shared/errors/AppError";
import { Readable } from "stream";
import { inject, injectable } from "tsyringe";

type Response = {
  audioMimetype: string;
  audioSize: string;
  stream: Readable;
};

@injectable()
class CreateStreamUseCase {
  constructor(
    @inject("MusicRepository")
    private repository: IMusicRepository,
    @inject("StorageRepository")
    private storage: IStorageRepository
  ) {}

  async execute(musicId: string): Promise<Response> {
    const music = await this.repository.findById(musicId);

    if (!music) {
      throw new AppError("Music with this id does not exists!", 404);
    }

    const stream = this.storage.getObject(music.musicKey);

    return {
      audioSize: music.size.toString(),
      audioMimetype: music.type,
      stream,
    };
  }
}

export { CreateStreamUseCase };
