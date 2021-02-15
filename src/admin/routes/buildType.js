//Import dependencies
const router = require("express").Router();

//Controller
const buildTypeController = require("../controllers/buildType");

//Middleware
const buildTypeMiddleware = require("../middlewares/content");

//Routes
router.get("/buildType",  buildTypeController.browse);
router.get("/buildType/:id",  buildTypeController.read);
router.post("/buildType", buildTypeMiddleware.add,  buildTypeController.add);
router.put("/buildType/:id", buildTypeMiddleware.edit,  buildTypeController.edit);
router.delete("/buildType/:id",  buildTypeController.delete);

//Module exports
module.exports = router;
