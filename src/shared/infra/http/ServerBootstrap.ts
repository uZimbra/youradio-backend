import * as dotenv from "dotenv";
dotenv.config();

import "@shared/container";
import "@shared/infra/aws";
import "@shared/infra/typeorm";
import "express-async-errors";

import { logger } from "@utils/logger";
import cors from "cors";
import express from "express";

import { AsyncErrorHandler } from "./handler/AsyncErrorHandler";
import { router } from "./routes";


class ServerBootstrap {
  public app = express();

  constructor(private port: number = 3333) {
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(router);
    this.app.use(AsyncErrorHandler.handle);

    this.app.listen(port);
  }

  public info(): void {
    logger.info(`Server running on http://localhost:${this.port}`);
  }
}

export { ServerBootstrap };
