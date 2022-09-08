import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { MusicRepositoryInMemory } from "@modules/music/repositories/in-memory/MusicRepositoryInMemory";
import { StorageRepositoryInMemory } from "@modules/music/repositories/in-memory/StorageRepositoryInMemory";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { CreateMusicUseCase } from "@modules/music/useCases/createMusic/CreateMusicUseCase";
import { ListMusicsUseCase } from "@modules/music/useCases/listMusics/ListMusicsUseCase";
import { randomBytes } from "crypto";
import { join } from "path";

let repository: IMusicRepository;
let storage: IStorageRepository;
let createMusicUseCase: CreateMusicUseCase;
let listMusicsUseCase: ListMusicsUseCase;

type Request = {
  music: Express.Multer.File;
  cover: Express.Multer.File;
  name: string;
};

function musicMockFactory(): Request {
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

  return {
    music: {
      filename: randomBytes(20).toString("hex"),
      path: musicPath,
      mimetype: randomBytes(20).toString("hex"),
      size: Math.floor(Math.random() * 5000),
    } as Express.Multer.File,
    cover: {
      filename: randomBytes(20).toString("hex"),
      path: randomBytes(20).toString("hex"),
      mimetype: randomBytes(20).toString("hex"),
    } as Express.Multer.File,
    name: randomBytes(20).toString("hex"),
  };
}

describe("List Musics", () => {
  beforeEach(() => {
    repository = new MusicRepositoryInMemory();
    storage = new StorageRepositoryInMemory();
    createMusicUseCase = new CreateMusicUseCase(repository, storage);
    listMusicsUseCase = new ListMusicsUseCase(repository);
  });

  it("Should be able to list musics", async () => {
    await createMusicUseCase.execute(musicMockFactory());
    await createMusicUseCase.execute(musicMockFactory());

    const musics = await listMusicsUseCase.execute();

    expect(musics.length).toBeGreaterThan(1);
    expect(musics[0]).toBeInstanceOf(Music);
  });
});
