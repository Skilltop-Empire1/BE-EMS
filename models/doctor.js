// // models/doctor.js

// const { Sequelize, DataTypes } = require('sequelize');
// const db = require('../config/database')
// const Joi = require('joi');

// const Doctor = db.define('Doctor', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     gender: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     mobile_number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     practice: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     specialization: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     }
// });

// module.exports = Doctor;
