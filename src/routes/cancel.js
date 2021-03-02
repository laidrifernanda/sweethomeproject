//Import Routes
const router = require("express").Router();

//Import Controller
const cancelController = require("../controllers/cancelController");

//Import Middleware
const authMiddleware = require("../middlewares/auth");
const cancelMiddleware = require("../middlewares/cancelMiddleware");

//Routes
router.post(
  "/project/:projectId/cancel",
  authMiddleware.validateToken,
  cancelMiddleware.validateBody,
  cancelController.cancel
);
//test commit
module.exports = router;
