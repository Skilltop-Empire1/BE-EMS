// // routes/doctor.js
// const Doctor = require('../models/doctor');
// const doctorSchema = require('../validators/doctorValidator');

// // Get all doctor 
// exports.getDoctors = async (req, res) => {
//     try {
//         const doctors = await Doctor.findAll();
//         res.status(200).json(doctors);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Get the total number of doctor
// exports.getDoctorsCount = async (req, res) => {
//     try {
//         const doctorCount = await Doctor.count();
//         res.status(200).json({ count: doctorCount });
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };

// // Get a single doctor by ID
// exports.getSingleDoctor = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const doctor = await Doctor.findByPk(id);
//         if (doctor) {
//             res.status(200).json({ doctor });
//         } else {
//             res.status(404).json({ error: 'doctor not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Add a new doctor
// exports.newDoctor = async (req, res) => {
//     // Validate the request body
//     const { error } = doctorSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ status: 'error', error: error.details[0].message });
//     }

//     const { name, email, gender, mobile_number, practice,
//         specialization, date_Of_Birth,
//         education_qualification
//     } = req.body;
//     try {
//         const doctor = await Doctor.create({
//             name,
//             email,
//             gender,
//             mobile_number,
//             practice,
//             specialization,
//             date_Of_Birth,
//             education_qualification
//         });
//         res.status(201).json({
//             status: 'success',
//             data: doctor,
//         });
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };
// // Update a doctor
// exports.updateDoctor = async (req, res) => {
//     // Validate the request body
//     const { error } = doctorSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ status: 'error', error: error.details[0].message });
//     }

//     const { id } = req.params;
//     // const { name, email, gender, mobile_number, practice,
//         specialization, date_Of_Birth, education_qualification
//     } = req.body;
//     try {
//         const doctor = await Doctor.findByPk(id);
//         if (doctor) {
//             await doctor.update({
//                 name,
//                 email,
//                 gender,
//                 mobile_number,
//                 practice,
//                 specialization,
//                 date_Of_Birth,
//                 education_qualification
//             });
//             res.status(200).json({
//                 status: 'success',
//                 data: doctor,
//             });
//         } else {
//             res.status(404).json({ status: 'error', error: 'doctor  not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };

// // Delete a doctor 
// exports.deleteDoctor = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const doctor = await Doctor.findByPk(id);
//         if (doctor) {
//             await doctor.destroy();
//             res.status(200).json({ message: "doctor  deleted" });
//         } else {
//             res.status(404).json({ error: 'doctor  not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };