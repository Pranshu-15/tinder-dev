const express = require("express");
const app = express();

app.use("/test", (req,res,next) => {
  res.send("This is hello trom test connection");
});
app.use("/hello", (req,res,next) => {
  res.send("This side hello from hello connection")
})
app.use("/", (req,res,next) => {
  res.send("Hello from dashboard")
});

const PORT = 7777;

app.listen(PORT, (req,res,next) => {
  console.log(`Server is running successfully on PORT: ${PORT}`)
})