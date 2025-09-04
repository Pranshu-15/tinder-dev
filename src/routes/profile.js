const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { validateUpdateFieldData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async(req,res) => {
  try{
    // We will extract the user from userAuth middleware and will send the user in response
    const user = req.user
    res.send(user)
  }catch(err){
    res.status(400).send("Unable to find user " + err.message)
  }
})

profileRouter.patch("/profile/update", userAuth, async(req,res) => {
  try{
    // First we check if the user is updating the correct fields or not
    if(!validateUpdateFieldData(req)){
      throw new Error("Invalid Update Data sent")
    }
    //If all fields sent by user is corrent then we will extract the loggedIn user from the userAuth
    const loggedInUser = req.user
    //Dynamic Field Update
    Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
    //Database Save
    await loggedInUser.save()
    //Success response
    res.json({message:`${loggedInUser.firstName} your profile has been updated successfully`,
      data:loggedInUser})
  }catch(err){
    res.status(400).send(err.message)
  }
})

module.exports = profileRouter