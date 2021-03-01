//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { consistentModel } = require('mongoose-references-integrity-checker');


//Table
const userSchema = new Schema(
  {
    photo: {
      type: String,
      default: "none",
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      minlength: 3,
      maxlength: 255,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
      minlength: 3,
      maxlength: 255,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      default: "none",
      minlength: 3,
      maxlength: 255,
    },
    address: {
      type: String,
      default: "none",
      minlength: 3,
      maxlength: 255,
    },
    statusUpdate: {
      type: Boolean,
      default: true,
    },
    event: {
      type: Boolean,
      default: true,
    },
    newsletter: {
      type: Boolean,
      default: true,
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "appointment",
      },
    ],
    activity: {
      type: Date,
      default: Date.now,
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
    collection: "users",
  }
);

//Export modules
module.exports = consistentModel("users", userSchema);
