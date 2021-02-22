//Import dependencies
const router = require("express").Router();

//Controller
const buildTypeController = require("../admin/controller/buildType");

//Middleware
const authMiddleware = require("../middlewares/auth");

//Routes
router.get(
  "/buildType",
  authMiddleware.validateToken,
  buildTypeController.browse
);

module.exports = router
