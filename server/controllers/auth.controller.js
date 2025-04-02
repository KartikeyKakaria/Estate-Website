import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.util.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const result = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: result });
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...user._doc, password: null });
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const user = await User.findOne({ email });
    console.log(user, "found");
    if (user) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send({ password: null, ...user._doc });
    }
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const createdUser = new User({
      username:
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-8),
      email,
      password: hashedPassword,
      avatar: photo,
    });
    const newUser = await createdUser.save();
    console.log(newUser, "created");
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json({ password: null, ...newUser._doc });
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (e) {
    next(errorHandler(500, e));
  }
};
