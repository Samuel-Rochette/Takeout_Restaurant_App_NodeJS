const config = require("./config");
const stripe = require("stripe")(config.secretKey);
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

const Items = require("./models/menuitem");

const payRouter = require("./routes/processpay");
const menuRouter = require("./routes/menu");

const app = express();
const router = express.Router();
const connect = mongoose.connect(config.mongoURL);

connect.then(
  db => {
    console.log("Connected correctly to server");
  },
  err => {
    console.log(err.message);
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/processpay", payRouter);
app.use("/menu", menuRouter);

app.listen(3333, () => {
  console.log("Server listening on PORT 3333");
});
