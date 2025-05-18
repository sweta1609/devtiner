const express= require("express")

const authRouter = express.Router();
const User=require("../models/user")

const bcrypt = require("bcrypt")
const {validateSignUpData,validateNewPasswordStrength}=require("../utils/validation");
const { userAuth } = require("../middleware/auth");
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
      console.log(isPasswordValid)
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
authRouter.patch("/passwordchange",userAuth,async(req,res)=>{
    try{
           const user=req.user
     validateNewPasswordStrength(req)
   const passwordHash =await  bcrypt.hash(req.body.password,10)
    user.password = passwordHash;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully." });
    }catch(error){
        res.status(400).send("password could not be changed")
    }
 
})

module.exports=authRouter;