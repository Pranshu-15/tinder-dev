const express = require("express");
const app = express();
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/userAuth")

app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, gender,skills } = req.body;
    //ENCRYPTION OF PASSWORD
    const hashPassword = await bcrypt.hash(password, 12);
    // Creating a new instance of User Model 
    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      skills,
      password: hashPassword,
    });
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    res.status(400).send("User Save Unsuccessfull " + err.message);
  }
});

app.post("/login", async (req,res) => {
  try{
    const {emailId, password} = req.body
    const user = await User.findOne({emailId:emailId})
    if(!user){
      throw new Error ("Invalid Credentials")
    }
    const isPasswordValid = await user.validatePassword(password)
    if(isPasswordValid){
      //create a JWT token
      const token = await user.getJWT()
      res.cookie("token",token,{ expires: new Date(Date.now() + 7 * 3600000)}).send("Logged In Successfully")
    }else{
      throw new Error("Invalid Credentials")
    }
  }catch(err){
    res.status(400).send("Login Unsuccessfull " + err.message)
  }
})
app.get("/profile",userAuth, async(req,res) => {
  try{
    const user = req.user
    res.send(user)
  }catch(err){
    res.status(400).send("Cannot get user " + err.message)
  }
})
app.get("/sendConnectionRequest", userAuth, (req,res) => {
  try{
    const user = req.user
    if(!user){
      throw new Error("Cannot send a connection request. Please login and try again")
    }
    console.log("Sending the connection request")
    res.send(user.firstName + " sent a connection request successfully")
  }catch(err){
    res.status(400).send("ERROR " + err.message)
  }
})


const PORT = 7777;
connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(PORT, (req, res, next) => {
      console.log(`Server is running successfully on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be established");
  });
