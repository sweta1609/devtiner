const mongoose = require('mongoose');

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
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if (!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:"this is a about ogf the user"
    },
    skills:{
        type:[String],
        validate:[{
             validator:function(val){
                return skills.length <= 5;
            },
            message:"you can specify upto  5 skills"
        }
        // ,
        // {
        //     validator:function(val){
        //         return skills.length >=1;

        //     },
        //     message:"At least one skill is required"
        // }
          
        ]
    }

},
{
    timestamps:true,
})

const  User=mongoose.model("user",userSchema);
module.exports = User;
