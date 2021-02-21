//Import dependencies
const router = require("express").Router();

//Controller
const serviceTypeController = require("../controller/serviceType");

//Middleware
const serviceTypeMiddleware = require("../middleware/content");
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/serviceType",
  authMiddleware.validateToken,
  serviceTypeController.browse
);
router.get(
  "/serviceType/:id",
  authMiddleware.validateToken,
  serviceTypeController.read
);
router.post(
  "/serviceType",
  authMiddleware.validateToken,
  serviceTypeMiddleware.add,
  serviceTypeController.add
);
router.put(
  "/serviceType/:id",
  authMiddleware.validateToken,
  serviceTypeMiddleware.edit,
  serviceTypeController.edit
);
router.delete(
  "/serviceType/:id",
  authMiddleware.validateToken,
  serviceTypeController.delete
);

//Module exports
module.exports = router;
