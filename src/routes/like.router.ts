import { Router } from "express";
import { verifyToken } from "../middleware/jwt";
import { toggleLikeController } from "../controllers/like/like.controller";

const router = Router();

router.post("/:type/:id/toggle", verifyToken, toggleLikeController);

export default router;
