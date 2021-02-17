//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const packageTableSchema = new Schema(
  {
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    area: {
      type: Number,
      required: [true, "Area is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "location",
    },
    projectType: {
      type: Schema.Types.ObjectId,
      ref: "projectType",
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
    collection: "packageTable",
  }
);

//Export modules
module.exports = mongoose.model("packageTable", packageTableSchema);
