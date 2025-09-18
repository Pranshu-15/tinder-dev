const mongoose = require("mongoose");
const { type } = require("os");
const { ref } = require("process");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  toUserId : {
    type : mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  status:{
    type: String,
    required: true,
    enum:{
      values:["ignored", "intrested", "rejected", "accepted"],
      message:`{VALUE} is not a valid status type`
    }
  }
},{timestamps:true})

  connectionRequestSchema.index({fromUserId: 1, toUserId: 1})

 connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    //check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
      throw new Error("You are sending a connection request to yourself")
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",connectionRequestSchema
)

module.exports = ConnectionRequestModel