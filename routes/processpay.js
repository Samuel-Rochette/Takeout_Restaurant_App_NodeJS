const stripe = require("stripe")("sk_test_k3KWqyIds3HgCFJ7Qro9IEbi");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const config = require("../config");

const payRouter = express.Router();

payRouter.use(bodyParser.json());

payRouter.route("/").post((req, res) => {
  let stripetoken = req.body.stripetoken;
  let amountpayable = req.body.amount;
  let email = req.body.email;
  let charge = stripe.charges
    .create({
      amount: amountpayable,
      currency: "cad",
      description: "Sample transaction",
      source: stripetoken,
      receipt_email: email
    })
    .then(charge => {
      res.send({ message: "success" });
    })
    .catch(err => {
      res.send(err);
    });
});

payRouter.route("/check").post((req, res) => {
  let currentHour = new Date().getHours();
  if (currentHour > 10 || currentHour < 5) {
    if (req.body.isDelivery) {
      let destination = [req.body.address.split()];
      let origin = [config.restaurantAddress.split()];
      axios
        .get(
          "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" +
            origin[0] +
            "+" +
            origin[1] +
            "+" +
            origin[origin.length] +
            "+" +
            config.city +
            "+" +
            config.province +
            "&destinations=" +
            destination[0] +
            "+" +
            destination[1] +
            "+" +
            destination[destination.length] +
            "+" +
            config.city +
            "+" +
            config.province +
            "&key=AIzaSyBNcrt_OK32theb19oVEgap3pU4vsKAMOo"
        )
        .then(response => {
          let distance = response.data.rows[0].elements[0].distance.value;
          if (distance <= 5000) {
            res.send({ message: "success" });
          } else {
            res.send({ message: "Location too far away or cannot be found" });
          }
        });
    } else {
      res.send({ message: "success" });
    }
  } else {
    res.send({ message: "Store is Currently Closed" });
  }
});

module.exports = payRouter;
