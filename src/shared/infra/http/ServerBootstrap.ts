import "@shared/container";
import "@shared/infra/typeorm";
import "express-async-errors";

import { logger } from "@utils/logger";
import express from "express";

import { AsyncErrorHandler } from "./handler/AsyncErrorHandler";
import { router } from "./routes";

const asyncErrorHandler = new AsyncErrorHandler();

class ServerBootstrap {
  public app = express();

  constructor(private port: number = 3333) {
    this.app.use(express.json());
    this.app.use(router);
    this.app.use(asyncErrorHandler.handle);

    this.app.listen(port);
  }

  public info(): void {
    logger.info(`Server running on http://localhost:${this.port}`);
  }
}

export { ServerBootstrap };
