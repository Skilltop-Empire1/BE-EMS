const Appointment = require("../models/appointmentModel")

const create = async (req,res) => {
    const {reason} = req.body
    try {
        await Appointment.create(

        )
    } catch (error) {
        console.log(error)
    }
}