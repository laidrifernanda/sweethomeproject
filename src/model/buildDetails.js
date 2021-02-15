//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const buildDetailsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 255,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: 3,
      maxlength: 255,
    },
    areaSize: {
      type: String,
      required: [true, "area size is required"],
    },
    cost: {
      type: String,
      required: [true, "cost is required"],
    },
    duration: {
      type: String,
      required: [true, "duration is required"],
    },
    favorite: {
      type: Boolean,
      default: false
    },
    projectType: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projectType",
      },
    ],
    style: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "styles",
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
    collection: "buildDetails",
  }
);


//Export modules
module.exports = mongoose.model("buildDetails", buildDetailsSchema);
