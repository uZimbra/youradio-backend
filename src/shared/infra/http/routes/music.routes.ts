import { CreateMusicController } from "@modules/music/useCases/createMusic/CreateMusicController";
import { FindMusicController } from "@modules/music/useCases/findMusic/FindMusicController";
import { ListMusicsController } from "@modules/music/useCases/listMusics/ListMusicsController";
import { Router } from "express";

const musicRoutes = Router();

const createMusicController = new CreateMusicController();
const findMusicController = new FindMusicController();
const listMusicController = new ListMusicsController();

musicRoutes.get("/", listMusicController.handle);
musicRoutes.get("/:id", findMusicController.handle);
musicRoutes.post("/", createMusicController.handle);

export { musicRoutes };
