import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { Repository } from "typeorm";

import { Music } from "../entities/Music";

class MusicRepository implements IMusicRepository {
  constructor(private repository: Repository<Music>) {}

  create(data: ICreateMusicDTO): Promise<Music> {
    const music = this.repository.create(data);

    return this.repository.save(music);
  }

  listAll(): Promise<Music[]> {
    return this.repository.find();
  }
}

export { MusicRepository };
