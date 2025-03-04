import express from "express";
import db from "./db.js";
import userRouter from "./routers/user.route.js";
import authRouter from "./routers/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Something went wrong",
    error: process.env.NODE_ENV === "development" && err,
  });
});

app.listen(3000, () => {
  db();
  console.log("Listening at port 3000");
});
