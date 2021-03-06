//Import dependencies
const router = require("express").Router();

//Controller
const privacyController = require("../controller/privacy");

//Middleware
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/privacy",
  authMiddleware.validateToken,
  privacyController.browse
);
router.get(
  "/privacy/:id",
  authMiddleware.validateToken,
  privacyController.read
);
router.post(
  "/privacy",
  authMiddleware.validateToken,
  privacyController.add
);

//Module exports
module.exports = router;
