const sequelize = require("../../config/connect");
const Patient = require("./patientModel");
const Appointment = require("./appointmentModel");
const Organization = require("./organizationModel");
const Staff = require("./staffModel");
const Setting = require("./settingModel")
const setUpAssociation = require("./associationSetup");





module.exports = {
    sequelize,
    Patient,
    Appointment,
    Organization,
    Staff,
    Setting
   
};


setUpAssociation()