import { IUploadMusicDTO } from "@modules/music/dtos/IUploadMusicDTO";
import { IStorageRepository } from "../IStorageRepository";
import { Readable } from "stream";
import { createReadStream } from "fs";

class StorageRepositoryLocal implements IStorageRepository {
  async saveObject(data: IUploadMusicDTO): Promise<string> {
    const { fileName } = data;

    return fileName;
  }

  getObject(key: string): Readable {
    const musicPath = `/youradio/tmp/${key}`;
    return createReadStream(musicPath);
  }
}

export { StorageRepositoryLocal };
