const joi = require('joi')

module.exports = {
  validateBody: (req, res, next) => {
    const {body} = req
    const schema= joi.object({
        duration: joi.number().required(),
        area: joi.number().required(),
        budget: joi.number().required(),
        address: joi.string().required(),
        date: joi.date().required(),
        note: joi.string(),
        buildType: joi.required(),
        serviceType: joi.required(),
        locations: joi.required(),
        styles: joi.required(),
        timeslot: joi.required()
    })
    const validation = schema.validate(body);

    if (!validation.error) next();
    else
      res.status(500).send({
        error: validation.error.details[0].message,
        message: "Failed validation",
      });
    }
}