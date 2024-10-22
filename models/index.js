// const { DataTypes } = require("sequelize");

// const sequelize = require("../config/dbConfig");

// // Import models
// const Patient = require("./patientModel")(sequelize, DataTypes);
// const Appointment = require("./appointmentModel")(sequelize, DataTypes);
// const Organization = require("./departmentModel")(sequelize, DataTypes);
// const Staff = require("./staffModel")(sequelize, DataTypes);
// const Report = require("./reportModel")(sequelize,DataTypes)
// const Account = require("./accountModel")(sequelize,DataTypes)


// const db = {
//   sequelize,
//   Patient,
//   Organization,
//   Staff,
//   Appointment,
//   Account,
//   Report
// };

// // Export the db object containing Sequelize instance and all models
// module.exports = db;

// // Set up associations
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

// Import models
const Patient = require("./patientModel")(sequelize, DataTypes);
const Appointment = require("./appointmentModel")(sequelize, DataTypes);
const Department = require("./departmentModel")(sequelize, DataTypes); // Changed from Organization to Department
const Staff = require("./staffModel")(sequelize, DataTypes);
const Report = require("./reportModel")(sequelize, DataTypes);
const Account = require("./accountModel")(sequelize, DataTypes);

const db = {
  sequelize,
  Patient,
  Department, // Ensure consistent naming
  Staff,
  Appointment,
  Account,
  Report,
};

// Export the db object containing Sequelize instance and all models
module.exports = db;

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

