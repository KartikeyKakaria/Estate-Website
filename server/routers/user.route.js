import { Router } from "express";
import { updateUser, deleteUser, getUserListing } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.util.js";

const userRouter = Router();

userRouter.get("/test", (req, res) => {
  res.json({
    message: "SERVER IS WORKING",
  });
});

userRouter.post("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListing)

export default userRouter;
