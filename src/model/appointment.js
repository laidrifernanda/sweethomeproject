//Import dependencies
const betterId = require('mongoose-better-id')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { consistentModel } = require('mongoose-references-integrity-checker');

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
      enum: ['Waiting Approval','Done','Scheduled', 'Declined', 'Closed','On going']
    },
    buildType: {
      type: Schema.Types.ObjectId,
      ref: "buildType",
      required: true,
    },
    serviceType: {
      type: Schema.Types.ObjectId,
      ref: "serviceType",
      required: true
    },
    locations: [
      {
        type: Schema.Types.ObjectId,
        ref: "location",
        required: true

      },
    ],
    styles: [
      {
        type: Schema.Types.ObjectId,
        ref: "styles",
        required: true

      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      cascade: true
    },
    timeslot: {
      type: Schema.Types.ObjectId,
      ref: "timeslot",
      required: true
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
module.exports = consistentModel("appointment", appointmentSchema);
