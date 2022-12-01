import { musicRoutes } from "@shared/infra/http/routes/music.routes";
import { routeBuilder } from "@utils/routeBuilder";
import { Router } from "express";

const router = Router();

router.use(routeBuilder("v1", "musics"), musicRoutes);

export { router };
