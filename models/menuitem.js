const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: ""
  }
});

const Items = mongoose.model("Item", itemSchema);

module.exports = Items;
