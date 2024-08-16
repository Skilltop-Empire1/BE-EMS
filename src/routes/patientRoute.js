const express = require("express");
//const validate = require("../middlewares/validation");
//const appointmentValidation = require("../schema/appointmentSchema");

const {createPatient} = require("../controllers/patientController")

const router = express.Router();

router.post("/create", createPatient)

module.exports = router