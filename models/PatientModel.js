const Sequelize = require("sequelize");
const db = require("../config/dbConfig");
const { allow } = require("joi");

const Patient = db.define("Patient", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncreament: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  education_qualification: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  organization: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Patient;
