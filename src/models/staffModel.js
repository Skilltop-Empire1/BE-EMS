const { DataTypes } = require('sequelize');
const sequelize = require('../config/connect');

const Staff = sequelize.define('Staff', {
  staff_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  staff_surname: {
    type: DataTypes.STRING(100),
    allowNull: false,
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
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' 
}
}, {
  tableName: 'staff',
  timestamps: false
});

module.exports = Staff;
