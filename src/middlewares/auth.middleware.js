const ApiError = require('../utils/ApiError.js')
const asynchandler = require("../utils/asynchandler");
const jwt = require('jsonwebtoken')
const User = require('../models/user.models.js')


export const verifyJWT = asynchandler(async(req,res,next)=>{
     try {
         const token=req.cookies?.accessTokex || req.header("Authourization")?.replace("Bearer ","")
         if (!token){
           throw new ApiError(401,"Access Denied")
         }
   
         const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   
         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
   
         if(!user){
           throw new ApiError(401,"Invalid Access Token")
         }
         req.user()
         next()
     } catch (error) {
        throw new ApiError(401,error?.message || "Invalid Access Token")
     }
})