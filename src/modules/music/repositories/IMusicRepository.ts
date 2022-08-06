import { ICreateMusicDTO } from "../dtos/ICreateMusicDTO";
import { Music } from "../infra/typeorm/entities/Music";

interface IMusicRepository {
  create(data: ICreateMusicDTO): Promise<Music>;
  listAll(): Promise<Music[]>;
  findById(id: string): Promise<Music>;
  findByName(name: string): Promise<Music>;
}

export { IMusicRepository };
