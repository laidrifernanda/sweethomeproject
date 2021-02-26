//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { consistentModel } = require('mongoose-references-integrity-checker');

//Table
const serviceTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 255,
    },
    timeslots: [
      {
        type: Schema.Types.ObjectId,
        ref: "timeslot",
      },
    ],
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
    collection: "serviceType",
  }
);

//Export modules
module.exports = consistentModel("serviceType", serviceTypeSchema);
