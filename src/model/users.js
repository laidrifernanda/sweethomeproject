//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const userSchema = new Schema(
  {
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
    phoneNumber: {
      type: String,
      default: null,
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
    address: {
      type: String,
      default: null,
      minlength: 3,
      maxlength: 255,
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
module.exports = mongoose.model("users", userSchema);
