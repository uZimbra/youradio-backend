import { Router } from "express";

const musicRoutes = Router();

musicRoutes.get("/", (_, res) => {
  return res.json({
    playing: "true",
  });
});

export { musicRoutes };
