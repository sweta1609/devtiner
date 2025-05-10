   const express = require('express');
   const app = express();
   const connectDB=require("./config/database")
   const User=require("./models/user")
  
app.post("/signup",async(req,res)=>{
   const user=new User({
      firstName:"Karan",
      lastName:"Kapoor",
      emailId:"karan.kapoor@gmail.com",
      password:"karan123"
   });
   await user.save();
   res.send("user added successfully")

})

   connectDB()
  .then(() => {
    // Start server after DB is connected
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(error => {
    console.error("Database connection could not be established:", error);
  });
