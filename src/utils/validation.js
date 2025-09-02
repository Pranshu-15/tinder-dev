const validator = require("validator")
const validateSignUpData = (req) => {
  const {firstName, lastName, emailId,password} = req.body;
  if(!firstName || !lastName){
    throw new Error("Name is not valid. Please enter a valid name")
  }else if(!validator.isEmail(emailId)){
    throw new Error("Please enter a valid emaildId")
  }else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter a Stronger Password")
  }
}

module.exports = {validateSignUpData}