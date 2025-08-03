import express from "express";
import { verifyToken } from "../middleware/jwt";
import { createCommentController, replyCommentController } from "../controllers/comment/comment.controller";

const router = express.Router();

router.post("/", verifyToken, createCommentController);
router.post("/:commentId/reply", verifyToken, replyCommentController);


export default router;
