const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');
const Organization = require('./organizationModel');
const Appointment = require('./appointmentModel');

const Staff = sequelize.define('Staff', {
  staff_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  staff_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  staff_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  staff_gender: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  staff_mobile: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  specialization: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Appointment',
      key: 'appointment_id',
    },
  },
  org_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Organization',
      key: 'org_id',
    },
  },
}, {
  tableName: 'staff',
  timestamps: false
});

Staff.belongsTo(Organization,{foreignKey:"org_id"})
Staff.hasMany(Appointment,{foreignKey:"appointment_id"})

await sequelize.sync()

module.exports = Staff;