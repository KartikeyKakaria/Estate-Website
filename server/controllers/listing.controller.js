import Listing from "../models/listing.model.js"
export const createListing = async(req, res , next)=>{
    try{
        const listing = new Listing(req.body)
        return res.status(201).json(listing)
    }catch(e){
        next(e)
    }
}