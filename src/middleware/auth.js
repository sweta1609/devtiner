const jwt = require("jsonwebtoken")
const User= require("../models/user")
require('dotenv').config();
const userAuth=async(req,res,next)=>{
    try{
   //  Read token from the req cookies
    const {token}=req.cookies;
    if(!token){
        throw new Error("token is not valid")
    }

    // validate token
    const decodeObj=await jwt.verify(token,process.env.JWT_SECRET)
    const {_id}=decodeObj

    // find user from token
    const user = await User.findById(_id)
    if(!user){
        throw new Error("user not found")
    }
    req.user= user
    next()
    }catch(err){
        res.status(404).send("ERROR"+" "+err.message)
    }
 
}
module.exports ={userAuth}