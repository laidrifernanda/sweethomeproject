const joi = require("joi");

module.exports = {
  validateBody: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      receipt: joi.string().required(),
      note: joi.string().required(),
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
