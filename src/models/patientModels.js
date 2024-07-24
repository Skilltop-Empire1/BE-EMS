const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');
const Appointment = require('./appointmentModel');
const Organization = require('./appointmentModel');

const Patient = sequelize.define('Patient', {
  patient_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  patient_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  patient_email: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  patient_mobile: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Organization',
      key: 'org_id',
    },
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Appointment',
      key: 'appointment_id',
    },
  },
}, {
  tableName: 'patients',
  timestamps: false
});

Patient.belongsTo(Appointment,{foreignKey:"appointment_id"})
Patient.belongsTo(Organization,{foreignKey:"org_id"})

await sequelize.sync()

module.exports = Patient;