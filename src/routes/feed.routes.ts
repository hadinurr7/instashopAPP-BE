import express from "express";
import { verifyToken } from "../middleware/jwt";

import { getFeedsController } from "../controllers/feed/feeds.conmtroller";

const router = express.Router();

router.get("/feeds", verifyToken, getFeedsController);

export default router;
