const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const Patient = sequelize.define('Patient', {
  patient_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  patient_surname: {
    type: DataTypes.STRING(100),
    allowNull: false,
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
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' 
}
}, {
  tableName: 'patients',
  timestamps: false
});

module.exports = Patient;
