import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListMusicsUseCase {
  constructor(
    @inject("MusicRepository")
    private repository: IMusicRepository
  ) {}

  async execute(): Promise<Array<Music>> {
    return this.repository.listAll();
  }
}

export { ListMusicsUseCase };
