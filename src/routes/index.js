//Import Routes
const authRouter = require("./auth");
const userAuthRouter = require("./userAuth")
const appointmentRouter = require('./appointment')
const profileRouter = require("./profile")
const styleRouter = require("./styles");
const buildTypeRouter = require("./buildType");
const locationRouter = require("./location");
const serviceTypeRouter = require("./serviceType");
const timeslotRouter = require("./timeslot");
const userShowCaseRouter = require("./showcase");
const paymentRouter = require("./payment")


//Module exports
module.exports = {
  authRouter,
  userAuthRouter,
  appointmentRouter,
  profileRouter,
  styleRouter,
  buildTypeRouter,
  locationRouter,
  serviceTypeRouter,
  timeslotRouter,
  userShowCaseRouter,
  paymentRouter
};
