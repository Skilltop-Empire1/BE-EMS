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
 *                 example: "Routine check-up"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               patName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
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
