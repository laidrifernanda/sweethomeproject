//Import dependencies
require("dotenv").config();

//Import dependencies
const joi = require("joi");
const jwt = require("jsonwebtoken");

//Import data
const { SECRET_KEY_TOKEN } = process.env;

//Module exports
module.exports = {
  validateRegister: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      name: joi.string().required().min(3),
      email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: joi.string().required(),
    });
    const validation = schema.validate(body);
    if (!validation.error) next();
    else
      res.status(500).send({
        error: validation.error.details[0].message,
        message: "Failed validation",
      });
  },
  validateLogin: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: joi.string().required(),
    });

    const validation = schema.validate(body);

    if (!validation.error) next();
    else
      res.status(500).send({
        error: validation.error.details[0].message,
        message: "Failed validation",
      });
  },
  validateToken: (req, res, next) => {
    const authenticate = req.headers.authorization;
    if (!authenticate) return res.status(401).send("Access Denied");

    try {
      const verified = jwt.verify(authenticate, SECRET_KEY_TOKEN);
      req.admin = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  },
  update: (req, res, next) => {
    const { body } = req;
    const schema = joi.object({
      name: joi.string().required(),
      email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: joi.string().required(),
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
