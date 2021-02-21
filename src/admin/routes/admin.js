//Import dependencies
const router = require("express").Router();

//Controller
const authController = require("../controller/auth");

//Middleware
const authMiddleware = require("../middleware/auth");

//Routes
router.get(
  "/",
  authMiddleware.validateToken,
  authController.browse
);
router.post(
  "/register",
  authMiddleware.validateToken,
  authMiddleware.validateRegister,
  authController.register
);
router.put("/:id",
  authMiddleware.validateToken,
  authMiddleware.update,
  authController.edit
);
router.delete("/:id",
  authMiddleware.validateToken,
  authController.delete
);
router.get(
  "/logout",
  authMiddleware.validateToken,
  authController.logout,
);
  
// router.post("/login", authMiddleware.validateLogin, authController.login);
//Module exports
module.exports = router;
