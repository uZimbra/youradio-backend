import { ICreateMusicDTO } from "../dtos/ICreateMusicDTO";
import { Music } from "../infra/typeorm/entities/Music";

interface IMusicRepository {
  create(data: ICreateMusicDTO): Promise<Music>;
  listAll(): Promise<Music[]>;
}

export { IMusicRepository };
