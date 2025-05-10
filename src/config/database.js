const mongoose=require("mongoose") 

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://sweta:%40Error050@cluster0.9vzhd3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
};

module.exports=connectDB;
