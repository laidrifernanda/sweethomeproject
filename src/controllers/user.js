const express = require("express");
const user = require("express").Router();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/users");
require("dotenv").config();

user.post("/register", async (req, res) => {
  const payload = req.body;
  const {firstname, lastname, email, password} = req.body

  payload.salt = await bcrypt.genSalt(10);
  payload.password = await bcrypt.hash(payload.password, payload.salt);

  const newUser = new userModel({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: payload.password
  });
  const result = newUser.save();

  res.send({
    status: 200,
    data: result,
  });
});

user.post("/login", async (req, res) => {
  const payload = req.body;
  let statusCode = 500;
  try {
    const email = payload.email;
    const password = payload.password;

    const users = await userModel.findOne({
      email: email
    });

    if (!users) {
      statusCode = 404;
      throw new Error("Account not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, users.password);
    if (!isPasswordMatch) {
      statusCode = 400;
      throw new Error("Password invalid");
    }
    const token = jwt.sign({
      id: users._id, email: users.email,
  }, process.env.SALT_KEY)
  res.send({
    status: 200,
    data: token,
  })
  } catch (error) {
    res.status(statusCode).json({message: error.message});
  }
});


module.exports = user;