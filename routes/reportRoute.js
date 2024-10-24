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

// Define routes for medical reports
router.post('/create/:deptId/:patId',loginJWTAthentication, createReport); 
router.get('/list', getAllReports); 
router.get('/:reportId', getReportById); 
router.get('/patient/:patId', getReportsByPatient); 
router.get('/:roleType/:roleId', getReportsByRole); 
router.put('/:reportId',loginJWTAthentication, updateReport); 
router.delete('/:reportId',deleteReport); 

module.exports = router;

