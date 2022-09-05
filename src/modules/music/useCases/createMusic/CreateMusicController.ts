import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMusicUseCase } from "./CreateMusicUseCase";

class CreateMusicController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const music = request.files["file"][0];
    const cover = request.files["cover"][0];

    const useCase = container.resolve(CreateMusicUseCase);

    const createdMusic = await useCase.execute({
      music,
      cover,
      name,
    });

    return response.status(200).json(createdMusic);
  }
}

export { CreateMusicController };
