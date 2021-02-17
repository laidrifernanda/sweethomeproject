//Import dependencies
const router = require("express").Router();

//Controller
const serviceTypeController = require("../controller/serviceType");

//Middleware
const serviceTypeMiddleware = require("../middleware/content");

//Routes
router.get("/serviceType", serviceTypeController.browse);
router.get("/serviceType/:id", serviceTypeController.read);
router.post("/serviceType", serviceTypeMiddleware.add, serviceTypeController.add);
router.put(
  "/serviceType/:id",
  serviceTypeMiddleware.edit,
  serviceTypeController.edit
);
router.delete("/serviceType/:id", serviceTypeController.delete);

//Module exports
module.exports = router;
