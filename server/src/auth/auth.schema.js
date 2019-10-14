const Joi = require('@hapi/joi');

const schema = Joi.object({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]*$)/)
    .min(2)
    .max(30)
    .required(),

  password: Joi.string()
    .trim()
    .min(10)
    .required(),
});

module.exports = schema;
