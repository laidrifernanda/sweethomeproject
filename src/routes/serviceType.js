//Import dependencies
const router = require("express").Router();

//Controller
const serviceTypeController = require("../admin/controller/serviceType");

//Middleware
const authMiddleware = require("../middlewares/auth");

//Routes
router.get(
  "/serviceType",
  authMiddleware.validateToken,
  serviceTypeController.browse
);

module.exports = router
