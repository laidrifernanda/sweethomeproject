//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const projectSchema = new Schema(
  {
    ticket: {
      type: String,
      default: "#P-001",
      unique: true,
      minlength: 3,
      maxlength: 8,
    },
    status: {
      type: String,
      default: "Waiting Payment",
      enum: ["Waiting Payment", "On Going", "Cancelled","Done","Cancelled Requested"],
      minlength: 3,
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    appointment:{
      type: Schema.Types.ObjectId,
      ref: "appointment"
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
    collection: "project",
  }
);

//Export modules
module.exports = mongoose.model("project", projectSchema);
