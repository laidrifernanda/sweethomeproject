//Import dependencies
const router = require("express").Router();

//Controller
const favoriteController = require("../controllers/favorite");

//Middleware
const authMiddleware = require("../middlewares/auth");

//Routes
router.get(
  "/favorite",
  authMiddleware.validateToken,
  favoriteController.browse
);

module.exports = router;
