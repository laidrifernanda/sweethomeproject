//Import Routes
const authRoutes = require("./auth");
const userAuthRoutes = require("./userAuth")
const appointmentRoutes = require('./appointment')
const updateUserRouter = require("./updateUser")


//Module exports
module.exports = {
  authRoutes,
  userAuthRoutes,
  appointmentRoutes,
  updateUserRouter
};
