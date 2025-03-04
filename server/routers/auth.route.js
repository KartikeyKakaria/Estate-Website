import { Router } from "express";
import { signup } from "../controllers/auth.conroller.js";

const authRouter = Router();

authRouter.post('/signup', signup)

export default authRouter