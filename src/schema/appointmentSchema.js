const joi =  require("joi")

const appointmentValidation = joi.object({
    appointment_date: joi.date().required(),
    appointment_time: joi.string().required(),
    reason: joi.string().optional(),
    patient_id: joi.number().integer().required(),
    doctor_id: joi.number().integer().required(),
    organization_id: joi.number().integer().required(),
})

module.exports = appointmentValidation