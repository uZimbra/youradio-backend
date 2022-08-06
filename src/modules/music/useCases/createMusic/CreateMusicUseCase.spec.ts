import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { MusicRepositoryInMemory } from "@modules/music/infra/typeorm/repositories/in-memory/MusicRepositoryInMemory";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { CreateMusicUseCase } from "./CreateMusicUseCase";
import { randomBytes } from "crypto";
import { Music } from "@modules/music/infra/typeorm/entities/Music";

let repository: IMusicRepository;
let useCase: CreateMusicUseCase;

const musicMock: ICreateMusicDTO = {
  name: randomBytes(20).toString(),
  duration: randomBytes(20).toString(),
  path_uri: randomBytes(20).toString(),
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
