const User = require("../models/user")
const jwt =  require("jsonwebtoken")
const userAuth = async(req,res,next) => {
  try{

    const {token} = req.cookies
    if(!token){
      throw new Error("Token is Invalid!!!!!!")
    }
    const decodedData = await jwt.verify(token,"DEV@TINDER$NODE&JS")
    const {_id} = decodedData
    const user = await User.findById(_id)
    if(!user){
      throw new Error("User not found")
    }
    req.user = user
    next()
  }catch(err){
    res.status(400).send("ERROR " + err.message)
  }
}
module.exports = {
  userAuth
}