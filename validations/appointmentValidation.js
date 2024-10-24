const Joi = require('joi');

const appointmentValidationSchema = Joi.object({

  appointDate: Joi.date()
    .required()
    .messages({
      'any.required': 'Appointment date is required',
      'date.base': 'Appointment date must be a valid date',
    }),

  appointTime: Joi.string()
    .pattern(/^([0-9]{2}):([0-9]{2})(:[0-9]{2})?$/)
    .required()
    .messages({
      'any.required': 'Appointment time is required',
      'string.pattern.base': 'Appointment time must be in HH:MM format',
    }),

  reason: Joi.string()
    .allow(null, '')
    .optional(),

  address: Joi.string()
    .allow(null, '')
    .optional(),

  patName: Joi.string()
    .max(100)
    .required()
    .messages({
      'any.required': 'Patient name is required',
      'string.max': 'Patient name must be less than or equal to 100 characters',
    }),

  email: Joi.string()
    .email()
    .allow(null, '')
    .optional()
    .messages({
      'string.email': 'Email must be a valid email address',
    }),

  phone: Joi.string()
    .max(20)
    .allow(null, '')
    .optional()
    .messages({
      'string.max': 'Phone number must be less than or equal to 20 characters',
    }),

  gender: Joi.string()
    .valid('Male', 'Female', 'Other')
    .allow(null, '')
    .optional()
    .messages({
      'any.only': 'Gender must be one of Male, Female, or Other',
    }),

  dateOfBirth: Joi.date()
    .required()
    .messages({
      'any.required': 'Date of birth is required',
      'date.base': 'Date of birth must be a valid date',
    }),
});



module.exports = {appointmentValidationSchema}
  

