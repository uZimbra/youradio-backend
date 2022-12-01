import { IUploadMusicDTO } from "@modules/music/dtos/IUploadMusicDTO";
import { IStorageRepository } from "@modules/music/repositories/IStorageRepository";
import { logger } from "@utils/logger";
import { S3 } from "aws-sdk";
import { readFileSync, unlink } from "fs";
import { Readable } from "stream";

class StorageRepository implements IStorageRepository {
  private S3 = new S3();

  async saveObject({
    fileName,
    filePath,
    mimetype,
    bucket,
  }: IUploadMusicDTO): Promise<string> {
    const file = readFileSync(filePath);

    const params: S3.PutObjectRequest = {
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ContentType: mimetype,
    };

    const { Location } = await this.S3.upload(params).promise();

    if (Location) {
      unlink(filePath, (err) => {
        if (err) {
          logger.error(
            `Error when trying to remove an uploaded file: ${filePath}, error: ${err.message}`
          );
          throw new Error("Internal Error");
        }
      });
    }

    return Location;
  }

  getObject(key: string): Readable {
    const params: S3.GetObjectRequest = {
      Bucket: process.env.AWS_S3_MUSIC_BUCKET,
      Key: key,
    };

    return this.S3.getObject(params).createReadStream();
  }
}

export { StorageRepository };
