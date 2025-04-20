import Listing from "../models/listing.model.js"
export const createListing = async(req, res , next)=>{
    try{
        const listing = new Listing(req.body)
        const result = await listing.save();
        return res.status(201).json(result)
    }catch(e){
        next(e)
    }
}