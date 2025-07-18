import express from "express";
import { verifyToken } from "../middleware/jwt";
import { upload } from "../middleware/multer";
import { createStoryController, getMyStoriesController } from "../controllers/story/story.controller";

const router = express.Router();


router.post("/me", verifyToken, upload.single("media"), createStoryController);
router.get("/me/stories", verifyToken, getMyStoriesController);

export default router;
