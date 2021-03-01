const router = require("express").Router();
const showcaseController = require("../controllers/showcase");

router.get("/showcase", showcaseController.browse);
router.get("/showcase/search", showcaseController.search);
router.get("/showcase/project", showcaseController.project);
router.get("/showcase/portofolio", showcaseController.profile);
router.get("/showcase/:showcaseId", showcaseController.read);
router.post("/showcase/:showcaseId/favorite", showcaseController.love)
module.exports = router;
