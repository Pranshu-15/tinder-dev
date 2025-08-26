const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName: {
    type : String,
    required:true
  },
  lastName: {
    type: String,
    required:true
  },
  emailId: {
    type: String,
    required:true,
    trim:true,
    lowercase:true,  
    unique:true
  },
  password: {
    type: String,
    required:true,
    minLength:8
  },
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    required:true,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Invalid Gender selected")
      }
    }

  },
  about:{
    type:String,
    default:"This is the bio of the user",
    minLength:10,
    maxLength:50

  },
  skills:{
    type:[String],

  },
  photoURL:{
    type:String,
    default: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
  }
},{
  timestamps:true
})

module.exports = mongoose.model("User",userSchema)