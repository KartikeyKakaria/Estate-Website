import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
