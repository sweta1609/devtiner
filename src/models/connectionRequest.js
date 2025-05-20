const mongoose =require("mongoose");
const connectionRequestSchema=new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        toUserId:{
             type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["ignore","interested","accepted","rejected"],
                message:'{values} is incorrect status type'
            }
        }
    },
    {timestamps:true}
    
)
connectionRequestSchema.index({fromUserId:1})
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connectionrequest to yourself")
    }
    next()
})

const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)

module.exports=ConnectionRequestModel