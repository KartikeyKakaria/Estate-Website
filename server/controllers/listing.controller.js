import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.util.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = new Listing(req.body);
    const result = await listing.save();
    return res.status(201).json(result);
  } catch (e) {
    next(errorHandler(500, e.message));
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing doesn't exist",
      });
    }
    if (req.user.userId !== listing.userRef.toString()) {
        console.log(req.user.userId, listing.userRef)
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    const data = await Listing.findByIdAndDelete(listingId);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    return next(errorHandler(500, err.message));
  }
};
