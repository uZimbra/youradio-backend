import { CreateStreamUseCase } from "@modules/music/useCases/createStream/CreateStreamUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

class CreateStreamController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const useCase = container.resolve(CreateStreamUseCase);

    const { audioSize, audioMimetype, stream } = await useCase.execute(id);

    const headers = {
      "Accept-Ranges": "bytes",
      "Content-Type": audioMimetype,
      "Content-Length": audioSize,
    };

    response.writeHead(200, headers);

    return stream.pipe(response);
  }
}

export { CreateStreamController };
