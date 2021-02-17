//Import dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Table
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Firstname is required"],
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
    collection: "admin",
  }
);

//Export modules
module.exports = mongoose.model("admin", adminSchema);
