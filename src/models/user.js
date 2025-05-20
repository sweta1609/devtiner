const mongoose = require('mongoose');
const validator= require('validator')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address"+value);
            }

        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid photo url"+value);
            }

        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
            message:`{VALUE} is not valid gender type`
        }
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url"+value);
            }

        }
    },
    about:{
        type:String,
        default:"this is a about ogf the user"
    },
    skills:{
        type:[String],
        // validate:[{
        //      validator:function(val){
        //         return skills.length <= 5;
        //     },
        //     message:"you can specify upto  5 skills"
        // }
        // ,
        // {
        //     validator:function(val){
        //         return skills.length >=0;

        //     },
        //     message:"At least one skill is required"
        // }
          
        // ]
    }

},
{
    timestamps:true,
})
userSchema.index({firstName:1})
userSchema.methods.getJWT=async function(){
    try{
          const user=this;
    const token = await  jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

    return token
    }catch(error){
        console.log(error)
        throw error

    }
  
}

userSchema.methods.validatePassword=async function(password){
    const user=this;
    const passwordHash =user.password
    const isPasswordValid=await bcrypt.compare(password,passwordHash)
    return isPasswordValid
}
const  User=mongoose.model("user",userSchema);
module.exports = User;
