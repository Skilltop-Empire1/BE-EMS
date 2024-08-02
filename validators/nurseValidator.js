// validators/nurseValidator.js

const Joi = require('joi');

const nurseSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    mobile_number: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    practice: Joi.string().required(),
    specialization: Joi.string().required(),
});

module.exports = nurseSchema;
