//Import dependencies
const router = require("express").Router();

//Import controller
const projectController = require("../controllers/project");

//Import Middleware
const authMiddleware = require("../middlewares/auth");

//ROUTES
router.get("/project", authMiddleware.validateToken, projectController.browse);
router.get(
  "/project/:projectId",
  authMiddleware.validateToken,
  projectController.read
);

//Module exports
module.exports = router