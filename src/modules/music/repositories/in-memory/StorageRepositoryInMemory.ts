import { IUploadMusicDTO } from "@modules/music/dtos/IUploadMusicDTO";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { Readable } from "stream";

class StorageRepositoryInMemory implements IStorageRepository {
  private items: string[] = [];

  async saveObject({ fileName }: IUploadMusicDTO): Promise<string> {
    this.items.push(fileName);
    return fileName;
  }

  getObject(key: string): Readable {
    const item = this.items.find((item) => item === key);

    const readable = new Readable({
      read() {},
    });
    readable.push(item);
    readable.read(0);

    return readable;
  }
}

export { StorageRepositoryInMemory };
