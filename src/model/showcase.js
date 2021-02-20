//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Import model
// const {favoriteModel: favorite , galeryModel: gallery} = require("../model")

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
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "favorite",
      },
    ],
    show: {
      type: Boolean,
      default: true
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

// showcaseSchema.post("delete", (project) => {
//   favorite.deleteMany({ _id: {$in: project.favorites} });
//   galery.deleteMany({ _id: {$in: project.gallery}  });
// });

//Export modules
module.exports = mongoose.model("showcase", showcaseSchema);
