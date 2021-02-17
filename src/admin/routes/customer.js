//Import dependencies
const router = require("express").Router();

//Controller
const customerController = require("../controller/customer");

//Middleware

//Routes
router.get("/customer", customerController.browse);
router.get("/customer/:id", customerController.read);

//Module exports
module.exports = router;
