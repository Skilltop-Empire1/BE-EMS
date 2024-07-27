const sequelize = require("../config/connect");
const Patient = require("./patientModel");
const Appointment = require("./appointmentModel");
const Organization = require("./organizationModel");
const Staff = require("./staffModel");
const setUpAssociation = require("./associationSetup");




// const synDatabase = async() => {
//     try {
//         setUpAssociation();
//         await sequelize.sync({force: true})
//         console.log("Databse syn correctly")
//     } catch (error) {
//         console.log("error in index syn",error)
//     }
// }

// synDatabase()


module.exports = {
    sequelize,
    Patient,
    Appointment,
    Organization,
    Staff
   
};


setUpAssociation()