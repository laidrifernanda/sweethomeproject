//Import dependencies
const router = require("express").Router();

//Controller
const styleController = require("../admin/controller/style");

//Middleware
const authMiddleware = require("../middlewares/auth");

//Routes
router.get(
  "/style",
  authMiddleware.validateToken,
  styleController.browse
);

module.exports = router
