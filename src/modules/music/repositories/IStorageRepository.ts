import { IUploadMusicDTO } from "@modules/music/dtos/IUploadMusicDTO";
import { Readable } from "stream";

interface IStorageRepository {
  saveObject(data: IUploadMusicDTO): Promise<string>;
  getObject(key: string): Readable;
}

export { IStorageRepository };
