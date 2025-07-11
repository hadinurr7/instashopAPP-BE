import express from "express";
import { forgotPasswordController, loginUserController, registerUserController, resetPasswordController } from "../controllers/auth/auth.controller";
import { verifyTokenReset } from "../middleware/jwt";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password",verifyTokenReset, resetPasswordController)


export default router;
