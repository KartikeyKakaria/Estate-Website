import { Router } from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.util.js";

const userRouter = Router();

userRouter.get("/test", (req, res) => {
  res.json({
    message: "SERVER IS WORKING",
  });
});

userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);

export default userRouter;
