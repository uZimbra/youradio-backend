import { StorageRepository } from "@modules/music/infra/s3/repositories/StorageRepository";
import { MusicRepository } from "@modules/music/infra/typeorm/repositories/MusicRepository";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { container } from "tsyringe";

container.register<IMusicRepository>("MusicRepository", MusicRepository);
container.register<IStorageRepository>("StorageRepository", StorageRepository);
