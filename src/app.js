   const express = require('express');
   const app = express();
   const {userAuth,adminAuth}=require("./middleware/auth")

   app.use("/admin",adminAuth,(req,res)=>{
    res.send("all data sent")
   })
   app.use("/user",userAuth,(req,res)=>{
    res.send("all data sent")
   })

   app.use("/user/login",(req,res)=>{
    res.send("user login")
   })
   app.listen(3000,()=>{
    console.log("server is calling")
   });
