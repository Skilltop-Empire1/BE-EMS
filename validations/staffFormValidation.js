
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
  departmentName: Joi.string().required().messages({
      'any.required': 'department is required.',
      'string.base': 'department must be a string.'
  }),
  specialization: Joi.string().required().messages({
    'any.required': 'specialization is required.',
    'string.base': 'specialization must be a string.'
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
  licence: Joi.number().required().messages({
    'any.required': 'licence is required.',
    'string.base': 'licence must be a number .'
  }),
  educationalQualification: Joi.string().required().messages({
    'any.required': 'educationalQualification is required.',
    'string.base': 'educationalQualification must be a string  .'
  }),
  dateOfBirth: Joi.date().required().messages({
    'any.required': 'dateOfBirth is required.',
    'string.base': 'dateOfBirth must be in a valid date format dd-mm-yy .'
  }),
  gender: Joi.string().required().messages({
    'any.required': 'gender is required.',
    'string.base': 'gender must be a string.'
  }),
      employStatus: Joi.string().optional(),
      shiftSchedule: Joi.string().optional(),
      location: Joi.string().optional(),
      email: Joi.string().optional()
  });

module.exports = { staffSchema };
