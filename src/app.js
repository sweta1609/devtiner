const express = require('express');
const app = express();
const connectDB=require("./config/database")
const User=require("./models/user")

app.use(express.json());
  
app.post("/signup",async(req,res)=>{
  
   const user=new User(req.body);
   try{await user.save();
   res.send("user added successfully")
}catch(err){
   console.log(err)}
   res.status(400).send("error saving middleware")
   

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
