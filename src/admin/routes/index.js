//Import routes
const adminRoutes = require("./admin");
const styleRoutes = require("./styles");
const buildTypeRoutes = require("./buildType");
const locationRoutes = require("./location");
const projectTypeRoutes = require("./projectType");
const serviceTypeRoutes = require("./serviceType");
const showcaseTypeRoutes = require("./showcaseType");
const timeslotRoutes = require("./timeslot");
const customerRoutes = require("./customer");
const appointmentRoutes = require("./appointment")

//Module exports
module.exports = {
  adminRoutes,
  styleRoutes,
  buildTypeRoutes,
  locationRoutes,
  projectTypeRoutes,
  serviceTypeRoutes,
  showcaseTypeRoutes,
  timeslotRoutes,
  customerRoutes,
  appointmentRoutes
};