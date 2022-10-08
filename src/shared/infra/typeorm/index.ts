import "reflect-metadata";

import { logger } from "@utils/logger";
import path from "path";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join("./src/database/database.sqlite"),
  synchronize: true,
  entities: [
    path.join(
      __dirname,
      "..",
      "..",
      "..",
      "modules",
      "**",
      "infra",
      "typeorm",
      "entities",
      "*.{ts,js}"
    ),
  ],
});

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
    logger.info("Database has been connected!");
  })
  .catch((err) => {
    logger.error("Error during connection with database!");
    logger.error(err);
  });

export { AppDataSource };
