const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const userModel = require("../model/users");
const service = require("../services/findUser");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SALT_KEY } = process.env;
var mongoose = require("mongoose");
var id = mongoose.Types.ObjectId();

passport.serializeUser(function (user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      service
        .findUser(profile.email)
        .then((email) => {
          if (email.length !== 0) {
            return done(null, profile, accessToken);
          } else {
            //hash password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(process.env.PASSWORD, salt);
            let payload = {
              _id: id,
              firstname: profile.given_name,
              lastname: profile.family_name,
              email: profile.email,
              password: hash,
            };
            profile.userId = id;
            const newUser = new userModel(payload);
            newUser.save();
            return done(null, profile, accessToken);
          }
        })
        .catch((err) => console.log(err, "ini error database"));
    }
  )
);
