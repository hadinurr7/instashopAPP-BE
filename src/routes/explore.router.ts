import express from "express";
import { getExplorePostsController } from "../controllers/explore/explore.controller";

const router = express.Router();

router.get("/", getExplorePostsController);


export default router;
