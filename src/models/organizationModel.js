const {DataTypes} = require("sequelize")
const sequelize = require("../config/connect")
const Patient = require("./patientModels")
const Appointment = require("./appointmentModel")
const Staff = require("./staffModel")

const Organization = sequelize.define("Organization",{
    org_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    org_name:{
        type: DataTypes.STRING(250),
        allowNull:false
    },
    org_username:{
        type:DataTypes.STRING(100),
        allowNull:true
    },
    org_mobile: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    org_address: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    org_city: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    org_state: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
      org_zip_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    staff_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Staff',
          key: 'staff_id',
        },
    },
    patient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Patient',
          key: 'patient_id',
        },
    },
    appointment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Appointment',
          key: 'appointment_id',
        },
    },
},{
    tableName: 'organizations',
    timestamps: false
})

Organization.hasMany(Patient,{foreignKey:"patient_id"})
Organization.hasMany(Staff,{foreignKey:"staff_id"})
Organization.hasMany(Appointment,{foreignKey:"appointment_id"})

await sequelize.sync()

module.exports = Organization