const stripe = require("stripe")("sk_test_k3KWqyIds3HgCFJ7Qro9IEbi");
const express = require("express");
const bodyParser = require("body-parser");

const payRouter = express.Router();

payRouter.use(bodyParser.json());

payRouter.route("/").post((req, res) => {
  const stripetoken = req.body.stripetoken;
  const amountpayable = req.body.amount;
  const charge = stripe.charges
    .create({
      amount: amountpayable,
      currency: "cad",
      description: "Sample transaction",
      source: stripetoken
    })
    .then(charge => {
      res.send({ success: true });
    })
    .catch(err => {
      console.log(err.message);
    });
});

payRouter.route("/check").post((req, res) => {
  let currentHour = new Date().getHours();
  if (currentHour > 10 || currentHour < 3) {
    res.send({ message: "success" });
  } else {
    res.send({ message: "Store is Currently Closed" });
  }
});

module.exports = payRouter;
