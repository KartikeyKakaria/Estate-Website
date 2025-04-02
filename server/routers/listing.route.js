import { Router } from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.util.js";
const listingRouter = Router();

listingRouter.post("/create", verifyToken, createListing);

export default listingRouter;
