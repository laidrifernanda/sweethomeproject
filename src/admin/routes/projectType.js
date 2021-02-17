//Import dependencies
const router = require("express").Router();

//Controller
const projectTypeController = require("../controllers/projectType");

//Middleware
const projectTypeMiddleware = require("../middlewares/content");

//Routes
router.get("/projectType", projectTypeController.browse);
router.get("/projectType/:id", projectTypeController.read);
router.post(
  "/projectType",
  projectTypeMiddleware.add,
  projectTypeController.add
);
router.put(
  "/projectType/:id",
  projectTypeMiddleware.edit,
  projectTypeController.edit
);
router.delete("/projectType/:id", projectTypeController.delete);

//Module exports
module.exports = router;
