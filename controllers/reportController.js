const {Report,Patient} = require("../models")

const createReport = async (req, res) => {
    try {
      const { role,userId } = req.user; 
      console.log("req",req.user)
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
        staffId:userId,
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
        reportData.doctorId = userId; 
      } else if (role === 'Nurse') {
        reportData.nurseId =  userId; 
      } else if (role === 'Pharmacy') {
        reportData.pharmacyId =  userId; 
      } else if (role === 'Lab') {
        reportData.labId =  userId; 
      }else if (role === 'Admin') {
        reportData.AdminId =  userId; 
      }else if (role === 'Acct') {
        reportData.acctId =  userId; 
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
        where: { patId: req.params.patId },
        include: [{ model: Patient, as: 'patient' }],
      });
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
 
  
  const getReportsByRole = async (req, res) => {
    try {
      const { roleId, roleType } = req.params;
  
      const roleFieldMap = {
        doctor: 'doctorId',
        nurse: 'nurseId',
        pharmacy: 'pharmacyId',
        lab: 'labId',
        admin: 'adminId',
        radio: 'radioId',
        acct: 'acctId'
      };
  
      const roleField = roleFieldMap[roleType.toLowerCase()]; 
  
      if (!roleField) {
        return res.status(400).json({ message: 'Invalid role type provided' });
      }
  
      const reports = await Report.findAll({
        where: { [roleField]: roleId }, // Use the dynamic role field
        include: [{ model: Patient, as: 'patient' }],
      });
  
      if (!reports.length) {
        return res.status(404).json({ message: `No reports found for the provided ${roleType}` });
      }
  
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
  
  

  const updateReport = async (req, res) => {
    try {
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
  
      
      const report = await Report.findByPk(req.params.reportId);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
    
      const { role, userId } = req.user;
      console.log("req", req.user);
  
      if (
        (role === 'Doctor' && report.doctorId !== userId) ||
        (role === 'Nurse' && report.nurseId !== userId) ||
        (role === 'Lab' && report.labId !== userId) ||
        (role === 'Pharmacy' && report.pharmacyId !== userId) ||
        (role === 'Admin' && report.adminId !== userId) ||  
        (role === 'Acct' && report.acctId !== userId)
      ) {
        return res.status(403).json({ message: 'Unauthorized to update this report' });
      }
  
      await report.update({
        reportDate: reportDate || report.reportDate,
        diagnosis: diagnosis || report.diagnosis,
        prescription: prescription || report.prescription,
        consultDate: consultDate || report.consultDate,
        testsOrdered: testsOrdered || report.testsOrdered,
        followupDate: followupDate || report.followupDate,
        notes: notes || report.notes,
        vitalSign: vitalSign || report.vitalSign,
        paymentRefNo: paymentRefNo || report.paymentRefNo,
      });
  
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
        (role === 'LabTech' && report.labId !== userId) ||
        (role === 'Pharmacist' && report.pharmacyId !== userId)
        (role === 'Radiologist' && report.AdminId !== userId)
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
    getReportsByRole,
    getReportsByPatient,
    updateReport,
    deleteReport
  }