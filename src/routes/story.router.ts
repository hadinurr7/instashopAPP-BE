import express from "express";
import { verifyToken } from "../middleware/jwt";
import { upload } from "../middleware/multer";
import { createStoryController, getFollowingStoriesController, getMyStoriesController, getUserStoriesController } from "../controllers/story/story.controller";

const router = express.Router();


router.post("/me", verifyToken, upload.single("media"), createStoryController);
router.get("/me/stories", verifyToken, getMyStoriesController);
router.get("/followings", verifyToken, getFollowingStoriesController);
router.get("/user/:id", getUserStoriesController);
export default router;
