const express = require('express');
const router = express.Router();
const {
  createReport,
  getAllReports,
  getReportById,
  getReportsByPatient,
  getReportsByDoctor,
  updateReport,
  deleteReport,
} = require('../controllers/reportController');
const { authenticateUser } = require('../middlewares/auth');

// Define routes for medical reports
router.post('/reports', createReport); // Create report (with role-based permission)
router.get('/reports', getAllReports); // Get all reports
router.get('/reports/:id', getReportById); // Get single report by ID
router.get('/reports/patient/:patientId', getReportsByPatient); // Get reports by patient ID
router.get('/reports/doctor/:doctorId', getReportsByDoctor); // Get reports by doctor ID
router.put('/reports/:id',updateReport); // Update report
router.delete('/reports/:id',deleteReport); // Delete report

module.exports = router;

