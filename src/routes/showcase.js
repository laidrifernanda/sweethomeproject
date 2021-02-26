const router = require("express").Router();
const showcaseController = require("../controllers/showcase");

router.get("/showcase", showcaseController.browse);
router.get("/showcase/:showcaseId", showcaseController.read);
router.get("/showcase/project", showcaseController.project);
router.get("/showcase/portofolio", showcaseController.profile);

module.exports = router;
