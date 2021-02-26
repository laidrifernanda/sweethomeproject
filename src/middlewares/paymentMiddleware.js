const joi = require("joi");

module.exports = {
  validateBody: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      note: joi.string().required(),
      project: joi.required(),
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
