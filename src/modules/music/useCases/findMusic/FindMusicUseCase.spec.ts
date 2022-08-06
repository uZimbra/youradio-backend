import { ICreateMusicDTO } from "@modules/music/dtos/ICreateMusicDTO";
import { Music } from "@modules/music/infra/typeorm/entities/Music";
import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { MusicRepositoryInMemory } from "@modules/music/repositories/in-memory/MusicRepositoryInMemory";
import { randomBytes } from "crypto";

import { CreateMusicUseCase } from "../createMusic/CreateMusicUseCase";
import { FindMusicUseCase } from "./FindMusicUseCase";

let repository: IMusicRepository;
let createMusicUseCase: CreateMusicUseCase;
let findMusicUseCase: FindMusicUseCase;

const musicMock: ICreateMusicDTO = {
  name: randomBytes(20).toString("hex"),
  duration: randomBytes(20).toString("hex"),
  path_uri: randomBytes(20).toString("hex"),
};

describe("Find Music", () => {
  beforeEach(() => {
    repository = new MusicRepositoryInMemory();
    createMusicUseCase = new CreateMusicUseCase(repository);
    findMusicUseCase = new FindMusicUseCase(repository);
  });

  it("Should be able to find a music by a given id", async () => {
    const createdMusic = await createMusicUseCase.execute(musicMock);

    const foundMusic = await findMusicUseCase.execute(createdMusic.id);

    expect(foundMusic).toBeInstanceOf(Music);
    expect(foundMusic).toHaveProperty("id");
  });
});
