import express from "express";
import { verifyToken } from "../middleware/jwt";
import { upload } from "../middleware/multer";
import { createStoryController } from "../controllers/story/story.controller";

const router = express.Router();


router.post("/me", verifyToken, upload.single("media"), createStoryController);


export default router;
