const {DataTypes} = require("sequelize")
const sequelize = require("../config/connect")
const Patient = require("./patientModels")
const Staff = require("./staffModel")
const Organization = require("./organizationModel")

const Appointment = sequelize.define("Appointment",{
    appointment_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    appointment_date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    Appointment_time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    reason:{
        type:DataTypes.TEXT,
        allowNull: true
    },
    patient_id:{
        type: DataTypes.INTEGER,
        references:{
            model:"Patient",
            key:"patient_id"
        }
    },
    doctor_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"Staff",
            key:"staff_id"
        }
    },
    organization_id:{
        type:DataTypes.INTEGER,
        references:{
            model:"Organization",
            key:"org_id"
        }
    }
},{
    tableName:"appointment",
    timestamps: true
})

Appointment.belongsTo(Patient,{foreignKey:"patient_id"})
Appointment.belongsTo(Staff,{foreignKey:"staff_id"})
Appointment.belongsTo(Organization,{foreignKey:"patient_id"})

await sequelize.sync()
module.exports = Appointment