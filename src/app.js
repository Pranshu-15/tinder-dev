const express = require("express");
const app = express();

// const {adminAuth} = require("./middlewares/adminAuth")
// const {userAuth} = require("./middlewares/userAuth")
// const {errs} = require("./middlewares/errs")
const connectDB = require("./config/database")
const User = require("./models/user")
app.use(express.json())
app.post("/signup", async(req,res) => {
  
  const user = new User(req.body)
  try{
    await user.save()
    res.send("User Saved Successfully")
  } catch(err)  {
    res.status(400).send("User not saved successfully")
  }
})
app.get("/userById", async(req,res) => {
  const userId = req.body._id
  try{
    const user = await User.findById(userId)
    if(user.length === 0){
      res.status(404).send("User not found with searched ID")
    }else{
      res.send(user)
    }
  }catch(err){
    res.status(400).send("Something went wrong")
  }
})
app.get("/user", async(req,res) => {
  const userEmail =  req.body.emailId
    try{
      const user = await User.find({emailId:userEmail})
      if(user.length === 0){
        res.status(404).send("User not found with the searched emailId")
      }else{

        res.send(user)
      }
    }catch(err){
      res.status(400).send("Something went wrong")
    }
})
app.get("/feed", async(req,res) => {
  try{
    const users = await User.find({})
    res.send(users)
  }catch(err){
    res.status(404).send("No user found")
  }
})
app.delete("/user", async (req,res) => {
  const userEmailId = req.body.emailId
  try{
    const user = await User.findOneAndDelete({emailId:userEmailId})
    if(user){
      res.send("User Deleted Successfully")
    }else{
      res.send("No user found by the id")
    }
  }catch(err){
    res.status(400).send("Something went wrong")
  }
})
app.patch("/user", async(req,res) => {
  const data = req.body
  const userId = req.body._id
  try{
    await User.findOneAndUpdate({_id:userId},data)
    res.send("User Updated Successfully")
  }catch(err){
    res.status(400).send("Something went wrong")
  }
})

// app.use("/admin", adminAuth)
// app.use("/user", userAuth)

// app.get("/admin/getAllUser",(req,res,next) => {
//   try{
//     throw new Error("Random admin error")
//     res.send("all admin data sent")
//   }catch(err){
//       res.status(500).send("Something went wrong in admin.Contact Support")
//   }
// })
// app.get("/user/getAllUser", (req,res,next) => {
//   throw new Error("Some random error")
//   res.send("All user data sent")
// })
// app.use("/test", (req,res,next) => {
//   res.send("This is hello trom test connection");
// });
// app.use("/hello", (req,res,next) => {
//   res.send("This side hello from hello connection")
// })
// app.use("/", (req,res,next) => {
//   res.send("Hello from dashboard")
// });
// app.use("/", errs)

const PORT = 7777;
connectDB()
  .then(() => {
    console.log("Database connection established successfully")
    app.listen(PORT, (req,res,next) => {
  console.log(`Server is running successfully on PORT: ${PORT}`)
})
  })
  .catch((err) => {
      console.log("Database cannot be established")
  }) 
