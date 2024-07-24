//require modules
const express = require("express")
const patient = require("../controllers/patientController")
// const Patient = require("../models/PatientModel")

//create express router
const router = express.Router()


//create routes
router.route("/").get(patient.patientClass.login)
router.route("/create").post(patient.patientClass.createPatient)


//export module
module.exports = router