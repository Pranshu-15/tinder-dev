const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["intrested", "ignored"]
    if(!allowedStatus.includes(status)){
      return res.status(400).send("Invalid Status Type " + status)
    }

    // if(fromUserId.toString() === toUserId){
    //   return res.status(400).json({message:"You cannot send a connection request to yourself"})
    // }
    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(404).json({message:"Sending Request to an Invalid User"})
    }
    const existingConnectionRequests = await ConnectionRequest.findOne({
      $or: [
        {fromUserId, toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
    })
    if(existingConnectionRequests){
      return res.status(400).json({message: "Connection Request Already exists"})
      }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    })
    const connectionRequestData = await connectionRequest.save()
    res.json({
      message:req.user.firstName + " has sent an " + status + " connection request for " + toUser.firstName,
      connectionRequestData,
    })
  }catch(err){
    res.status(400).send("Cannot send connection request as  " + err.message)
  }
})

module.exports = requestRouter