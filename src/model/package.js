//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { consistentModel } = require('mongoose-references-integrity-checker');


//Table
const packageSchema = new Schema(
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
      required: true,
      cascade: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "location",
      required: true,
    },
    projectType: {
      type: Schema.Types.ObjectId,
      ref: "projectType",
      required: true,
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
    collection: "package",
  }
);

//Export modules
module.exports = consistentModel("package", packageSchema);
