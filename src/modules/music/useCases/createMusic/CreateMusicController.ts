import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMusicUseCase } from "./CreateMusicUseCase";

class CreateMusicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, duration, uri, cover_uri } = request.body;

    const useCase = container.resolve(CreateMusicUseCase);

    const createdMusic = await useCase.execute({ name, duration, uri, cover_uri });

    return response.status(200).json(createdMusic);
  }
}

export { CreateMusicController };
