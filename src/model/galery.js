//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const galerySchema = new Schema(
  {
    photo: {
      type: String,
      default: "none",
    },
    title: {
      type: String,
      required: [true, "Title is Required"],
      min: 2,
      max: 255,
    },
    showcase:{
      type: Schema.Types.ObjectId,
      ref: 'showcase'
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
    collection: "galery",
  }
);

//Export modules
module.exports = mongoose.model("galery", galerySchema);
