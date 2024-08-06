// validators/doctorValidator.js

const Joi = require('joi');

const doctorSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    mobile_number: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),
    practice: Joi.string().required(),
    specialization: Joi.string().required(),
    date_Of_Birth: Joi.date().less('now').required().messages({
        'date.less': 'Date of birth must be in the past'
      }),
      education_qualification: Joi.string().valid('High School', 'Associate Degree', 'Bachelor Degree', 'Nursing', 'Master Degree', 'Doctorate').required()
    });

module.exports = doctorSchema;
