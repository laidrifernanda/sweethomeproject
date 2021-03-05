//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const feedbackSchema = new Schema(
  {
    feedback: {
      type: String,
      required: [true, "Feedback is required"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "project",
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
    collection: "feedback",
  }
);

//Export modules
module.exports = mongoose.model("feedback", feedbackSchema);
