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

router.get(
  "/favorite/search",
  authMiddleware.validateToken,
  favoriteController.searchFav
)

module.exports = router;
