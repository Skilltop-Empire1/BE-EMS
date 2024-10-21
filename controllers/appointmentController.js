
 const { Sequelize } = require("sequelize");
 const { Appointment, Patient, Staff, Department } = require("../models");
 const { sendMail, sendSMS } = require("../utils/mail");
 
 const bookAppointment = async (req, res) => {
   const {
     deptName,
     reason,
     firstname,
     phoneNo,
     appointmentDate,
     appointmentTime,
     specialty,
     consultName,
   } = req.body;
 
   try {
     // Find the department
     const dept = await Department.findOne({ where: { name: deptName } });
     if (!dept) {
       return res.status(400).json({ message: "Department not found" });
     }
 
     // Find the patient by either firstname or phoneNo
     const patient = await Patient.findOne({
       where: {
         [Sequelize.Op.or]: [{ firstName: firstname }, { phone: phoneNo }],
       },
     });
 
     if (!patient) {
       return res.status(404).json({ message: "Patient not found" });
     }
 
     // Gather patient details
     const name = patient.firstName + " " + patient.lastName;
     const patientPhoneNo = patient.phone
     console.log("pho",patientPhoneNo)
     console.log("id",patient.patId)
     const gender = patient.gender;
     const email = patient.email;
     const dateOfBirth = patient.dateOfBirth;
     const address = patient.address;
 
     // Find available doctors from the staff
     const availableStaff = await Staff.findAll({
       where: {
         specialization: specialty,
         deptId: dept.deptId,
       },
     });
 
     if (availableStaff.length === 0) {
       return res.status(404).json({ message: "No available doctors found" });
     }
 
     const consultant = availableStaff.find((staff) => staff.firstName === consultName);
     if (!consultant) {
       return res.status(404).json({ message: `Consultant ${consultName} not found` });
     }
 console.log("CON",consultant)
     const appointmentCount = await Appointment.count({
       where: {
         staffId: consultant.dataValues.staffId,
         appointDate: appointmentDate,
       },
     });
 
     // Check if the number of appointments exceeds 20
     if (appointmentCount >= 20) {
       return res
         .status(400)
         .json({ message: "Consultant has reached the maximum number of appointments for the day (20 patients)." });
     }
 
     // Create the appointment if the count is less than 20
     const appointment = await Appointment.create({
       patId: patient.patId,
       patName:name,
       phone: patientPhoneNo,
       gender,
       email,
       dateOfBirth,
       staffId: consultant.staffId,
       deptId: dept.deptId,
       appointDate: appointmentDate,
       appointTime: appointmentTime,
       address,
       reason: reason || null,
     });
 
     // Send confirmation email and SMS
     const emailContent = `
       Dear ${name},
       Your appointment has been scheduled on ${appointmentDate} at ${appointmentTime}.
       Reason: ${reason || "N/A"}.
       Doctor: ${consultant.dataValues.name}.
     `;
 
     const smsContent = `Appointment confirmed: ${appointmentDate} at ${appointmentTime} with Dr. ${consultant.dataValues.name}.`;
     await sendMail(patient.email, "EMS Appointment", emailContent);
     await sendSMS(smsContent, patientPhoneNo);

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
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
