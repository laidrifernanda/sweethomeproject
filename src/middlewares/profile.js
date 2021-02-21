//Import dependencies
const joi = require("joi");

//Module exports
module.exports = {
  validateBody: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      phone: joi.string(),
      address: joi.string(),
      firstname: joi.string(),
      lastname: joi.string(),
      email: joi.string(),
      password: joi.string(),
    });
    const validation = schema.validate(body);
    if (!validation.error) next();
    else
      res.status(500).send({
        error: validation.error.details[0].message,
        message: "Failed validation",
      });
  },
};
