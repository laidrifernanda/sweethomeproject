//Import dependencies
const express = require('express');
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require('passport')
const cookieSession = require('cookie-session')
//Require google passport setup
require('./src/passports/googlePassport')
//Require fb passport setup
require ('./src/passports/fbPassport.js')

//Express
const app = express();

//Import routes
const router = require('./src/routes')

//Import data
const { PORT } = process.env;
const db = require("./src/config/database");

//Cookie Session
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(router.usersRoutes);

//Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
