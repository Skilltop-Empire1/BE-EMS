 const Joi = require("joi");

// Validation schema for creating or updating staff
const staffSchema = Joi.object({
  id: Joi.string().uuid().optional(), // UUID is optional for creation but should be included for updates
  lastName: Joi.string().min(1).max(100).required(),
  firstName: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,20}$/)
    .required(),
  educationalQualification: Joi.string().required(),
  practice: Joi.string().max(100).required(),   ///Recently added practice.
  specialization: Joi.string().max(100).required(),
  address: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(), // Ensures YYYY-MM-DD format
  role: Joi.string().max(100).optional(), // Optional field with default value in the model
  password: Joi.string().max(100).optional(), // Optional field with default value in the model
  shiftSchedule: Joi.string().max(100).optional(), // Optional field with default value in the model
  dateOfHire: Joi.string().max(100).optional(), // Optional field with default value in the model
  employStatus: Joi.string().max(100).optional(), // Optional field with default value in the model
  yrOfExperience: Joi.number().max(100).optional(), // Optional field with default value in the model
  deptId: Joi.string().max(100).optional(), // Optional field with default value in the model
});

module.exports = { staffSchema };
