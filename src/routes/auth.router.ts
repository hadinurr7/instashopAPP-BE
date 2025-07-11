import express from "express";
import { registerUserController } from "../controllers/auth/auth.controller";

const router = express.Router();

router.post("/register", registerUserController);


export default router;
