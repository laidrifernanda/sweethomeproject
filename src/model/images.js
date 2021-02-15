//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const imageSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 255,
    },
    title: {
      type: String,
      required: [true, " is required"],
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
    collection: "images",
  }
);


//Export modules
module.exports = mongoose.model("images", imageSchema);
