// const Joi = require("joi");

// // Validation schema for creating or updating staff
// const staffValidationSchema = Joi.object({
//   id: Joi.string().uuid().optional(), // UUID is optional for creation but should be included for updates
//   lastName: Joi.string().min(1).max(100).required(),
//   firstName: Joi.string().min(1).max(100).required(),
//   email: Joi.string().email().required(),
//   gender: Joi.string().valid("Male", "Female", "Other").required(),
//   mobile: Joi.string()
//     .pattern(/^[0-9]{10,20}$/)
//     .required(),
//   educationalQualification: Joi.string().required(),
//   practice: Joi.string().max(100).required(),   ///Recently added practice.
//   specialization: Joi.string().max(100).required(),
//   address: Joi.string().required(),
//   dateOfBirth: Joi.date().iso().required(), // Ensures YYYY-MM-DD format
//   role: Joi.string().max(100).optional(), // Optional field with default value in the model
// });

// module.exports = {
//   staffValidationSchema,
// };
const Joi = require('joi');

const staffSchema = Joi.object({
  firstName: Joi.string().required().messages({
        'any.required': 'firstName is required.',
        'string.base': 'firstName must be a string.'
  }),
  lastName: Joi.string().required().messages({
        'any.required': 'lastName is required.',
        'string.base': 'lastName must be a string.'
  }),
  role: Joi.string().required().messages({
        'any.required': 'role is required.',
        'string.base': 'role must be a valid string.'
  }),
  department: Joi.string().required().messages({
      'any.required': 'department is required.',
      'string.base': 'department must be a string.'
  }),
  specialization: Joi.string().required().messages({
    'any.required': 'specialization is required.',
    'string.base': 'specialization must be a string.'
  }),
 shiftSchedule: Joi.string().required().messages({
   'any.required': 'shiftSchedule is required.',
   'string.base': 'shiftSchedule must be a string.'
  }),
  dateOfHire: Joi.date().required().messages({
    'any.required': 'dateOfHire is required.',
    'string.base': 'dateOfHire must be a valid date format dd-mm-yy.'
  }),
  yrOfExperience: Joi.number().required().messages({
    'any.required': 'yrOfExperience is required.',
    'string.base': 'yrOfExperience must be a number.'
  }),
  phone: Joi.string().required().messages({
    'any.required': 'phoneNumber is required.',
    'string.base': 'phoneNumber must be in a valid format .'
  }),
      employStatus: Joi.string().optional(),
      location: Joi.string().optional(),
      email: Joi.string().optional()
  });

module.exports = { staffSchema };
