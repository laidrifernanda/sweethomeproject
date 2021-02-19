//Import dependencies
const betterId = require('mongoose-better-id')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const appointmentSchema = new Schema(
  {
    ticket: {
      type: String,
      default: "#A-001",
      unique: true,
      minlength: 3,
      maxlength: 8,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    area: {
      type: Number,
      required: [true, "Area is required"],
    },
    budget: {
      type: String,
      required: [true, "Budget is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    note: {
      type: String,
      required: [true, "Note is required"],
    },
    status: {
      type: String,
      default: 'Waiting Approval',
      enum: ['Waiting Approval','Done','Scheduled', 'Declined']
    },
    buildType: {
      type: Schema.Types.ObjectId,
      ref: "buildType",
    },
    serviceType: {
      type: Schema.Types.ObjectId,
      ref: "serviceType",
    },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "location",
      },
    ],
    styles: [
      {
        type: Schema.Types.ObjectId,
        ref: "styles",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    timeslot: {
      type: Schema.Types.ObjectId,
      ref: "timeslot",
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
    collection: "appointment",
  }
);

appointmentSchema.plugin(betterId, {
  connection: mongoose.connection,
  field: "ticket",
  prefix: "#A-",
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
module.exports = mongoose.model("appointment", appointmentSchema);
