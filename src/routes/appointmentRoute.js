const express = require("express");
const validate = require("../middlewares/validation");
const appointmentValidation = require("../schema/appointmentSchema");
const {bookAutomaticAppointment, updateAppointment, deleteAppointment} = require("../controllers/appointmentController")

const router = express.Router();

router.post("/book", validate(appointmentValidation),bookAutomaticAppointment )
router.put('/update/:appointmentId', validate(appointmentValidation),updateAppointment )
router.delete('/delete/:appointmentId',deleteAppointment )

module.exports = router