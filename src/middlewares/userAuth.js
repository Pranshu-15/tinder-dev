const userAuth = (req,res,next) => {
  console.log("userAuth is getting checked")
  const token = "abc"
  const isUserAuthorized = token === "abc"
  if(!isUserAuthorized){
    res.status(401).send("Unauthorized Request")
  }else{
    next();
  }
}
module.exports = {
  userAuth
}