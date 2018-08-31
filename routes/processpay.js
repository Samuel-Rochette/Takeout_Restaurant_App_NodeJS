const stripe = require("stripe")("sk_test_k3KWqyIds3HgCFJ7Qro9IEbi");
const express = require("express");
const bodyParser = require("body-parser");

const payRouter = express.Router();

payRouter.use(bodyParser.json());

payRouter
  .route("/")
  .post((req, res) => {
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

module.exports = payRouter;
