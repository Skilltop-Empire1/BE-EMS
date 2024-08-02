// validators/organizationValidator.js

const Joi = require('joi');

const organizationSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    mobile_number: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().pattern(/^[0-9]+$/).min(6).max(7).required()
});

module.exports = organizationSchema;
