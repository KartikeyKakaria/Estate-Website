import express from "express";
import db from "./db.js";

const app = express();

app.listen(3000, () => {
  db();
  console.log("Listening at port 3000");
});
