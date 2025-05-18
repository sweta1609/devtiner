const express = require("express");
const profileRouter= express.Router()
const {userAuth}=require("../middleware/auth")
profileRouter.get("/profile",userAuth,async(req,res)=>{
   try{
  
   const user=req.user
 
   res.send(user)
   }catch(error){
       res.status(400).send("error loging in")
   }

})

module.exports = profileRouter;