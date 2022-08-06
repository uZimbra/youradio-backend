import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListMusicsUseCase } from "./ListMusicsUseCase";

class ListMusicsController {
  async handle(_: Request, response: Response): Promise<Response> {
    const useCase = container.resolve(ListMusicsUseCase);

    const musics = await useCase.execute();

    return response.status(200).json(musics);
  }
}

export { ListMusicsController };
