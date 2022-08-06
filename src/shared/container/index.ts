import { MusicRepository } from "@modules/music/infra/typeorm/repositories/MusicRepository";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { container } from "tsyringe";

container.register<IMusicRepository>("MusicRepository", MusicRepository);
