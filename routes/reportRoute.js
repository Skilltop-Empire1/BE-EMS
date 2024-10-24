// const express = require('express');
// const router = express.Router();
// const {
//   createReport,
//   getAllReports,
//   getReportById,
//   getReportsByPatient,
//   getReportsByRole,
//   updateReport,
//   deleteReport,
// } = require('../controllers/reportController');
// const loginJWTAthentication = require('../middlewares/auth');

// // Define routes for medical reports
// router.post('/create/:deptId/:patId',loginJWTAthentication, createReport); 
// router.get('/list', getAllReports); 
// router.get('/:reportId', getReportById); 
// router.get('/patient/:patId', getReportsByPatient); 
// router.get('/:roleType/:roleId', getReportsByRole); 
// router.put('/:reportId',loginJWTAthentication, updateReport); 
// router.delete('/:reportId',deleteReport); 

// module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API for managing medical reports
 */

const express = require('express');
const router = express.Router();
const {
  createReport,
  getAllReports,
  getReportById,
  getReportsByPatient,
  getReportsByRole,
  updateReport,
  deleteReport,
} = require('../controllers/reportController');
const loginJWTAthentication = require('../middlewares/auth');

/**
 * @swagger
 * /reports/create/{deptId}/{patId}:
 *   post:
 *     summary: Create a new medical report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: deptId
 *         schema:
 *           type: string
 *         required: true
 *         description: Department ID
 *       - in: path
 *         name: patId
 *         schema:
 *           type: string
 *         required: true
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *                 example: "Flu and fever"
 *               prescription:
 *                 type: string
 *                 example: "Paracetamol"
 *               followupDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-12"
 *     responses:
 *       201:
 *         description: Report created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/create/:deptId/:patId', loginJWTAthentication, createReport);

/**
 * @swagger
 * /reports/list:
 *   get:
 *     summary: Get a list of all medical reports
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: List of medical reports retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/list', getAllReports);

/**
 * @swagger
 * /reports/{reportId}:
 *   get:
 *     summary: Get a specific medical report by report ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: The report ID
 *     responses:
 *       200:
 *         description: Report retrieved successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 */
router.get('/:reportId', getReportById);

/**
 * @swagger
 * /reports/patient/{patId}:
 *   get:
 *     summary: Get reports by patient ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: patId
 *         schema:
 *           type: string
 *         required: true
 *         description: The patient ID
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *       404:
 *         description: Reports not found for this patient
 *       500:
 *         description: Server error
 */
router.get('/patient/:patId', getReportsByPatient);

/**
 * @swagger
 * /reports/{roleType}/{roleId}:
 *   get:
 *     summary: Get reports by role type and role ID
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: roleType
 *         schema:
 *           type: string
 *         required: true
 *         description: The role type (Doctor, Nurse, etc.)
 *       - in: path
 *         name: roleId
 *         schema:
 *           type: string
 *         required: true
 *         description: The role ID
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *       404:
 *         description: Reports not found for this role
 *       500:
 *         description: Server error
 */
router.get('/:roleType/:roleId', getReportsByRole);

/**
 * @swagger
 * /reports/{reportId}:
 *   put:
 *     summary: Update a specific medical report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: The report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *                 example: "Updated diagnosis"
 *               prescription:
 *                 type: string
 *                 example: "Updated prescription"
 *               followupDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-11-15"
 *     responses:
 *       200:
 *         description: Report updated successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 */
router.put('/:reportId', loginJWTAthentication, updateReport);

/**
 * @swagger
 * /reports/{reportId}:
 *   delete:
 *     summary: Delete a specific medical report
 *     tags: [Reports]
 *     parameters:
 *       - in: path
 *         name: reportId
 *         schema:
 *           type: string
 *         required: true
 *         description: The report ID
 *     responses:
 *       200:
 *         description: Report deleted successfully
 *       404:
 *         description: Report not found
 *       500:
 *         description: Server error
 */
router.delete('/:reportId', deleteReport);

module.exports = router;
