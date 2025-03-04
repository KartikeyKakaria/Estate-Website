import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const result = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
