import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindMusicUseCase {
  constructor(
    @inject("MusicRepository")
    private repository: IMusicRepository
  ) {}

  async execute(id: string): Promise<Music> {
    const music = await this.repository.findById(id);

    if (!music) {
      throw new AppError("Music not found!", 404);
    }

    return music;
  }
}

export { FindMusicUseCase };
