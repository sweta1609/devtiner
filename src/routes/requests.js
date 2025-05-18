const express=require("express");
const requestRouter= express.Router();
const {userAuth}=require("../middleware/auth")

requestRouter.post("/sendConnectionrequest",userAuth,async(req,res)=>{
   try{
      const user=req.user
      res.send(user.firstName+" "+"connection request sent")
   }
   catch(error){

       res.status(400).send("error sending connection request")
      }
})

module.exports=requestRouter;