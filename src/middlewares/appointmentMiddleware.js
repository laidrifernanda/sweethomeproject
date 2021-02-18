const joi = require('joi')

module.exports = {
    validateBody: (req, res, next) => {
        const {body} = req
        const appointmentSchema = joi.object({
            duration: joi.number().required(),
            area: joi.number().required(),
            budget: joi.string().required(),
            address: joi.string().required(),
            date: joi.date().required(),
            note: joi.string().required(),
            buildType: joi.string().required(),
            serviceType: joi.string().required(),
            durationType: joi.string().required(),
            locations: joi.string().required(),
            styles: joi.string().required(),
            timeslot: joi.string().required()
        })
        const validatePayloads = appointmentSchema.validate(body)
        console.log(validatePayloads.error, "ini validatePayloads mid")
        if(!validatePayloads.error) {
            next()
        } else {
            res.send({
                status:500,
                error: true,
                error_message: validatePayloads.error,
                message: "failed validation",
                data: []
            })
        }
    }
}