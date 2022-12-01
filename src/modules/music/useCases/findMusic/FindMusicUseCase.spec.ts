import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { MusicRepositoryInMemory } from "@modules/music/repositories/in-memory/MusicRepositoryInMemory";
import { StorageRepositoryInMemory } from "@modules/music/repositories/in-memory/StorageRepositoryInMemory";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { CreateMusicUseCase } from "@modules/music/useCases/createMusic/CreateMusicUseCase";
import { FindMusicUseCase } from "@modules/music/useCases/findMusic/FindMusicUseCase";
import { AppError } from "@shared/errors/AppError";
import { randomBytes } from "crypto";
import { join } from "path";

let repository: IMusicRepository;
let storage: IStorageRepository;
let createMusicUseCase: CreateMusicUseCase;
let findMusicUseCase: FindMusicUseCase;

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
    path: musicPath,
    size: Math.floor(Math.random() * 5000),
    mimetype: randomBytes(20).toString("hex"),
  } as Express.Multer.File,
  cover: {
    filename: randomBytes(20).toString("hex"),
    path: randomBytes(20).toString("hex"),
    mimetype: randomBytes(20).toString("hex"),
  } as Express.Multer.File,
  name: randomBytes(20).toString("hex"),
};

describe("Find Music", () => {
  beforeEach(() => {
    repository = new MusicRepositoryInMemory();
    storage = new StorageRepositoryInMemory();
    createMusicUseCase = new CreateMusicUseCase(repository, storage);
    findMusicUseCase = new FindMusicUseCase(repository);
  });

  it("Should be able to find a music by a given id", async () => {
    const createdMusic = await createMusicUseCase.execute(musicMock);

    const foundMusic = await findMusicUseCase.execute(createdMusic.id);

    expect(foundMusic).toBeInstanceOf(Music);
    expect(foundMusic).toHaveProperty("id");
    expect(foundMusic.id).toBe(createdMusic.id);
  });

  it("Should not to be able to find a music by a given id", async () => {
    await findMusicUseCase.execute("invalid music id").catch((err) => {
      expect(err).toBeInstanceOf(AppError);
    });
  });
});
