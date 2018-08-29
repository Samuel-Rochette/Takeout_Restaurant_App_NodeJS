const stripe = require("stripe")("sk_test_k3KWqyIds3HgCFJ7Qro9IEbi");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(cors());

router.post("/processpay", (req, res) => {
  console.log("POST");
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

app.use(router);
app.listen(3333, () => {
  console.log("Server listening on PORT 3333");
});
