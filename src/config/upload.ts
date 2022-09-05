import { getFileExtension } from "@utils/getFileExtension";
import { randomBytes } from "crypto";
import { diskStorage } from "multer";
import { resolve } from "path";

function uploadConfig(path: string) {
  return {
    storage: diskStorage({
      destination: resolve(__dirname, "..", "..", path),
      filename: (_, file, callback) => {
        const hashedFileName = `${randomBytes(32).toString(
          "hex"
        )}.${getFileExtension(file.originalname)}`;

        return callback(null, hashedFileName);
      },
    }),
  };
}

export { uploadConfig };
