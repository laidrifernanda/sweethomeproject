//Import dependencies
const router = require("express").Router();

//Controller
const locationController = require("../controllers/location");

//Middleware
const locationMiddleware = require("../middlewares/content");

//Routes
router.get("/location", locationController.browse);
router.get("/location/:id", locationController.read);
router.post("/location", locationMiddleware.add, locationController.add);
router.put("/location/:id", locationMiddleware.edit, locationController.edit);
router.delete("/location/:id", locationController.delete);

//Module exports
module.exports = router;
