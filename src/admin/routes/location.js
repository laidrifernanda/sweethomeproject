//Import dependencies
const router = require("express").Router();

//Controller
const locationController = require("../controller/location");

//Middleware
const locationMiddleware = require("../middleware/content");
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/location",
  authMiddleware.validateToken,
  locationController.browse
);
router.get(
  "/location/:id",
  authMiddleware.validateToken,
  locationController.read
);
router.post(
  "/location",
  authMiddleware.validateToken,
  locationMiddleware.add,
  locationController.add
);
router.put(
  "/location/:id",
  authMiddleware.validateToken,
  locationMiddleware.edit,
  locationController.edit
);
router.delete(
  "/location/:id",
  authMiddleware.validateToken,
  locationController.delete
);

//Module exports
module.exports = router;
