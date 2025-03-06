import { connect } from "mongoose";
import { config } from "dotenv";
config("../.env");

export default () => {
  connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected To MongoDB");
    })
    .catch((err) => console.log(err));
};