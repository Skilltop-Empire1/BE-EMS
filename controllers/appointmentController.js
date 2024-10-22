
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
    const dept = await Department.findOne({ where: { name: deptName } });
    if (!dept) {
      return res.status(400).json({ message: "Department not found" });
    }
    const patient = await Patient.findOne({
      where: {
        [Sequelize.Op.or]: [{ firstName: firstname }, { phone: phoneNo }],
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const name = patient.firstName + " " + patient.lastName;
    const patientPhoneNo = patient.phone;
    const gender = patient.gender;
    const email = patient.email;
    const dateOfBirth = patient.dateOfBirth;
    const address = patient.address;

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

    const appointmentCount = await Appointment.count({
      where: {
        staffId: consultant.dataValues.staffId,
        appointDate: appointmentDate,
      },
    });

    if (appointmentCount >= 20) {
      return res
        .status(400)
        .json({ message: "Consultant has reached the maximum number of appointments for the day (20 patients)." });
    }

    let appointment = await Appointment.findOne({
      where: {
        patId: patient.patId,
        appointDate: appointmentDate,
        staffId: consultant.staffId,
      },
    });

    if (appointment) {
      appointment = await appointment.update({
        appointTime: appointmentTime,
        reason: reason || null,
        deptId: dept.deptId,
      });

      return res.status(200).json({
        message: "Appointment updated successfully",
        appointment,
      });
    } else {
      appointment = await Appointment.create({
        patId: patient.patId,
        patName: name,
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

      const emailContent = `
        Dear ${name},
        Your appointment has been scheduled on ${appointmentDate} at ${appointmentTime}.
        Reason: ${reason || "N/A"}.
        Doctor: ${consultant.dataValues.firstName}.
      `;

      const smsContent = `Appointment confirmed: ${appointmentDate} at ${appointmentTime} with Dr. ${consultant.dataValues.firstName}.`;
      await sendMail(patient.email, "EMS Appointment", emailContent);
      await sendSMS(smsContent, patientPhoneNo);

      return res.status(201).json({
        message: "Appointment booked successfully",
        appointment,
      });
    }
  } catch (error) {
    console.error("Error updating or booking appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["firstName", "lastName", "phone", "email", "gender", "dateOfBirth"],
        },
        {
          model: Staff,
          as: "staff",
          attributes: ["firstName", "lastName", "specialization"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
      ],
    });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found" });
    }

    return res.status(200).json({
      message: "Appointments retrieved successfully",
      appointments,
    });
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




const getAppointmentById = async (req, res) => {
  const { id } = req.params; 

  try {
    const appointment = await Appointment.findOne({
      where: { id }, 
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["firstName", "lastName", "phone", "email", "gender", "dateOfBirth"],
        },
        {
          model: Staff,
          as: "staff",
          attributes: ["firstName", "lastName", "specialization"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Appointment retrieved successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error retrieving appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
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
  const { limit = 1 } = req.query; // You can set a limit for how many recent appointments to fetch

  try {
    const appointments = await Appointment.findAll({
      limit: parseInt(limit), 
      order: [["appointDate", "DESC"], ["appointTime", "DESC"]], 
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["firstName", "lastName", "phone", "email", "gender"],
        },
        {
          model: Staff,
          as: "staff",
          attributes: ["firstName", "lastName", "specialization"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
      ],
    });

    if (appointments.length === 0) {
      return res.status(404).json({ message: "No recent appointments found" });
    }

    return res.status(200).json({
      message: "Recent appointments retrieved successfully",
      appointments,
    });
  } catch (error) {
    console.error("Error retrieving recent appointments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getAllRecentAppointments = async (req, res) => {
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

const getStaffRecentAppointments = async (req, res) => {
  const { staffId, date } = req.query;

  try {
    // Validate staff ID and date
    if (!staffId || !date) {
      return res.status(400).json({ message: "Staff ID and date are required" });
    }

    // Find the recent appointments related to the staff member on a particular date
    const appointments = await Appointment.findAll({
      where: {
        staffId, // Match the staffId
        appointDate: date, // Match the specified date
      },
      order: [["appointTime", "DESC"]], // Order by appointment time in descending order to get the most recent
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["firstName", "lastName", "phone", "email", "gender"],
        },
        {
          model: Department,
          as: "department",
          attributes: ["name"],
        },
      ],
    });

    // If no appointments found, return a 404 message
    if (appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this staff member on the given date" });
    }

    // Return the found appointments
    return res.status(200).json({
      message: `Recent appointments for staff member on ${date}`,
      appointments,
    });
  } catch (error) {
    console.error("Error retrieving staff's recent appointments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  bookAppointment,
  updateAppointment,
  deleteAppointment,
  getRecentAppointments,
};
