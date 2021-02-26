//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { consistentModel } = require('mongoose-references-integrity-checker');

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
      cascade: true,
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
        ref: "styles",
      },
    ],
    gallery: [
      {
        type: Schema.Types.ObjectId,
        ref: "galery",
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "favorite",
      },
    ],
    admin: 
      {
        type: Schema.Types.ObjectId,
        ref: "admin",
      },
    show: {
      type: Boolean,
      default: true,
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
    collection: "showcase",
  }
);

//Export modules
module.exports = consistentModel("showcase", showcaseSchema);
