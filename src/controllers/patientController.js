const Patient = require("../models/patientModel")
const Organization = require("../models/organizationModel")

const createPatient = async(req,res) =>{
    const {surname,name,email,phoneNo,orgName} = req.body
    try {
        const org = await Organization.findOne({where:{org_name:orgName}})
        if(!org) return res.status(404).json("org name not found")
            const patient= await Patient.create({
                patient_surname:surname,
                patient_name:name,
                patient_email:email,
                patient_mobile:phoneNo,
                org_id:org.org_id
            })
            res.status(201).json({patient})
    } catch (error) {
       console.log(error) 
    }
}

module.exports = {createPatient}