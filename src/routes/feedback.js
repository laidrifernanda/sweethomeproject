//Import Routes
const router = require("express").Router();

//Import Controller
const feedbackController = require("../controllers/feedbackController");

//Import Middleware
const authMiddleware = require("../middlewares/auth");
const feedbackMiddleware = require("../middlewares/feedbackMiddleware");

//Routes
router.post(
  "/project/:projectId/feedback",
  authMiddleware.validateToken,
  feedbackMiddleware.validateBody,
  feedbackController.feedback
);

module.exports = router;
