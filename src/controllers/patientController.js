const Patient = require("../models/patientModels")

const createPatient = async(req,res) =>{
    const {surname,name,email,phoneNo} = req.body
    await Patient.create({
        patient_surname:surname,
        patient_name:name,
        patient_email:email,
        patient_mobile:phoneNo
    })
}

module.exports = createPatient