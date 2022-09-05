import { S3 } from "aws-sdk";
import { readFileSync, unlink } from "fs";

import { logger } from "./logger";

async function uploadFileToS3(
  fileName: string,
  filePath: string,
  mimetype: string,
  bucket: string
): Promise<string> {
  const s3 = new S3();

  const file = readFileSync(filePath);

  const params: S3.PutObjectRequest = {
    Bucket: bucket,
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

export { uploadFileToS3 };
