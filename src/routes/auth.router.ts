import express from "express";
import { forgotPasswordController, loginUserController, registerUserController } from "../controllers/auth/auth.controller";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.post("/forgot-password", forgotPasswordController);


export default router;
