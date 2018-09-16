const stripe = require("stripe")("sk_test_k3KWqyIds3HgCFJ7Qro9IEbi");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

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
            res.send({ message: "Location too far away" });
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
