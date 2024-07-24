const Patient = require("../models/patientModels")

const createPatient = async(req,res) =>{
    const {name,email,phoneNo} = req.body
    await Patient.create({
        patient_name:name,
        patient_email:email,
        patient_mobile:phoneNo
    })
}