import { Router } from "express";
import { signup, signin, google } from "../controllers/auth.conroller.js";

const authRouter = Router();

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/google', google)

export default authRouter