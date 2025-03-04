import { Router } from "express";

const userRouter = Router();

userRouter.get("/test", (req, res) => {
  res.json({
    message: "SERVER IS WORKING",
  });
});


export default userRouter;
