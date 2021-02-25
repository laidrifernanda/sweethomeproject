//Import Routes
const router = require('express').Router()

//Import Controller
const appointmentController = require('../controllers/appointmentController')

//Import Middleware
const appointmentMiddleware = require('../middlewares/appointmentMiddleware')
const authMiddleware = require('../middlewares/auth')

//Routes
router.get(
  "/appointment",
  authMiddleware.validateToken,
  appointmentController.browse
);

router.post("/appointment",
authMiddleware.validateToken,
appointmentMiddleware.validateBody,
appointmentController.create
)

module.exports = router