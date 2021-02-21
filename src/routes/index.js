//Import Routes
const authRoutes = require("./auth");
const userAuthRoutes = require("./userAuth")
const appointmentRoutes = require('./appointment')
const profileRoutes = require("./profile")


//Module exports
module.exports = {
  authRoutes,
  userAuthRoutes,
  appointmentRoutes,
  profileRoutes
};
