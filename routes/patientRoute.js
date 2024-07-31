//require modules
const express = require("express")
const patient = require("../controllers/patientController")
// const Patient = require("../models/PatientModel")

//create express router
const router = express.Router()


//create routes
router.route("/count").post(patient.patientClass.patientCount)
router.route("/create").post(patient.patientClass.createPatient)
router.route("/edit").put(patient.patientClass.patientEdit)
router.route("/delete").delete(patient.patientClass.deletePatient)
//export module
module.exports = router