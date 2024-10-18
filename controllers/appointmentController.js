const { Appointment, Patient, Staff, Organization } = require("../models");
// const { sendMail, sendSMS } = require("../utils/mail");

const bookAppointment = async (req, res) => {
  
  const { orgName,reason,firstname,phoneNo, appointmentDate, appointmentTime } = req.body;

  try {
    // Find the organization
    const org = await Organization.findOne({ where: { org_name: orgName } });
    if (!org) {
      return res.status(400).json({ message: "Organization not found" });
    }

    // Find the patient by either firstname or phoneNo
    const patient = await Patient.findOne({
      where: {
        [Sequelize.Op.or]: [
          { firstName: firstname },
          { patient_mobile: phoneNo },
        ],
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Gather patient details
    const name = patient.firstName + " " + patient.lastName;
    const patientPhoneNo = patient.patient_mobile; // Stored patient's phone number
    const gender = patient.gender;
    const dateOfBirth = patient.dateOfBirth;
    const address = patient.address;

    // Find available doctors from the staff
    const availableStaff = await Staff.findAll({
      where: {
        specialization: "doctor",
        org_id: org.org_id,
      },
    });
    if (availableStaff.length === 0) {
      return res.status(404).json({ message: "No available doctors found" });
    }

    // Check available appointments for doctors
    for (let staff of availableStaff) {
      const existingAppointments = await Appointment.findAll({
        where: {
          doctor_id: staff.staff_id,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
        },
      });

      if (existingAppointments.length === 0) {
        // Create the appointment if no existing appointments found
        const appointment = await Appointment.create({
          patient_id: patient.patient_id,
          name,
          phoneNo: patientPhoneNo,
          gender,
          dateOfBirth,
          doctor_id: staff.staff_id,
          org_id: org.org_id,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          address,
          reason: reason || null,
        });

        // Send confirmation email and SMS (assuming you have mail/SMS setup)
        const emailContent = `
          Dear ${name},
          Your appointment has been scheduled on ${appointmentDate} at ${appointmentTime}.
          Reason: ${reason || "N/A"}.
          Doctor: ${staff.staff_name}.
        `;
        
        const smsContent = `Appointment confirmed: ${appointmentDate} at ${appointmentTime} with Dr. ${staff.staff_name}.`;

        // await sendMail(patient.email, "EMS Appointment", emailContent);
        // await sendSMS(smsContent, patientPhoneNo);

        return res.status(201).json({
          message: "Appointment booked successfully",
          appointment,
        });
      }
    }

    res.status(500).json({ message: "Unable to schedule an appointment, no available slots" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { appointmentDate, appointmentTime, reason, orgName } = req.body;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    console.log("app", appointment);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const org = await Organization.findOne({ where: { org_name: orgName } });
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    if (appointmentDate) {
      appointment.appointment_date = appointmentDate;
    }
    if (appointmentTime) {
      appointment.appointment_time = appointmentTime;
    }
    if (reason) {
      appointment.reason = reason;
    }
    if (org.org_id) {
      appointment.org_id = org.org_id;
    }

    await appointment.save();

    res
      .status(200)
      .json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    await appointment.destroy();

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRecentAppointments = async (req, res) => {
  try {
    const recentAppointments = await Appointment.findAll({
      order: [
        ["appointment_date", "DESC"],
        ["appointment_time", "DESC"],
      ],
      limit: 10,
    });

    res.status(200).json(recentAppointments);
  } catch (error) {
    console.error("failed to get recent appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  bookAppointment,
  updateAppointment,
  deleteAppointment,
  getRecentAppointments,
};
