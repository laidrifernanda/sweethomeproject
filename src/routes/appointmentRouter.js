const router = require('express').Router()
const appointmentMiddleware = require('../middlewares/appointmentMiddleware')
const appointmentController = require('../controllers/appointmentController')

router.post("/appointment/:userId",appointmentMiddleware.validateBody, appointmentController.create)

module.exports = router