import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { MusicRepositoryInMemory } from "@modules/music/infra/typeorm/repositories/in-memory/MusicRepositoryInMemory";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { randomBytes } from "crypto";

import { CreateMusicUseCase } from "./CreateMusicUseCase";

let repository: IMusicRepository;
let useCase: CreateMusicUseCase;

const musicMock: ICreateMusicDTO = {
  name: randomBytes(20).toString("hex"),
  duration: randomBytes(20).toString("hex"),
  path_uri: randomBytes(20).toString("hex"),
};

describe("Create Music", () => {
  beforeEach(() => {
    repository = new MusicRepositoryInMemory();
    useCase = new CreateMusicUseCase(repository);
  });

  it("Should be able to create a new music", async () => {
    const music = await repository.create(musicMock);

    expect(music).toBeInstanceOf(Music);
    expect(music).toHaveProperty("id");
    expect(music.name).toBe(musicMock.name);
  });
});
