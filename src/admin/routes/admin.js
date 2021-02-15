//Import dependencies
const router = require("express").Router();

//Controller
const authController = require("../controllers/auth");

//Middleware
const authMiddleware = require("../middlewares/auth");

//Routes
router.post(
  "/register",
  authMiddleware.validateRegister,
  authController.register
);
router.post("/login", authMiddleware.validateLogin, authController.login);
router.put("/edit");
router.delete("/delete");

//Module exports
module.exports = router;
