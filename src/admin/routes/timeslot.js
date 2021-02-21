//Import dependencies
const router = require("express").Router();

//Controller
const timeslotController = require("../controller/timeslot");

//Middleware
const timeslotMiddleware = require("../middleware/timeslot");
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/serviceType/:serviceTypeId/timeslot",
  authMiddleware.validateToken,
  timeslotController.browse
);
router.post(
  "/serviceType/:serviceTypeId/timeslot",
  authMiddleware.validateToken,
  timeslotMiddleware.add,
  timeslotController.add
);
router.put(
  "/serviceType/:serviceTypeId/timeslot/:id",
  authMiddleware.validateToken,
  timeslotMiddleware.edit,
  timeslotController.edit
);
router.delete(
  "/serviceType/:serviceTypeId/timeslot/:id",
  authMiddleware.validateToken,
  timeslotController.delete
);

//Module exports
module.exports = router;
