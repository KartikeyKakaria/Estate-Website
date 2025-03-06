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
    next(error);
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
      return next(errorHandler(404, "Wrong credentials"));
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({...user._doc, password: null });
  } catch (error) {
    next(error);
  }
};
