//Import dependencies
const router = require("express").Router();

//Controller
const dashboardController = require("../controller/dashboard");

//Middleware
const authMiddleware = require("../middleware/auth");
//Routes
router.get(
  "/dashboard",
  authMiddleware.validateToken,
  dashboardController.dashboard
);

//Module exports
module.exports = router;
