//Import dependencies
const router = require("express").Router();

//Controller
const privacyController = require("../admin/controller/privacy");

//Middleware
// const authMiddleware = require("../middleware/auth");

//Routes
router.get("/privacy", privacyController.browse);


//Module exports
module.exports = router;
