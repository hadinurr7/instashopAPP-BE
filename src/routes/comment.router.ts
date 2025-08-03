import express from "express";
import { verifyToken } from "../middleware/jwt";
import { createCommentController } from "../controllers/comment/comment.controller";

const router = express.Router();

router.post("/", verifyToken, createCommentController);

export default router;
