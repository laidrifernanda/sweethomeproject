//Import dependencies
const router = require("express").Router();

//Controller
const projectTypeController = require("../controller/projectType");

//Middleware
const projectTypeMiddleware = require("../middleware/content");
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/projectType",
  authMiddleware.validateToken,
  projectTypeController.browse
);
router.get(
  "/projectType/:id",
  authMiddleware.validateToken,
  projectTypeController.read
);
router.post(
  "/projectType",
  authMiddleware.validateToken,
  projectTypeMiddleware.add,
  projectTypeController.add
);
router.put(
  "/projectType/:id",
  authMiddleware.validateToken,
  projectTypeMiddleware.edit,
  projectTypeController.edit
);
router.delete(
  "/projectType/:id",
  authMiddleware.validateToken,
  projectTypeController.delete
);

//Module exports
module.exports = router;
