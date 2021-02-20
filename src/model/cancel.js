//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const cancelSchema = new Schema(
  {
    reason: {
      type: String,
      required: [true, "reason is required"],
      minlength: 3,
    },
    project:{
      type: Schema.Types.ObjectId,
      ref: "project"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
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
    collection: "cancel",
  }
);

//Export modules
module.exports = mongoose.model("cancel", cancelSchema);
