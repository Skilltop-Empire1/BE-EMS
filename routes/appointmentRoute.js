const express = require("express");
const validate = require("../validations/appointmentValidation");
const appointmentValidation = require("../schema/appointmentSchema");
const {bookAppointment, updateAppointment, deleteAppointment, getRecentAppointments} = require("../controllers/appointmentController")

const router = express.Router();

router.get("/recent", getRecentAppointments )
router.post("/book/:patientId", validate(appointmentValidation), bookAppointment )
router.put('/update/:appointmentId', validate(appointmentValidation),updateAppointment )
router.delete('/delete/:appointmentId',deleteAppointment )

module.exports = router