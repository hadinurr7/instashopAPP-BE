import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getMyDetailsController, getUserDetailsController } from "../controllers/user/user.details.controller";

const router = express.Router();

router.get("/me/profile", verifyToken, getMyDetailsController);
router.get("/:username/profile", verifyToken, getUserDetailsController);

export default router;
