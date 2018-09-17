const stripe = require("stripe")("sk_test_k3KWqyIds3HgCFJ7Qro9IEbi");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

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
      let arr = [req.body.address.split()];
      axios
        .get(
          "https://maps.googleapis.com/maps/api/distancematrix/json?origins=90+Glenwood+Dr+Brantford+ON&destinations=" +
            arr[0] +
            "+" +
            arr[1] +
            "+" +
            arr[arr.length] +
            "+Brantford+ON&key=AIzaSyBNcrt_OK32theb19oVEgap3pU4vsKAMOo"
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
