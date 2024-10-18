

const Joi = require("joi");

const appointmentValidationSchema = Joi.object({
  patName: Joi.string().required(),
      appointDate: Joi.date().required(),
      appointTime: Joi.string().required(),
      consultingDoc: Joi.string().required(),
      reason: Joi.string().allow(null),
});

module.exports = appointmentValidationSchema;
