import express from "express";
import { verifyToken } from "../middleware/jwt";
import { createPostController, deletePostController, getMyPostsController, getUserPostsController, updatePostController } from "../controllers/post/post.controller";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post("/me/posts", verifyToken, upload.array("media", 10),
  createPostController);


router.get("/me/posts", verifyToken, getMyPostsController);
router.get("/:username/posts", verifyToken, getUserPostsController);

router.patch(
  "/me/posts/:id",
  verifyToken,
  upload.array("media", 10),
  updatePostController
);

router.patch("/me/posts/:id/delete", verifyToken, deletePostController);

export default router;
