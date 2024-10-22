const Joi = require("joi");


const reportSchema = Joi.object({
    reportDate: Joi.date().required(),
    diagnosis: Joi.string().allow(null),
    prescription: Joi.string().allow(null),
    consultDate: Joi.date().allow(null),
    testsOrdered: Joi.string().allow(null),
    followupDate: Joi.date().allow(null),
    notes: Joi.string().allow(null),
    vitalSign: Joi.object().allow(null),
    paymentRefNo: Joi.string().allow(null),
});

module.exports = {
  reportSchema,
};
