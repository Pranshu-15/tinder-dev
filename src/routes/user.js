const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router()


const USER_SAFE_DATA = "firstName lastName photoURL skills gender age"
userRouter.get("/user/requests/recived", userAuth, async(req,res) => {
  try{
    const loggedInUser = req.user
    const connectionRequest = await ConnectionRequest.find({
      toUserId:loggedInUser._id,
      status:"intrested"
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({message: "Data fetched successfully", data:connectionRequest})
  }catch(err){
    res.status(400).send("ERROR " + err.message);
  }
})

userRouter.get("/user/connections", userAuth, async(req,res) => {
  try{
    const loggedInUser = req.user

    const connectionRequest = await ConnectionRequest.find({
      $or:[
        {fromUserId:loggedInUser._id, status:"accepted"},
        {toUserId:loggedInUser._id, status:"accepted"}
      ]
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

    const filteredData = connectionRequest.map((row) => {
    if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
      return row.toUserId
    }
      return row.fromUserId
    })
    res.json({data:filteredData})
  }catch(err){
    res.status(400).send("ERROR " + err.message)
  }
})

module.exports = {userRouter}