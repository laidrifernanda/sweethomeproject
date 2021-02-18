const router = require('express').Router()
const appointmentMiddleware = require('../middlewares/appointmentMiddleware')
const appointmentController = require('../controllers/appointmentController')

router.get("/appointment", appointmentController.browse)

router.get("/appointment/:id", appointmentController.read)

router.post("/appointment/:userId",appointmentMiddleware.validateBody, appointmentController.create)

module.exports = router