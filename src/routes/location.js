//Import dependencies
const router = require("express").Router();

//Controller
const locationController = require("../admin/controller/location");

//Middleware
const authMiddleware = require("../middlewares/auth");

//Routes
router.get(
  "/location",
  locationController.browse
);

module.exports = router
