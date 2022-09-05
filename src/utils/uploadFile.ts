import { S3 } from "aws-sdk";
import { readFileSync, unlink } from "fs";

import { logger } from "./logger";

async function uploadFile(
  fileName: string,
  filePath: string,
  mimetype: string
): Promise<string> {
  const s3 = new S3();

  const file = readFileSync(filePath);

  const params: S3.PutObjectRequest = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: fileName,
    Body: file,
    ContentType: mimetype,
  };

  const { Location } = await s3.upload(params).promise();

  if (Location) {
    unlink(filePath, (err) => {
      if (err) logger.error(err.message);
    });
  }

  return Location;
}

export { uploadFile };
