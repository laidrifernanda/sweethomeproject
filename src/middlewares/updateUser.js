const joi = require('joi')

module.exports = {
    validateBody: (req, res, next) => {
        const {body} = req
        console.log(body, "ini body")
        const schema= joi.object({
            phone: joi.string(),
            address: joi.string(),
            firstname: joi.string(),
            lastname: joi.string(),
            email: joi.string(),
            password: joi.string(),
        })
        // console.log(schema, "ini schema")
        const validation = schema.validate(body)
        console.log(validation.error, "ini validation mid")
        if(!validation.error) {
            next()
        } else {
            res.send({
                status:500,
                error: true,
                error_message: validation.error,
                message: "failed validation",
                data: []
            })
        }
    }
}