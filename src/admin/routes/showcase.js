//Import dependencies
const router = require("express").Router();

//Controller
const showcaseController = require("../controller/showcase");

//Middleware
const uploadShowcaseMiddleware = require("../middleware/uploadShowcase");
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/showcase",
  authMiddleware.validateToken,
  showcaseController.browse
);
router.get(
  "/showcase/search",
  authMiddleware.validateToken,
  showcaseController.search
);
// router.get("/showcaseType/:id", showcaseController.read);
router.post("/showcase", authMiddleware.validateToken, showcaseController.add);

router.post(
  "/showcase/upload",
  authMiddleware.validateToken,
  uploadShowcaseMiddleware.single("galery"),
  showcaseController.upload
);

//Module exports
module.exports = router;
