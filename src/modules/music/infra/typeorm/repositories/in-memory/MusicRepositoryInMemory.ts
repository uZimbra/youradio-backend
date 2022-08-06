import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { randomUUID } from "crypto";

import { Music } from "../../entities/Music";

class MusicRepositoryInMemory implements IMusicRepository {
  private musics: Array<Music> = [];

  async create(data: ICreateMusicDTO): Promise<Music> {
    const music = new Music();

    Object.assign(music, {
      id: randomUUID(),
      created_at: Date.now(),
      ...data,
    });

    this.musics.push(music);

    return music;
  }

  async listAll(): Promise<Music[]> {
    return this.musics;
  }

  find(id: string): Promise<Music> {
    throw new Error("Method not implemented.");
  }

  findByName(name: string): Promise<Music> {
    throw new Error("Method not implemented.");
  }
}

export { MusicRepositoryInMemory };
