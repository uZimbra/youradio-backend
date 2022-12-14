import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { AppDataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";

import { Music } from "../entities/Music";

class MusicRepository implements IMusicRepository {
  private repository: Repository<Music> = AppDataSource.getRepository(Music);

  create(data: ICreateMusicDTO): Promise<Music> {
    const music = this.repository.create(data);

    return this.repository.save(music);
  }

  listAll(): Promise<Music[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Music> {
    return this.repository.findOne({ where: { id } });
  }

  findByName(name: string): Promise<Music> {
    return this.repository.findOne({ where: { name } });
  }
}

export { MusicRepository };
