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

app.get("/user",async(req,res)=>{
         const mail=req.body.emailId;
   try{
 
//    const user=await User.find({emailId:mail})
//    if(user.length  === 0){
//       res.status(404).send("user not found")
//    }else{
//  res.send(user)
//    }
// finding one user from that email 
  const user=await User.findOne({emailId:mail}).exec()
   if(user.length  === 0){
      res.status(404).send("user not found")
   }else{
 res.send(user)
   }
  
   }catch(err){res.status(400).sen("user not found")}

})

app.get("/feed",async(req,res)=>{
   try{
      const users = await User.find({})
      if(users?.length === 0){
         res.status(404).send("no users found")
      }else{
         res.send(users)
      }
     
   }catch(err){
      res.status(400).send("user not found")
   }
})

app.delete("/user",async(req,res)=>{
   const id = req.body.id
   try{
      const user = await User.findByIdAndDelete(id);
      res.send("user deleted successfully")
   }catch(error){
      res.status(400).send("something went wrong")
   }
})

app.patch("/user/:userId",async(req,res)=>{
   const userId=req.params.userId;

   const data=req.body; 
 

   try{
   const ALLOWED_UPDATES =["userId","photoUrl","about","gender","age","skills"]
   const isUpdateAllowed =Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
   if (!isUpdateAllowed){
      throw new Error("update not allowed")
   }
   // if(data?.skills?.length >10){
   //    throw new Error("skills can not be more then 10")
   // }
 
    await User.findByIdAndUpdate(userId, data, {
  new: true,
  runValidators: true
});

      res.send("user updated successfully")
   }catch(error){
      res.status(400).send(error.message)
   }
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
