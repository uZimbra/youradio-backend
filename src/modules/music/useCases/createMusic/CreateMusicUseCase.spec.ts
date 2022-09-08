import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { MusicRepositoryInMemory } from "@modules/music/repositories/in-memory/MusicRepositoryInMemory";
import { StorageRepositoryInMemory } from "@modules/music/repositories/in-memory/StorageRepositoryInMemory";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { CreateMusicUseCase } from "@modules/music/useCases/createMusic/CreateMusicUseCase";
import { AppError } from "@shared/errors/AppError";
import { randomBytes } from "crypto";
import { join } from "path";

let repository: IMusicRepository;
let storage: IStorageRepository;
let useCase: CreateMusicUseCase;

type Request = {
  music: Express.Multer.File;
  cover: Express.Multer.File;
  name: string;
};

const musicPath = join(
  __dirname,
  "..",
  "..",
  "..",
  "..",
  "..",
  "mocks",
  "audio mock.mp3"
);

const musicMock: Request = {
  music: {
    filename: randomBytes(20).toString("hex"),
    size: Math.floor(Math.random() * 5000),
    path: musicPath,
    mimetype: randomBytes(20).toString("hex"),
  } as Express.Multer.File,
  cover: {
    filename: randomBytes(20).toString("hex"),
    path: randomBytes(20).toString("hex"),
    mimetype: randomBytes(20).toString("hex"),
  } as Express.Multer.File,
  name: randomBytes(20).toString("hex"),
};

describe("Create Music", () => {
  beforeEach(() => {
    repository = new MusicRepositoryInMemory();
    storage = new StorageRepositoryInMemory();
    useCase = new CreateMusicUseCase(repository, storage);
  });

  it("Should be able to create a new music", async () => {
    const music = await useCase.execute(musicMock);

    expect(music).toBeInstanceOf(Music);
    expect(music).toHaveProperty("id");
    expect(music).toHaveProperty("duration");
    expect(music).toHaveProperty("coverUri");
    expect(music).toHaveProperty("musicKey");
    expect(music).toHaveProperty("size");
    expect(music).toHaveProperty("type");
    expect(music).toHaveProperty("createdAt");
    expect(music.name).toBe(musicMock.name);
  });

  it("Should not to be able to create a new music with same name", async () => {
    await useCase.execute(musicMock);

    await useCase.execute(musicMock).catch((err) => {
      expect(err).toBeInstanceOf(AppError);
    });
  });

  it("Should not to be able to create a music without duration", async () => {
    await useCase
      .execute({ ...musicMock, music: {} } as Request)
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
  });
});
