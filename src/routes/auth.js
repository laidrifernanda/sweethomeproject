//Import dependencies
const router = require("express").Router();

//Controller
const userController = require("../controllers/auth");

//Middleware
const authMiddleware = require("../middlewares/auth")

//Routes
router.post("/register", authMiddleware.validateRegister,userController.register);
router.post("/login", authMiddleware.validateLogin, userController.login);

//Module exports
module.exports = router;
