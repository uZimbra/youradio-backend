import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { MusicRepositoryInMemory } from "@modules/music/repositories/in-memory/MusicRepositoryInMemory";
import { StorageRepositoryInMemory } from "@modules/music/repositories/in-memory/StorageRepositoryInMemory";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { CreateMusicUseCase } from "@modules/music/useCases/createMusic/CreateMusicUseCase";
import { CreateStreamUseCase } from "@modules/music/useCases/createStream/CreateStreamUseCase";
import { AppError } from "@shared/errors/AppError";
import { randomBytes } from "crypto";
import { join } from "path";
import { Readable } from "stream";

let storage: IStorageRepository;
let repository: IMusicRepository;
let createMusicUseCase: CreateMusicUseCase;
let createStreamUseCase: CreateStreamUseCase;

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
    filename: `music ${randomBytes(20).toString("hex")}`,
    path: musicPath,
    size: Math.floor(Math.random() * 5000),
    mimetype: randomBytes(20).toString("hex"),
  } as Express.Multer.File,
  cover: {
    filename: `cover ${randomBytes(20).toString("hex")}`,
    path: randomBytes(20).toString("hex"),
    mimetype: randomBytes(20).toString("hex"),
  } as Express.Multer.File,
  name: randomBytes(20).toString("hex"),
};

describe("Create music stream", () => {
  beforeEach(() => {
    storage = new StorageRepositoryInMemory();
    repository = new MusicRepositoryInMemory();

    createMusicUseCase = new CreateMusicUseCase(repository, storage);
    createStreamUseCase = new CreateStreamUseCase(repository, storage);
  });

  it("Should not to be able to create a stream", async () => {
    await createStreamUseCase.execute("invalid music id").catch((err) => {
      expect(err).toBeInstanceOf(AppError);
    });
  });

  it("Should be able to create a stream", async () => {
    const music = await createMusicUseCase.execute(musicMock);

    const stream = await createStreamUseCase.execute(music.id);

    expect(stream).toHaveProperty("audioMimetype");
    expect(stream).toHaveProperty("audioSize");
    expect(stream).toHaveProperty("stream");

    expect(stream.stream).toBeInstanceOf(Readable);
    expect(stream.stream.readable).toBe(true);
  });
});
