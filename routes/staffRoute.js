const express = require("express");
//const validate = require("../middlewares/validation");
//const appointmentValidation = require("../schema/appointmentSchema");

const {createStaff} = require("../controllers/staffController")

const router = express.Router();

router.post("/create", createStaff)

module.exports = router