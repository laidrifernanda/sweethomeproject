//Import dependencies
const router = require("express").Router();

//Controller
const styleController = require("../controller/style");

//Middleware
const styleMiddleware = require("../middleware/content");
const authMiddleware = require("../middleware/auth");

//Routes
router.get("/style", authMiddleware.validateToken, styleController.browse);
router.get("/style/:id", authMiddleware.validateToken, styleController.read);
router.post(
  "/style",
  authMiddleware.validateToken,
  styleMiddleware.add,
  styleController.add
);
router.put(
  "/style/:id",
  authMiddleware.validateToken,
  styleMiddleware.edit,
  styleController.edit
);
router.delete(
  "/style/:id",
  authMiddleware.validateToken,
  styleController.delete
);

//Module exports
module.exports = router;
