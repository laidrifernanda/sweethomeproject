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
const appointmentAdminRoutes = require("./appointment");
const projectRoutes = require('./project');
const showcaseRoutes = require("./showcase");
const dashboardRoutes = require("./dashboard")

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
  appointmentAdminRoutes,
  projectRoutes,
  showcaseRoutes,
  dashboardRoutes,
};