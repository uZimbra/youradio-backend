import "reflect-metadata";

import { logger } from "@utils/logger";
import path from "path";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.AWS_RDS_DB_HOST,
  port: Number(process.env.AWS_RDS_DB_PORT),
  username: process.env.AWS_RDS_DB_USER,
  password: process.env.AWS_RDS_DB_PASSWORD,
  database: process.env.AWS_RDS_DB_DATABASE,
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
