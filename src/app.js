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
