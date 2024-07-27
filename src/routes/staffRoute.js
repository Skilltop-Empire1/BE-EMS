const express = require("express");
//const validate = require("../middlewares/validation");
//const appointmentValidation = require("../schema/appointmentSchema");

const {create} = require("../controllers/staffController")

const router = express.Router();

router.post("/create", create)

module.exports = router