//Import dependencies
const router = require("express").Router();

//Controller
const styleController = require("../controller/style");

//Middleware
const styleMiddleware = require("../middleware/content");

//Routes
router.get("/style", styleController.browse);
router.get("/style/:id", styleController.read);
router.post("/style", styleMiddleware.add, styleController.add);
router.put("/style/:id", styleMiddleware.edit, styleController.edit);
router.delete("/style/:id", styleController.delete);

//Module exports
module.exports = router;
