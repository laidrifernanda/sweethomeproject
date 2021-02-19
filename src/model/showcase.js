//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const showcaseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 3,
      maxlength: 255,
    },
    address: {
      type: String,
      required: [true, "address is required"],
      minlength: 3,
    },
    showcaseType: {
      type: Schema.Types.ObjectId,
      ref: "showcaseType",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
    },
    projectTypes: [
      {
        type: Schema.Types.ObjectId,
        ref: "projectType",
      },
    ],
    styles: [
      {
        type: Schema.Types.ObjectId,
        ref: "style",
      },
    ],
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: "galery",
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
    collection: "showcase",
  }
);

//Export modules
module.exports = mongoose.model("showcase", showcaseSchema);
