//Import dependencies
const router = require("express").Router();

//Controller
const buildTypeController = require("../controller/buildType");

//Middleware
const buildTypeMiddleware = require("../middleware/content");
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/buildType",
  authMiddleware.validateToken,
  buildTypeController.browse
);
router.get(
  "/buildType/:id",
  authMiddleware.validateToken,
  buildTypeController.read
);
router.post(
  "/buildType",
  authMiddleware.validateToken,
  buildTypeMiddleware.add,
  buildTypeController.add
);
router.put(
  "/buildType/:id",
  authMiddleware.validateToken,
  buildTypeMiddleware.edit,
  buildTypeController.edit
);
router.delete(
  "/buildType/:id",
  authMiddleware.validateToken,
  buildTypeController.delete
);

//Module exports
module.exports = router;
