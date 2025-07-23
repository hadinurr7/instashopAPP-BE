import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getFeedPostsController, getFeedStoriesController } from "../controllers/feed/feeds.conmtroller";


const router = express.Router();

router.get("/post", verifyToken, getFeedPostsController);
router.get("/stories", verifyToken, getFeedStoriesController);


export default router;
