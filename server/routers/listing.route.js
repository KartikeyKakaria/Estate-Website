import { Router } from "express";
import { createListing, deleteListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.util.js";
const listingRouter = Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing)

export default listingRouter;
