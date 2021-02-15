//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const workIncludeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
    collection: "workInclude",
  }
);


//Export modules
module.exports = mongoose.model("workInclude", workIncludeSchema);
