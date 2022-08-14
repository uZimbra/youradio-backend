import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { MusicRepositoryInMemory } from "@modules/music/repositories/in-memory/MusicRepositoryInMemory";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { AppError } from "@shared/errors/AppError";
import { randomBytes } from "crypto";

import { CreateMusicUseCase } from "./CreateMusicUseCase";

let repository: IMusicRepository;
let useCase: CreateMusicUseCase;

const musicMock: ICreateMusicDTO = {
  name: randomBytes(20).toString("hex"),
  duration: randomBytes(20).toString("hex"),
  uri: randomBytes(20).toString("hex"),
  cover_uri: randomBytes(20).toString("hex"),
};

describe("Create Music", () => {
  beforeEach(() => {
    repository = new MusicRepositoryInMemory();
    useCase = new CreateMusicUseCase(repository);
  });

  it("Should be able to create a new music", async () => {
    const music = await useCase.execute(musicMock);

    expect(music).toBeInstanceOf(Music);
    expect(music).toHaveProperty("id");
    expect(music).toHaveProperty("created_at");
    expect(music.name).toBe(musicMock.name);
    expect(music.duration).toBe(musicMock.duration);
    expect(music.uri).toBe(musicMock.uri);
    expect(music.cover_uri).toBe(musicMock.cover_uri);
  });

  it("Should not to be able to create a new music with same name", () => {
    expect(async () => {
      await useCase.execute(musicMock);
      await useCase.execute(musicMock);
    }).rejects.toBeInstanceOf(AppError);
  });
});
