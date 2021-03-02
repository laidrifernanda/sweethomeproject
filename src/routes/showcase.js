const router = require("express").Router();
const showcaseController = require("../controllers/showcase");

router.get("/showcase", showcaseController.browse);
router.get("/showcase/search", showcaseController.search);
router.get("/showcase/project", showcaseController.project);
router.get("/showcase/portofolio", showcaseController.profile);
router.get("/showcase/:showcaseId", showcaseController.read);

router.get("/showcase/project/location",showcaseController.locationProject)
router.get("/showcase/portofolio/location",showcaseController.locationProfile)

router.get("/showcase/project/style", showcaseController.styleProject)
router.get("/showcase/portofolio/style", showcaseController.stylePortofolio)

module.exports = router;
