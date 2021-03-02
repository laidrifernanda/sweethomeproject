//Import Router
const router = require("express").Router();

//Import Controller
const showcaseController = require("../controllers/showcase");

//Import Middleware
const authMiddleware = require("../middlewares/auth");

//Router
router.get("/showcase", showcaseController.browse);
router.get("/showcase/search", showcaseController.search);
router.get("/showcase/project", showcaseController.project);
router.get("/showcase/portofolio", showcaseController.profile);
router.get("/showcase/project/location", showcaseController.locationProject);
router.get("/showcase/portofolio/location", showcaseController.locationProfile);
router.get("/showcase/project/style", showcaseController.styleProject);
router.get("/showcase/portofolio/style", showcaseController.stylePortofolio);
router.get("/showcase/:showcaseId", showcaseController.read);
/*-----------------------Favorite-------------------------*/
router.post(
  "/showcase/:showcaseId/favorite",
  authMiddleware.validateToken,
  showcaseController.love
);
module.exports = router;
