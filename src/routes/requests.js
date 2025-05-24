const express=require("express");
const requestRouter= express.Router();
const {userAuth}=require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
   try{
      const fromUserId=req.user._id
      const toUserId=req.params.toUserId
      const status = req.params.status
      const allowedStatus=["ignored","interested"]
      if(!allowedStatus.includes(status)){
         return res.status(400).json({message:"invalid status type"+status})
      }

      const toUser=await User.findById(toUserId)
      if(!toUser){
         return res.status(400).send({message:"user not found"})
      }
      // if there is exiting connection request between touserand from user
      // touser shpuld not be able to send connection request to from user
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
         $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
         ]
      })
      if(existingConnectionRequest){
         return res.status(400).send({message:"connection request alreayd exist"})
      }
      const connectionRequest = new ConnectionRequestModel({fromUserId,toUserId,status}
         
      )
      const data = await connectionRequest.save()
      res.json({
         message:req.user.firstName+" " + "is" + " "+status +" "+ "in" +" "+ toUser.firstName,
         data
      })

   }
   catch(error){

       res.status(400).send("error sending connection request")
      }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
   try{
      const loggedInUser = req.user
      const {status,requestId} = req.params

      const allowedStatus=["accepted","rejected"]
      if(!allowedStatus.includes(status)){
         req.status(400).json({message:"status not allowed"})
      }
      console.log(status,requestId)

      const connectionRequest=await ConnectionRequestModel.findOne({
         _id:requestId,
         toUserId:loggedInUser._id,
         status:"interested"
      })

      if (!connectionRequest){
         return res.status(404).json({message:"connection request not found"})
      }

      connectionRequest.status= status;

      const data = await connectionRequest.save()
      res.json({message:"connection request"+status,data})

      // validate status
      // request id should be valid
   }catch(error){res.status(400).send("error"+err.message)}
})

module.exports=requestRouter;