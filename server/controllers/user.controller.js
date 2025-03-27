import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    return next([401, "Cannot update someone else's profile"]);
  }
  console.log(req.body);
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
    console.log(e);
    next(e);
  }
};
