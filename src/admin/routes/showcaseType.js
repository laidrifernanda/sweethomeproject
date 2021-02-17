//Import dependencies
const router = require("express").Router();

//Controller
const showcaseTypeController = require("../controller/showcaseType");

//Middleware
const showcaseTypeMiddleware = require("../middleware/content");

//Routes
router.get("/showcaseType", showcaseTypeController.browse);
router.get("/showcaseType/:id", showcaseTypeController.read);
router.post(
  "/showcaseType",
  showcaseTypeMiddleware.add,
  showcaseTypeController.add
);

//Module exports
module.exports = router;
