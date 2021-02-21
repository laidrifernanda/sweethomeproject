//Import dependencies
const router = require("express").Router();

//Controller
const showcaseTypeController = require("../controller/showcaseType");

//Middleware
const showcaseTypeMiddleware = require("../middleware/content");
const authMiddleware = require("../middleware/auth")

//Routes
router.get("/showcaseType",authMiddleware.validateToken, showcaseTypeController.browse);
router.get("/showcaseType/:id",authMiddleware.validateToken, showcaseTypeController.read);
router.post(
  "/showcaseType",
  authMiddleware.validateToken,
  showcaseTypeMiddleware.add,
  showcaseTypeController.add
);

//Module exports
module.exports = router;
