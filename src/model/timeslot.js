//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const timeslotSchema = new Schema(
  {
    start: {
      type: String,
      required: [true, "Start is required"],
    },
    end: {
      type: String,
      required: [true, "End is required"],
    },
    quota: {
      type: Number,
      required: [true, "Quota is required"],
    },
    serviceType: {
      type: Schema.Types.ObjectId,
      ref: "serviceType",
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
    collection: "timeslot",
  }
);

//Export modules
module.exports = mongoose.model("timeslot", timeslotSchema);
