//Import dependencies
const mongoose = require("mongoose");
const betterId = require("mongoose-better-id");
const Schema = mongoose.Schema;

//Table
const projectSchema = new Schema(
  {
    ticket: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 8,
    },
    status: {
      type: String,
      default: "Waiting Payment",
      enum: [
        "Waiting Payment",
        "On Going",
        "Cancelled",
        "Done",
        "Cancelled Requested",
      ],
      minlength: 3,
    },
    receipt: {
      type: String,
      default: "none",
    },
    totalDuration: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "appointment",
    },
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "package",
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
    collection: "project",
  }
);

projectSchema.plugin(betterId, {
  connection: mongoose.connection,
  field: "ticket",
  prefix: "#P-",
  suffix: {
    start: 000,
    step: 001,
    max: 100,
  },
  timestamp: {
    enable: false,
  },
});
//Export modules
module.exports = mongoose.model("project", projectSchema);
