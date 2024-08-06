const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Joi = require('joi')

const Organization = sequelize.define('Organization', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mobile_number: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
    },
    zip_code: {
        type: DataTypes.STRING,
    },
    patient_id: {
        type: DataTypes.STRING,
    },
    staff_id: {
        type: DataTypes.STRING,
    },

});

module.exports = Organization;
