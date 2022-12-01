import { uploadConfig } from "@config/upload";
import { CreateMusicController } from "@modules/music/useCases/createMusic/CreateMusicController";
import { CreateStreamController } from "@modules/music/useCases/createStream/CreateStreamController";
import { FindMusicController } from "@modules/music/useCases/findMusic/FindMusicController";
import { ListMusicsController } from "@modules/music/useCases/listMusics/ListMusicsController";
import { Router } from "express";
import multer from "multer";

const router = Router();

const uploadMusic = multer(uploadConfig("./tmp"));

router.get("/", ListMusicsController.handle);
router.get("/:id", FindMusicController.handle);
router.post(
  "/",
  uploadMusic.fields([
    { name: "file", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  CreateMusicController.handle
);
router.get("/stream/:id", CreateStreamController.handle);

export { router as musicRoutes };
