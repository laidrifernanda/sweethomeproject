//Import dependencies
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const morgan = require("morgan");
const cors = require("cors");

//Require google passport setup
require("./passports/googlePassport");
//Require fb passport setup
require("./passports/fbPassport");

//Express
const app = express();

//Import routes
const {
  adminRoutes,
  styleRoutes,
  buildTypeRoutes,
  locationRoutes,
  projectTypeRoutes,
  serviceTypeRoutes,
  showcaseTypeRoutes,
  timeslotRoutes,
  customerRoutes,
  appointmentAdminRoutes,
  projectRoutes,
  showcaseRoutes,
  dashboardRoutes,
  privacyRoutes,
} = require("./admin/routes");

//User Routes
const {
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
  paymentRouter,
  projectRouter,
  cancelRouter,
  favoriteRouter,
  feedbackRouter,
} = require("./routes");

//Import data
const { PATH_ADMIN, PATH_USER } = process.env;
const db = require("./config/database");

//Cookie Session
app.use(
  cookieSession({
    name: "tuto-session",
    keys: ["key1", "key2"],
  })
);

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

//Morgan
app.use(morgan("dev"));

//Cors
app.use(cors());

//ROUTES
//Admin
app.use(PATH_ADMIN, adminRoutes);
app.use(PATH_ADMIN, styleRoutes);
app.use(PATH_ADMIN, buildTypeRoutes);
app.use(PATH_ADMIN, locationRoutes);
app.use(PATH_ADMIN, projectTypeRoutes);
app.use(PATH_ADMIN, serviceTypeRoutes);
app.use(PATH_ADMIN, showcaseTypeRoutes);
app.use(PATH_ADMIN, timeslotRoutes);
app.use(PATH_ADMIN, customerRoutes);
app.use(PATH_ADMIN, appointmentAdminRoutes);
app.use(PATH_ADMIN, projectRoutes);
app.use(PATH_ADMIN, showcaseRoutes);
app.use(PATH_ADMIN, dashboardRoutes);
app.use(PATH_ADMIN, privacyRoutes);


//User

app.use(PATH_USER, authRouter);
app.use(PATH_USER, userAuthRouter);
app.use(PATH_USER, appointmentRouter);
app.use(PATH_USER, profileRouter);
app.use(PATH_USER, styleRouter);
app.use(PATH_USER, buildTypeRouter);
app.use(PATH_USER, locationRouter);
app.use(PATH_USER, serviceTypeRouter);
app.use(PATH_USER, timeslotRouter);
app.use(PATH_USER, userShowCaseRouter);
app.use(PATH_USER, paymentRouter);
app.use(PATH_USER, projectRouter);
app.use(PATH_USER, cancelRouter);
app.use(PATH_USER, favoriteRouter);
app.use(PATH_USER, feedbackRouter);

//Module Exports
module.exports = app;
