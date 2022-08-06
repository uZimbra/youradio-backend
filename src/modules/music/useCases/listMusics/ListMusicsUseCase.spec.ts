import { ICreateMusicDTO } from '@modules/music/dtos/ICreateMusicDTO';
import { Music } from '@modules/music/infra/typeorm/entities/Music';
import { MusicRepositoryInMemory } from '@modules/music/repositories/in-memory/MusicRepositoryInMemory';
import { IMusicRepository } from '@modules/music/repositories/IMusicRepository';
import { randomBytes } from 'crypto';

import { CreateMusicUseCase } from '../createMusic/CreateMusicUseCase';
import { ListMusicsUseCase } from './ListMusicsUseCase';

let repository: IMusicRepository;
let createMusicUseCase: CreateMusicUseCase;
let listMusicsUseCase: ListMusicsUseCase;

function musicMockFactory(): ICreateMusicDTO {
  return {
    name: randomBytes(20).toString("hex"),
    duration: randomBytes(20).toString("hex"),
    path_uri: randomBytes(20).toString("hex"),
  };
}

describe("List Musics", () => {
  beforeEach(() => {
    repository = new MusicRepositoryInMemory();
    createMusicUseCase = new CreateMusicUseCase(repository);
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
