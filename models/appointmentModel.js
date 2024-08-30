const { DataTypes } = require("sequelize");
const sequelize = require("../../config/connect");

const Patient = require("./patientModel");
const Organization = require("./organizationModel");
const Staff = require("./staffModel");

const Appointment = sequelize.define("Appointment", {
    appointment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    appointment_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    patient_id: {
        type: DataTypes.UUID,
        references: {
            model: Patient,
            key: "patient_id"
        }
    },
    doctor_id: {
        type: DataTypes.UUID,
        references: {
            model: Staff,
            key: "staff_id"
        }
    },
    organization_id: {
        type: DataTypes.UUID,
        references: {
            model: Organization,
            key: "org_id"
        }
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    }
}, {
    tableName: "appointment",
    timestamps: true
});

module.exports = Appointment;
