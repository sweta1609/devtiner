const express = require("express");
const profileRouter= express.Router()
const {userAuth}=require("../middleware/auth")
const {validateEditProfileData}=require("../utils/validation")
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
   try{
  
   const user=req.user
 
   res.send(user)
   }catch(error){
       res.status(400).send("error loging in")
   }

})
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData){
          throw new Error("Invalid Edit Request")
        }
        const loggedInUser=req.user
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        await loggedInUser.save()
        // res.send(`${loggedInUser.firstName} your profile was updated successfully`)
        res.json({message:`${loggedInUser.firstName} your profile was updated successfully`,data:loggedInUser})

    }catch(error){
        res.status(400).send("user profile could not be edited")
    }
})
module.exports = profileRouter;