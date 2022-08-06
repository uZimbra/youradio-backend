import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateMusicUseCase {
  constructor(
    @inject("MusicRepository")
    private repository: IMusicRepository
  ) {}

  async execute(data: ICreateMusicDTO): Promise<Music> {
    const musicAlreadyExists = await this.repository.findByName(data.name);

    if (musicAlreadyExists) {
      throw new AppError("A music with this name already exists!", 400);
    }

    return this.repository.create(data);
  }
}

export { CreateMusicUseCase };
