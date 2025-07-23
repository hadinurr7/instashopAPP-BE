import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getFeedPostsController, getFeedStoriesController } from "../controllers/feed/feeds.conmtroller";


const router = express.Router();

router.get("/feeds/post", verifyToken, getFeedPostsController);
router.get("/feeds/stories", verifyToken, getFeedStoriesController);


export default router;
