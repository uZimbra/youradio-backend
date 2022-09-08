import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { randomUUID } from "crypto";

class MusicRepositoryInMemory implements IMusicRepository {
  private musics: Array<Music> = [];

  async create(data: ICreateMusicDTO): Promise<Music> {
    const music = new Music();

    Object.assign(music, {
      id: randomUUID(),
      createdAt: Date.now(),
      ...data,
    });

    this.musics.push(music);

    return music;
  }

  async listAll(): Promise<Music[]> {
    return this.musics;
  }

  async findById(id: string): Promise<Music> {
    return this.musics.find((music) => music.id === id);
  }

  async findByName(name: string): Promise<Music> {
    return this.musics.find((music) => music.name === name);
  }
}

export { MusicRepositoryInMemory };
