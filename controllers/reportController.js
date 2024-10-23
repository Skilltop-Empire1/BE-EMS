const {Report} = require("../models")

const createReport = async (req, res) => {
    try {
      const { role,staffId } = req.user; 
      const {patId,deptId} = req.params
      const {
        reportDate,
        diagnosis,
        prescription,
        consultDate,
        testsOrdered,
        followupDate,
        notes,
        vitalSign,
        paymentRefNo
       } = req.body;
  
      
      let reportData = {
        deptId,
        patId,
        staffId,
        reportDate,
        diagnosis,
        prescription,
        consultDate,
        testsOrdered,
        followupDate,
        notes,
        vitalSign,
        paymentRefNo
      };
  
      if (role === 'Doctor') {
        reportData.doctorId = req.user.id; 
      } else if (role === 'Nurse') {
        reportData.nurseId = req.user.id; 
      } else if (role === 'Pharmacy') {
        reportData.pharmacyId = req.user.id; 
      } else if (role === 'Lab') {
        reportData.labId = req.user.id; 
      }else if (role === 'Admin') {
        reportData.AdminId = req.user.id; 
      }else if (role === 'Acct') {
        reportData.acctId = req.user.id; 
      } else {
        return res.status(403).json({ message: 'Unauthorized. Only doctors, nurses, pharmacy, or lab staff can create reports.' });
      }
  
      const report = await Report.create(reportData);
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error creating report', error });
    }
  };
  

  const getAllReports = async (req, res) => {
    try {
      const reports = await Report.findAll({
        include: [{ model: Patient, as: 'patient' }],
      });
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
  

  const getReportById = async (req, res) => {
    try {
      const report = await Report.findByPk(req.params.reportId, {
        include: [{ model: Patient, as: 'patient' }],
      });
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching report', error });
    }
  };
  


  const getReportsByPatient = async (req, res) => {
    try {
      const reports = await Report.findAll({
        where: { patId: req.params.patientId },
        include: [{ model: Patient, as: 'patient' }],
      });
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
 
  
  const getReportsByDoctor = async (req, res) => {
    try {
      const reports = await Report.findAll({
        where: { doctorId: req.params.doctorId },
        include: [{ model: Patient, as: 'patient' }],
      });
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
  


  const updateReport = async (req, res) => {
    try {
      const report = await Report.findByPk(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
     
      const { role, id: userId } = req.user;
      if (
        (role === 'Doctor' && report.doctorId !== userId) ||
        (role === 'Nurse' && report.nurseId !== userId) ||
        (role === 'Lab' && report.labId !== userId) ||
        (role === 'Pharmacy' && report.pharmacyId !== userId)
        (role === 'Admin' && report.AdminId !== userId)
        (role === 'Acct' && report.acctId !== userId)
      ) {
        return res.status(403).json({ message: 'Unauthorized to update this report' });
      }
  
      await report.update(req.body);
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error updating report', error });
    }
  };

  
  const deleteReport = async (req, res) => {
    try {
      const report = await MedicalReport.findByPk(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      const { role, id: userId } = req.user;
      if (
        (role === 'Doctor' && report.doctorId !== userId) ||
        (role === 'Nurse' && report.nurseId !== userId) ||
        (role === 'Lab' && report.labId !== userId) ||
        (role === 'Pharmacy' && report.pharmacyId !== userId)
        (role === 'Admin' && report.AdminId !== userId)
        (role === 'Acct' && report.acctId !== userId)
      ) {
        return res.status(403).json({ message: 'Unauthorized to delete this report' });
      }
  
      await report.destroy();
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting report', error });
    }
  };
  

  module.exports = {
    createReport, 
    getAllReports,
    getReportById,
    getReportsByDoctor,
    getReportsByPatient,
    updateReport,
    deleteReport
  }