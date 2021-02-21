//Import dependencies
const router = require("express").Router();

//Controller
const appointmentController = require("../controller/appointment");
const calendarController = require("../controller/calendar");

//Middleware
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/appointment",
  authMiddleware.validateToken,
  appointmentController.browse
);
router.get(
  "/appointment/calendar",
  authMiddleware.validateToken,
  calendarController.browse
);
router.get(
  "/appointment/:id",
  authMiddleware.validateToken,
  appointmentController.read
);
// router.get("/appointment", appointmentController.sort);
router.put(
  "/appointment/:id/status",
  authMiddleware.validateToken,
  appointmentController.status
);
// router.put("/appointment/:id", appointment.edit)
// router.delete("/appointment/:id", appointment.delete)

//Module exports
module.exports = router;
