const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const authRouter = express.Router();
const bcrypt = require("bcrypt"); 
const User = require("../models/user");

// SIGN-UP API
authRouter.post("/signup", async (req,res) => {
  try{
    //Validation of data
    validateSignUpData(req)
    //Extraction of required fields from req.body
    const {firstName, lastName, emailId, password, gender, skills} = req.body;
    //Encryption of Password
    const hashPassword = await bcrypt.hash(password, 12)
    //Creating a new instance of a User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      skills,
      password:hashPassword,
    });
    await user.save();
    res.send("User Saved Successfully")
  }catch(err){
    res.status(400).send("Error in saving user " + err.message);
  }
})

// LOGIN API
authRouter.post("/login", async(req,res) =>{
  try{
    // Extact the emailId and Password from the body
    const {emailId, password} = req.body
    // We check for the user in the Database
    const user = await User.findOne({emailId:emailId})
    // If no user if found 
    if(!user){
      throw new Error("Invalid Credentials")
    }
    // We check the password if it is correct or not
    const isPasswordValid = await user.validatePassword(password)
    // If the Password is validated
    if(isPasswordValid){
      // We create a JWT token
      const token = await user.getJWT()
      // We will wrap this token inside a cookie and send it with response in the server
      res.cookie("token", token,{ expires: new Date(Date.now() + 7 * 3600000)}).send(user)
    }else{
      // If the password is not valid
      throw new Error("Invalid Credentials")
    }
  }catch(err){
    res.status(400).send("Cannot Login " + err.message)
  }
})

//LOGOUT API
authRouter.post("/logout", (req,res) => {
  res.cookie("token", null,{expires:new Date(Date.now())}).send("Logged Out Successfully")
})
module.exports = authRouter