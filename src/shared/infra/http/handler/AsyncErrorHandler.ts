import { AppError } from "@shared/errors/AppError";
import { logger } from "@utils/logger";
import { NextFunction, Request, Response } from "express";

class AsyncErrorHandler {
  static handle(err: Error, _: Request, response: Response, _next: NextFunction) {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
        code: err.statusCode,
      });
    }

    logger.error(err.message);

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
}

export { AsyncErrorHandler };
