//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const favoriteSchema = new Schema(
  {
    showcase: {
      type: Schema.Types.ObjectId,
      ref: "showcase",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
    collection: "favorite",
  }
);

//Export modules
module.exports = mongoose.model("favorite", favoriteSchema);
