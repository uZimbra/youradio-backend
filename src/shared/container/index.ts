import { MusicRepository } from "@modules/music/infra/typeorm/repositories/MusicRepository";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { StorageRepositoryLocal } from "@modules/music/repositories/local/StorageRepositoryLocal";
import { container } from "tsyringe";

container.register<IMusicRepository>("MusicRepository", MusicRepository);
container.register<IStorageRepository>(
  "StorageRepository",
  StorageRepositoryLocal
);
