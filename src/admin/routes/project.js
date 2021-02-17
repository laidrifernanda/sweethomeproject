//Import dependencies
const router = require("express").Router();

//Controller
const projectController = require("../controllers/project");

//Middleware
const projectMiddleware = require("../middlewares/content");

//Routes
router.get("/project", projectController.browse);
router.get("/project/:id", projectController.read);
router.post(
  "/project",
  projectMiddleware.add,
  projectController.add
); z
router.put(
  "/project/:id",
  projectMiddleware.edit,
  projectController.edit
);
router.delete("/project/:id", projectController.delete);

//Module exports
module.exports = router;
