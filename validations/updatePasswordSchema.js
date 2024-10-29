const Joi = require("joi");

const updatePasswordSchema = Joi.object({
    // email: Joi.string().email().required(),
    oldPassword:Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  })

  module.exports = { updatePasswordSchema };