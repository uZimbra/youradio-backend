import { IMusicRepository } from "@modules/music/repositories/IMusicRepository";
import { AppError } from "@shared/errors/AppError";
import { S3 } from "aws-sdk";
import { IncomingHttpHeaders } from "http";
import { Readable } from "stream";
import { inject, injectable } from "tsyringe";

type Response = {
  headers: IncomingHttpHeaders;
  stream: Readable;
};

@injectable()
class CreateStreamUseCase {
  constructor(
    @inject("MusicRepository")
    private repository: IMusicRepository
  ) {}

  async execute(musicId: string): Promise<Response> {
    const s3 = new S3();
    const music = await this.repository.findById(musicId);

    if (!music) {
      throw new AppError("Music with this id does not exists!", 404);
    }

    const headers = {
      "Accept-Ranges": "bytes",
      "Content-Type": music.type,
      "Content-Length": music.size.toString(),
    };

    const params = {
      Bucket: process.env.AWS_S3_MUSIC_BUCKET,
      Key: music.musicKey,
    };

    return {
      headers,
      stream: s3.getObject(params).createReadStream(),
    };
  }
}

export { CreateStreamUseCase };
