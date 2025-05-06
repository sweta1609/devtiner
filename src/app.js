   const express = require('express');
   const app = express();
   app.use("/user",(req,res,next)=>{
      console.log("handling the route user");
      res.send("Response");
      next()
   },
(req,res)=>{
   console.log("handling response");
   res.send("2nd response");
})
   app.listen(3000,()=>{
    console.log("server is calling")
   });
