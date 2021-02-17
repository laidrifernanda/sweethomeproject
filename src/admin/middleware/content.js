//Import dependencies
const joi = require("joi");

//Module exports
module.exports = {
  add: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      name: joi.string().required(),
    });

    const validation = schema.validate(body);

    if (!validation.error) next();
    else
      res.status(500).send({
        error: validation.error.details[0].message,
      });
  },
  edit: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      name: joi.string().required(),
    });

    const validation = schema.validate(body);

    if (!validation.error) next();
    else
      res.status(500).send({
        error: validation.error.details[0].message,
      });
  },
};
