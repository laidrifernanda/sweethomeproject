//Import dependencies
const router = require("express").Router();

//Controller
const showcaseController = require("../controller/showcase");

//Middleware
const uploadShowcaseMiddleware = require("../middleware/uploadShowcase");

//Routes
// router.get("/showcaseType", showcaseController.browse);
// router.get("/showcaseType/:id", showcaseController.read);
router.post(
  "/showcase",
  // showcaseMiddleware.add,
  showcaseController.add
);

router.post(
  "/showcase/upload",
  uploadShowcaseMiddleware.single('galery'),
  showcaseController.upload
);

//Module exports
module.exports = router;
