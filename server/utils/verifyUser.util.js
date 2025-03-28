import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; 
    if(!token) return next(new Error([401, 'Unauthorized']));
    jwt.verify(token, process.env.JWT_SECRET, (Err, user)=>{
        if(Err) return next(new Error([403, 'Forbidden']));
        req.user = user;
        next();
    })
}