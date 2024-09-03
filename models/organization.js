const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');
const Joi = require('joi')

const Organization = db.define('Organization', {
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
    patient_phone: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    staff_email: {
        type: DataTypes.STRING,
    },

});

module.exports = Organization;
