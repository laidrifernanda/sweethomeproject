//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const paymentSchema = new Schema(
  {
    receipt: {
      type: String,
      default: 'none',
    },
    note: {
      type: String,
      min: 3,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "payment",
  }
);

//Export modules
module.exports = mongoose.model("payment", paymentSchema);
