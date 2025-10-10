const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid emailId is used " + value)
      }
    }
  },
  password: {
    type: String,
    required:true,
    minLength:8,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("The Password is not strong " + value)
      }
    }
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
    maxLength:500

  },
  skills:{
    type:[String],

  },
  photoURL:{
    type:String,
    default: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid photoURL " + value)
      }
    }
  }
},{
  timestamps:true
})
userSchema.index({firstName: 1, lastName: 1})

userSchema.methods.getJWT = async function () {
  const user = this
  const token = await jwt.sign({_id:user.id}, "DEV@TINDER$NODE&JS", {expiresIn:"1d"})
  return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this
  const hashPassword = user.password

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword)
  return isPasswordValid

}

module.exports = mongoose.model("User",userSchema)