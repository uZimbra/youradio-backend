import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateStreamUseCase } from "./CreateStreamUseCase";

class CreateStreamController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(CreateStreamUseCase);

    const { headers, stream } = await useCase.execute(id);

    response.writeHead(200, headers);

    return stream.pipe(response);
  }
}

export { CreateStreamController };
