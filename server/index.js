import express from "express";
import db from "./db.js";
import userRouter from "./routers/user.route.js";
import authRouter from "./routers/auth.route.js";
import listingRouter from "./routers/listing.route.js";
import cookieParser from "cookie-parser";
import Logging from "./utils/Logging.utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  const { url } = req;
  console.time();
  Logging.info(
    `Requesting Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    if (
      res.statusCode.toString()[0] === "2" ||
      res.statusCode.toString()[0] === "3"
    ) {
      Logging.success(
        `Responding Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}] status:[${res.statusCode}]`
      );
    } else {
      Logging.warn(
        `Responding Method:[${req.method}] -> ${url} from [${req.socket.remoteAddress}] status:[${res.statusCode}]`
      );
    }
    console.timeEnd();
  });
  next();
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  Logging.error(err);
  const statusCode = err.statusCode;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Something went wrong",
    error: process.env.NODE_ENV === "development" && err,
  });
});
app.use((req, res) => {
  Logging.error(`[404]: Method:[${req.method}] ${req.url} not found`);
});

app.listen(3000, () => {
  db();
  console.log("Listening at port 3000");
});
