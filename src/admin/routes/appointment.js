//Import dependencies
const router = require("express").Router();

//Controller
const appointmentController = require("../controller/appointment");
const calendarController = require("../controller/calendar");

//Middleware

//Routes
router.get("/appointment", appointmentController.browse);
router.get("/appointment/calendar",  calendarController.browse);
router.get("/appointment/:id", appointmentController.read);
// router.get("/appointment", appointmentController.sort);
router.put("/appointment/:id/status", appointmentController.status);
// router.put("/appointment/:id", appointment.edit)
// router.delete("/appointment/:id", appointment.delete)

//Module exports
module.exports = router;
