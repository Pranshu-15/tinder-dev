const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);





const PORT = 7777;
connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(PORT, (req, res, next) => {
      console.log(`Server is running successfully on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database cannot be established");
  });
