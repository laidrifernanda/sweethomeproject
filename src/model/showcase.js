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
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "project",
      },
    ],
    styles: [
      {
        type: Schema.Types.ObjectId,
        ref: "style",
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
