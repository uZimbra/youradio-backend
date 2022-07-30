import { logger } from "@utils/logger";

class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {
    logger.error(message);
  }
}

export { AppError };
