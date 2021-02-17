//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
module.exports = mongoose.model("testimoni", testimoniSchema);
