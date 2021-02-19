//Import Routes
const authRoutes = require("./auth");
const userAuthRoutes = require("./userAuth")
const appointmentRoutes = require('./appointment')


//Module exports
module.exports = {
  authRoutes,
  userAuthRoutes,
  appointmentRoutes
};
