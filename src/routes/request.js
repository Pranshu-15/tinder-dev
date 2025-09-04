const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", userAuth, (req,res) => {
  try{
    const user = req.user
    if(!user){
      throw new Error ("Cannot send a connection request. Please login first")
    }
    console.log("Sending connection Request")
    res.send(user.firstName + " " + user.lastName + " sent a connection request successfully")
  }catch(err){
    res.status(400).send("Cannot send connection request due to " + err.message)
  }
})

module.exports = requestRouter