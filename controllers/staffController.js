// // routes/staff.js
// const Staff = require('../models/staff');
// const staffSchema = require('../validators/staffValidator');

// // Get all staff members
// exports.getStaff = async (req, res) => {
//     const token = req.cookies;
//     if (!token) return res.status(401).json({ error: 'Access denied. Please log in.' });
//     try {
//         const staffMembers = await Staff.findAll();
//         res.status(200).json(staffMembers);
//     } catch (err) {
//         res.status(500).json({error: err.message });
//     }
// };

// // Get the total number of staff
// exports.getStaffCount =  async (req, res) => {
//     try {
//         const staffCount = await Staff.count();
//         res.status(200).json({ count: staffCount });
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };

// // Get a single staff member by ID
// exports.getSingleStaff =  async (req, res) => {
//     const { id } = req.params;
//     try {
//         const staffMember = await Staff.findByPk(id);
//         if (staffMember) {
//             res.status(200).json({staffMember});
//         } else {
//             res.status(404).json({ error: 'Staff member not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Add a new staff member
// exports.newStaff =  async (req, res) => {
//     // Validate the request body
//     const { error } = staffSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ status: 'error', error: error.details[0].message });
//     }

//     const { name, email, gender, mobile_number, practice, specialization,doctor_id, nurse_id } = req.body;
//     try {
//         const staffMember = await Staff.create({
//             name,
//             email,
//             gender,
//             mobile_number,
//             practice,
//             specialization,
//             doctor_id,
//             nurse_id
//         });
//         res.status(201).json({
//             status: 'success',
//             data: staffMember,
//         });
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };
// // Update a staff member
// exports.updateStaff =  async (req, res) => {
//     // Validate the request body
//     const { error } = staffSchema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ status: 'error', error: error.details[0].message });
//     }

//     const { id } = req.params;
//     const { name, email, gender, mobile_number, practice, specialization,doctor_id, nurse_id } = req.body;
//     try {
//         const staffMember = await Staff.findByPk(id);
//         if (staffMember) {
//             await staffMember.update({
//                 name,
//                 email,
//                 gender,
//                 mobile_number,
//                 practice,
//                 specialization,
//                 doctor_id,
//                 nurse_id
//             });
//             res.status(200).json({
//                 status: 'success',
//                 data: staffMember,
//             });
//         } else {
//             res.status(404).json({ status: 'error', error: 'Staff member not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };

// // Delete a staff member
// exports.deleteStaff = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const staffMember = await Staff.findByPk(id);
//         if (staffMember) {
//             await staffMember.destroy();
//             res.status(200).json({ message : "Staff member deleted" });
//         } else {
//             res.status(404).json({ error : 'Staff member not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };






