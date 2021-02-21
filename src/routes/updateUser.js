const router = require('express').Router()
const updateUserController = require("../controllers/updateUser")
//Import Middleware
const authMiddleware = require('../middlewares/auth')
const uploadProfileMiddleware = require('../middlewares/uploadprofile')
const updateUserMiddleware = require('../middlewares/updateUser')

//ROUTES
router.put("/update", 
    authMiddleware.validateToken,
    updateUserMiddleware.validateBody,
    updateUserController.update)

router.post("/uploadprofile", 
    authMiddleware.validateToken,
    uploadProfileMiddleware.single("image"),
    updateUserController.upload)

module.exports = router