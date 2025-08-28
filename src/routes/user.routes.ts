import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getMyDetailsController, getUserDetailsController, updateUserDetailsController } from "../controllers/user/user.details.controller";

const router = express.Router();

router.get("/me/profile", verifyToken, getMyDetailsController);
router.get("/:username/profile", verifyToken, getUserDetailsController);
router.patch("/me/profile", verifyToken, updateUserDetailsController);

export default router;
