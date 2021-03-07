//Import dependencies
const router = require('express').Router()

//Import controller
const profileController = require("../controllers/profile")

//Import Middleware
const authMiddleware = require('../middlewares/auth')
const uploadProfileMiddleware = require('../middlewares/uploadprofile')
const profileMiddleware = require('../middlewares/profile')

//ROUTES
router.get("/profile", 
    authMiddleware.validateToken,
    profileController.read)
router.put("/profile", 
    authMiddleware.validateToken,
    // profileMiddleware.validateBody,
    profileController.update)

router.put(
  "/profile/password",
  authMiddleware.validateToken,
//   profileMiddleware.validateBody,
  profileController.updatePass
);


router.post("/upload", 
    authMiddleware.validateToken,
    uploadProfileMiddleware.single("photo"),
    profileController.upload)

module.exports = router