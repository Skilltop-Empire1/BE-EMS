const joi =  require("joi")

const appointmentValidation = joi.object({
    appointmentDate: joi.date().required(),
    appointmentTime: joi.string().required(),
    reason: joi.string().optional(),
    orgName: joi.string().required(),
})

module.exports = appointmentValidation