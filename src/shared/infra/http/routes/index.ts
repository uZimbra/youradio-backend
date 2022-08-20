import { routeBuilder } from "@utils/routeBuilder";
import { Router } from "express";

import { musicRoutes } from "./music.routes";

const router = Router();

router.use(routeBuilder("v1", "music"), musicRoutes);

export { router };
