const Joi = require('joi');

const appointmentValidationSchema = Joi.object({

  appointmentDate: Joi.date()
    .required()
    .messages({
      'any.required': 'Appointment date is required',
      'date.base': 'Appointment date must be a valid date',
    }),

  appointmentTime: Joi.string()
    .pattern(/^([0-9]{2}):([0-9]{2})(:[0-9]{2})?$/)
    .required()
    .messages({
      'any.required': 'Appointment time is required',
      'string.pattern.base': 'Appointment time must be in HH:MM format',
    }),

  reason: Joi.string()
    .allow(null, '')
    .optional(),

  specialty: Joi.string()
    .allow(null, '')
    .optional(),

  deptName: Joi.string()
    .max(100)
    .required()
    .messages({
      'any.required': 'Patient name is required',
      'string.max': 'Patient name must be less than or equal to 100 characters',
    }),

  consultName: Joi.string()
    .max(50)
    .allow(null, '')
    .optional()
    .messages({
      'string.max': 'Consultant name must be a string',
    }),

  firstname: Joi.string()
    .max(20)
    .allow(null, '')
    .optional()
    .messages({
      'string.max': 'Firstname must be a string',
    }),

  phoneNo: Joi.string()
    .max(20)
    .allow(null, '')
    .optional()
    .messages({
      'string.max': 'Phone number must be less than or equal to 20 characters',
    }),


 
});



module.exports = {appointmentValidationSchema}
  

