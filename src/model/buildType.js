//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const buildTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 3,
      maxlength: 255,
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
    collection: "buildType",
  }
);

//Export modules
module.exports = mongoose.model("buildType", buildTypeSchema);
