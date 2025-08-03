import express from "express";
import { verifyToken } from "../middleware/jwt";
import { toggleFollowController } from "../controllers/follow/follow.controller";

const router = express.Router();

router.post("/:id/toggle", verifyToken, toggleFollowController);

export default router;
