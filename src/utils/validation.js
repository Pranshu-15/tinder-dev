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
const validateUpdateFieldData = (req) => {
  const allowedUpdated = [
    "firstName",
    "lastName",
    "photoURL",
    "gender",
    "age",
    "about", 
    "skills"
  ]
  const isUpdateAllowed = Object.keys(req.body).every((field) => {
   return allowedUpdated.includes(field)
  })
  return isUpdateAllowed
}

module.exports = {validateSignUpData, validateUpdateFieldData}