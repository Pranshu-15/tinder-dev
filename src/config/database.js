const mongoose = require("mongoose")
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pranshu:37s9ntlrRxzfFbvR@backendpractice.u6dgx6o.mongodb.net/backendPracticeDevTinder"
  )
}
module.exports = connectDB