//Import dependencies
const router = require("express").Router();

//Controller
const timeslotController = require("../admin/controller/timeslot");

//Middleware
const authMiddleware = require("../middlewares/auth");

//Routes
router.get(
  "/serviceType/:serviceTypeId/timeslot",
  timeslotController.browse
);

module.exports = router
