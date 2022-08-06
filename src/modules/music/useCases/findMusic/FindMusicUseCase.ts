import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindMusicUseCase {
  constructor(
    @inject("MusicRepository")
    private repository: IMusicRepository
  ) {}

  async execute(id: string): Promise<Music> {
    return this.repository.findById(id);
  }
}

export { FindMusicUseCase };
