import express from "express";
import { verifyToken } from "../middleware/jwt";
import { createPostController } from "../controllers/post/post.controller";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post("/me/posts", verifyToken, upload.array("media", 10),
  createPostController
);
export default router;
