   const express = require('express');
   const app = express();
   app.use("/user",(req,res,next)=>{
      console.log("handling the route user");
      next()
      res.send("Response");
   },
(req,res)=>{
   console.log("handling response");
   res.send("2nd response");
},
(req,res)=>{
   console.log("handling response");
   res.send("3rd response");
},
(req,res)=>{
   console.log("handling response");
   res.send("4th response");
})
   app.listen(3000,()=>{
    console.log("server is calling")
   });
