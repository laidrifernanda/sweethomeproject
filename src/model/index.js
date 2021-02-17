//Import Model
const userModel = require("./users");
const adminModel = require("./admin");
const timeslotModel = require("./timeslot");
const testimoniModel = require("./testimoni");
const stylesModel = require("./styles");
const showcaseTypeModel = require("./showcaseType");
const showcaseModel = require("./showcase");
const serviceTypeModel = require("./serviceType");
const projectTypeModel = require("./projectType");
const projectModel = require("./project");
const paymentModel = require("./payment");
const packageTableModel = require("./packageTable");
const locationModel = require("./location");
const galeryModel = require("./galery");
const favoriteModel = require("./favorite");
const cancelModel = require("./cancel");
const buildTypeModel = require("./buildType");
const appointementModel = require("./appointment");

//Module exports
module.exports = {
  userModel,
  adminModel,
  timeslotModel,
  testimoniModel,
  stylesModel,
  showcaseTypeModel,
  showcaseModel,
  serviceTypeModel,
  projectTypeModel,
  projectModel,
  paymentModel,
  packageTableModel,
  locationModel,
  galeryModel,
  favoriteModel,
  cancelModel,
  buildTypeModel,
  appointementModel,
};
