//Import dependencies
const router = require("express").Router();

//Controller
const customerController = require("../controller/customer");

//Middleware
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/customer",
  authMiddleware.validateToken,
  customerController.browse
);
router.get(
  "/customer/:id",
  authMiddleware.validateToken,
  customerController.read
);

//Module exports
module.exports = router;
