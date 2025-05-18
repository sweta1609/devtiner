const express= require("express")

const authRouter = express.Router();
const User=require("../models/user")
const {validatePassword,getJWT}=require("../models/user")
const bcrypt = require("bcrypt")
const {validateSignUpData}=require("../utils/validation")
authRouter.post("/signup",async(req,res)=>{

  
   try{
        validateSignUpData(req)
        const {firstName,lastName,emailId,password}=req.body;
        
         const passwordHash =await  bcrypt.hash(password,10)
         console.log(passwordHash)
          const user=new User({firstName,lastName,emailId,password:passwordHash});
      await user.save();
   res.send("user added successfully")
}catch(err){
   console.log(err)}
   res.status(400).send("error saving middleware")
   

})

authRouter.post("/login",async(req,res)=>{
   try{
      const {emailId,password}=req.body;
      const user = await User.findOne({emailId:emailId});
      if(!user){
         throw new Error("Invalid credentials")
      }

      const isPasswordValid=await user.validatePassword(password)
      if(isPasswordValid){
         // craete a jwt token
         // add token to cokkie and send respons eback to user
         const token = await user.getJWT()
          res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
             })  
         res.send("Login successfull")
      }else{
         throw new Error("password is not correct")
      }
   }catch(error){
         res.status(400).send("error loging in")
   }
})
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.send("Logout successfull")
})

module.exports=authRouter;