import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      default: process.env.DEFAULT_IMG_URL,
    }
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
