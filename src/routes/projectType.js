//Import dependencies
const router = require("express").Router();

//Controller
const projectTypeController = require("../admin/controller/projectType");

//Middleware
// const projectTypeMiddleware = require("../middleware/content");

//Routes
router.get(
  "/projectType",
  projectTypeController.browse
);

module.exports = router