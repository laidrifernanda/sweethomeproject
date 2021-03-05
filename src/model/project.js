//Import dependencies
const mongoose = require("mongoose");
const betterId = require("mongoose-better-id");
const Schema = mongoose.Schema;
const { consistentModel } = require('mongoose-references-integrity-checker');


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
      enum: [
        "Waiting Payment",
        "On Going",
        "Cancelled",
        "Done",
        "Cancellation Requested",
      ],
      default: "Waiting Payment",
      minlength: 3,
    },
    receipt: {
      type: String,
      default: "none",
    },
    totalDuration: {
      type: Number,
    },
    totalArea: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      cascade: true,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: "appointment",
      required: true,
      cascade: true,
    },
    packages: [
      {
        type: Schema.Types.ObjectId,
        ref: "package",
      },
    ],
    cancelPayment: {
      type: Schema.Types.ObjectId,
      ref: "cancel",
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "payment",
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
module.exports = consistentModel("project", projectSchema);
