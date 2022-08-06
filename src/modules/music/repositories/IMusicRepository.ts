import { ICreateMusicDTO } from "../dtos/ICreateMusicDTO";
import { Music } from "../infra/typeorm/entities/Music";

interface IMusicRepository {
  create(data: ICreateMusicDTO): Promise<Music>;
  listAll(): Promise<Music[]>;
  find(id: string): Promise<Music>;
  findByName(name: string): Promise<Music>;
}

export { IMusicRepository };
