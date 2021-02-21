//Import dependencies
const router = require("express").Router();

//Controller
const dashboardController = require("../controller/dashboard");

//Middleware

//Routes
router.get("/dashboard", dashboardController.dashboard);

//Module exports
module.exports = router;
