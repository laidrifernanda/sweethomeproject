//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { consistentModel } = require('mongoose-references-integrity-checker');

//Table
const testimoniSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required"],
      minlength: 3,
      maxlength: 255,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      cascade: true,
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
    collection: "testimoni",
  }
);

//Export modules
module.exports = consistentModel("testimoni", testimoniSchema);
