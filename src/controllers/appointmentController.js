

// const { Appointment, Patient, Staff, Organization } = require('../models');

// const bookAppointment = async (req, res) => {
//     const { patientId, staffId, orgId, appointmentDate, appointmentTime, reason } = req.body;
//     try {
//         if (!patientId || !staffId || !orgId || !appointmentDate || !appointmentTime) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }
//         const patient = await Patient.findByPk(patientId);
//         if (!patient) {
//             return res.status(404).json({ message: 'Patient not found' });
//         }
//         const staff = await Staff.findByPk(staffId);
//         if (!staff) {
//             return res.status(404).json({ message: 'Staff not found' });
//         }
//         const organization = await Organization.findByPk(orgId);
//         if (!organization) {
//             return res.status(404).json({ message: 'Organization not found' });
//         }
//         const appointment = await Appointment.create({
//             patient_id: patientId,
//             doctor_id: staffId,
//             org_id: orgId,
//             appointment_date: appointmentDate,
//             appointment_time: appointmentTime,
//             reason: reason || null,
//         });
//         res.status(201).json({ message: 'Appointment booked successfully', appointment });
//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// module.exports = { bookAppointment };


// controllers/appointmentController.js

const { Appointment, Patient, Staff, Organization } = require('../models');
const { Op } = require('sequelize');

const bookAutomaticAppointment = async (req, res) => {
    const { patientId, orgId, reason } = req.body;
    try {
        if (!patientId || !orgId) {
            return res.status(400).json({ message: 'Patient ID and Organization ID are required' });
        }
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const organization = await Organization.findByPk(orgId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        const availableStaff = await Staff.findAll({
            where: {
                available: true,
                org_id: orgId,
            },
        });
        if (availableStaff.length === 0) {
            return res.status(404).json({ message: 'No available staff found' });
        }
        let appointmentDate = new Date();
        let appointmentTime = '09:00:00'; 
        let appointmentScheduled = false;
        for (let staff of availableStaff) {
            while (!appointmentScheduled) {
                const existingAppointments = await Appointment.findAll({
                    where: {
                        doctor_id: staff.staff_id,
                        appointment_date: appointmentDate,
                        appointment_time: appointmentTime,
                    },
                });
                if (existingAppointments.length === 0) {
                    const appointment = await Appointment.create({
                        patient_id: patientId,
                        doctor_id: staff.staff_id,
                        org_id: orgId,
                        appointment_date: appointmentDate,
                        appointment_time: appointmentTime,
                        reason: reason || null,
                    });
                    appointmentScheduled = true;
                    return res.status(201).json({ message: 'Appointment booked successfully', appointment });
                } else {
                    let [hours, minutes, seconds] = appointmentTime.split(':');
                    minutes = parseInt(minutes) + 30; 
                    if (minutes >= 60) {
                        hours = parseInt(hours) + 1;
                        minutes = 0;
                    }
                    appointmentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds}`;
                    if (hours >= 17) { 
                        appointmentDate.setDate(appointmentDate.getDate() + 1);
                        appointmentTime = '09:00:00'; 
                    }
                }
            }
        }

        res.status(500).json({ message: 'Unable to schedule an appointment' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { appointment_date, appointment_time, reason, patient_id, doctor_id, organization_id } = req.body;
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.appointment_date = appointment_date || appointment.appointment_date;
        appointment.appointment_time = appointment_time || appointment.appointment_time;
        appointment.reason = reason || appointment.reason;
        appointment.patient_id = patient_id || appointment.patient_id;
        appointment.doctor_id = doctor_id || appointment.doctor_id;
        appointment.organization_id = organization_id || appointment.organization_id;

        await appointment.save();

        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        await appointment.destroy();

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { bookAutomaticAppointment, updateAppointment, deleteAppointment };




