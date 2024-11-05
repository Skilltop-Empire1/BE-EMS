// const express = require("express");

// const {
//   bookAppointment,
//   getAllAppointments,
//   getAppointmentById,
//   updateAppointment,
//   deleteAppointment,
//   getRecentAppointments,
//   getAllRecentAppointments,
//   getStaffRecentAppointments
// } = require("../controllers/appointmentController");

// const router = express.Router();

// router.get("/recent", getRecentAppointments);
// router.get("/", getAllAppointments);
// router.get("/recent/all", getAllRecentAppointments);
// router.post("/book",bookAppointment);
// router.get("/:id", getAppointmentById);
// router.get("/staff/:staffId", getStaffRecentAppointments);
// router.put("/update/:appointId", updateAppointment);
// router.delete("/delete/:appointId", deleteAppointment);

// module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API for managing appointments
 */

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

const router = express.Router();

/**
 * @swagger
 * /appointments/recent:
 *   get:
 *     summary: Get recent appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of recent appointments
 *       500:
 *         description: Server error
 */
router.get("/recent", getRecentAppointments);

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of all appointments
 *       500:
 *         description: Server error
 */
router.get("/", getAllAppointments);

/**
 * @swagger
 * /appointments/recent/all:
 *   get:
 *     summary: Get all recent appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of all recent appointments
 *       500:
 *         description: Server error
 */
router.get("/recent/all", getAllRecentAppointments);

/**
 * @swagger
 * /appointments/book:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deptName:
 *                 type: string
 *                 example: "Blood"
 *                 description: "The department where the appointment will take place"
 *               firstname:
 *                 type: string
 *                 example: "Okparaqmw"
 *                 description: "Patient's first name"
 *               phoneNo:
 *                 type: string
 *                 example: "08169625557"
 *                 description: "Patient's phone number"
 *               specialty:
 *                 type: string
 *                 example: "Pediatric"
 *                 description: "Specialty of the doctor or department"
 *               consultName:
 *                 type: string
 *                 example: "Preckututu"
 *                 description: "Name of the consultant or doctor"
 *               reason:
 *                 type: string
 *                 example: "to see a doctor"
 *                 description: "Reason for the appointment"
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-05"
 *                 description: "Date of the appointment in YYYY-MM-DD format"
 *               appointmentTime:
 *                 type: string
 *                 format: time
 *                 example: "09:30:20"
 *                 description: "Time of the appointment in HH:MM:SS format"
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/book", bookAppointment);

/**
 * @swagger
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: Appointment details
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getAppointmentById);

/**
 * @swagger
 * /appointments/staff/{staffId}:
 *   get:
 *     summary: Get recent appointments for a staff member
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: staffId
 *         schema:
 *           type: string
 *         required: true
 *         description: The staff ID
 *     responses:
 *       200:
 *         description: List of recent appointments for the staff member
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Server error
 */
router.get("/staff/:staffId", getStaffRecentAppointments);

/**
 * @swagger
 * /appointments/update/{appointId}:
 *   put:
 *     summary: Update an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-25"
 *               appointTime:
 *                 type: string
 *                 format: time
 *                 example: "10:30:00"
 *               reason:
 *                 type: string
 *                 example: "Updated reason"
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.put("/update/:appointId", updateAppointment);

/**
 * @swagger
 * /appointments/delete/{appointId}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: appointId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:appointId", deleteAppointment);

module.exports = router;
