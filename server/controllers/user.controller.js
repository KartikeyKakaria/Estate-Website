import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.util.js";
import Listing from "../models/listing.model.js";
export const deleteUser = async (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return next(errorHandler(401, "Cannot delete someone else's profile"));
  }
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    console.log(result);
    return res
      .status(200)
      .json({
        success: true,
        message: "User deleted successfully",
      })
      .clearCookie("access_token");
  } catch (e) {
    console.log(e);
    next(errorHandler(500, e));
  }
};
export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return next(errorHandler(401, "Cannot update someone else's profile"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true, runValidators: true }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (e) {
    next(errorHandler(500, e));
  }
};

export const getUserListing = async (req, res, next) => {
  try {
    if (req.user.userId === req.params.id) {
      const listings = await Listing.find({ userRef: req.params.id });
      return res.status(200).json({ success: true, listings });
    } else {
      return next(errorHandler(400, "cannot get someone else's listings"));
    }
  } catch (e) {
    next(500, e);
  }
};
