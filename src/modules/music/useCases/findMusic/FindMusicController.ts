import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindMusicUseCase } from "./FindMusicUseCase";

class FindMusicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(FindMusicUseCase);

    const music = await useCase.execute(id);

    return response.json(music);
  }
}

export { FindMusicController };
