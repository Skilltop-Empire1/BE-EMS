const createReport = async (req, res) => {
    try {
      const { role } = req.user; // Assuming `req.user` contains user info from authentication middleware
      const { patient_id, diagnosis, treatment, prescription, testsOrdered, notes } = req.body;
  
      // Role-based checks
      let reportData = {
        patient_id,
        reportDate: new Date(),
        diagnosis,
        treatment,
        prescription,
        testsOrdered,
        notes,
      };
  
      if (role === 'doctor') {
        reportData.doctor_id = req.user.id; // Set doctor ID
      } else if (role === 'nurse') {
        reportData.nurse_id = req.user.id; // Set nurse ID
      } else if (role === 'pharmacy') {
        reportData.pharmacy_id = req.user.id; // Set pharmacy ID
      } else if (role === 'lab') {
        reportData.lab_id = req.user.id; // Set lab ID
      } else {
        return res.status(403).json({ message: 'Unauthorized. Only doctors, nurses, pharmacy, or lab staff can create reports.' });
      }
  
      const report = await MedicalReport.create(reportData);
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error creating report', error });
    }
  };
  

  const getAllReports = async (req, res) => {
    try {
      const reports = await MedicalReport.findAll({
        include: [{ model: Patient, as: 'patient' }],
      });
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
  

  const getReportById = async (req, res) => {
    try {
      const report = await MedicalReport.findByPk(req.params.id, {
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
      const reports = await MedicalReport.findAll({
        where: { patient_id: req.params.patientId },
        include: [{ model: Patient, as: 'patient' }],
      });
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
 
  
  const getReportsByDoctor = async (req, res) => {
    try {
      const reports = await MedicalReport.findAll({
        where: { doctor_id: req.params.doctorId },
        include: [{ model: Patient, as: 'patient' }],
      });
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  };
  


  const updateReport = async (req, res) => {
    try {
      const report = await MedicalReport.findByPk(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      // Check if the user is authorized to update this report
      const { role, id: userId } = req.user;
      if (
        (role === 'doctor' && report.doctor_id !== userId) ||
        (role === 'nurse' && report.nurse_id !== userId) ||
        (role === 'lab' && report.lab_id !== userId) ||
        (role === 'pharmacy' && report.pharmacy_id !== userId)
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
  
      // Check if the user is authorized to delete this report
      const { role, id: userId } = req.user;
      if (
        (role === 'doctor' && report.doctor_id !== userId) ||
        (role === 'nurse' && report.nurse_id !== userId) ||
        (role === 'lab' && report.lab_id !== userId) ||
        (role === 'pharmacy' && report.pharmacy_id !== userId)
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