const express = require("express");

const {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getRecentAppointments,
  getAllRecentAppointments,
  getStaffRecentAppointments
} = require("../controllers/appointmentController");

//  move validation into the controller please
// const appointmentValidation = require("../validations/appointmentValidation");

const router = express.Router();

router.get("/recent", getRecentAppointments);
router.get("/", getAllAppointments);
router.get("/recent/all", getAllRecentAppointments);
router.post("/book", bookAppointment);
router.get("/:id", getAppointmentById);
router.get("/staff/:staffId", getStaffRecentAppointments);
router.put("/update/:appointmentId", updateAppointment);
router.delete("/delete/:appointmentId", deleteAppointment);

module.exports = router;
