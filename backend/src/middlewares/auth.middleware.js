import jwt from "jsonwebtoken";
import { blacklistModel } from "../models/blacklist.model.js";

export async function authUser(req,res,next){
    const token=req.cookies.token;
    console.log(token)
    if(!token){
        return res.status(401).json({
            message:"Unauthorized, no token provided"
        })
    }
    const isTokenBlacklisted= await blacklistModel.findOne({token});
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"token is invalid, please login again"
        })
    }
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded; 
        console.log(decoded);  
        next();
    }
    catch(error){
        return res.status(401).json({
            message:"Unauthorized, invalid token"
        })
    }
}