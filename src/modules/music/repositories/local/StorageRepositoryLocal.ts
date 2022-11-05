import { IUploadMusicDTO } from "@modules/music/dtos/IUploadMusicDTO";
import { createReadStream } from "fs";
import { join } from "path";
import { Readable } from "stream";
import { IStorageRepository } from "../IStorageRepository";

class StorageRepositoryLocal implements IStorageRepository {
  async saveObject(data: IUploadMusicDTO): Promise<string> {
    const { fileName } = data;

    return fileName;
  }

  getObject(key: string): Readable {
    const musicPath = join(__dirname, "..", "..", "..", "..", "..", "tmp", key);
    return createReadStream(musicPath);
  }
}

export { StorageRepositoryLocal };
