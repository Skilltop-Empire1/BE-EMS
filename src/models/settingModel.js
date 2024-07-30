const {DataTypes} = require("sequelize")

const sequelize = require("../config/connect")

const Setting = sequelize.define("Setting",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey: true
    },
    surname:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING(15),
        allowNull:true
    },
    address:{
        type:DataTypes.STRING(250),
        allowNull:true
    },
    DOB:{
        type:DataTypes.DATE,
        allowNull:true
    },
    zipcode:{
        type:DataTypes.STRING(10),
        allowNull:true
    },
    roles:{
        type:DataTypes.JSON,
        allowNull: false
    },
    permission:{
        type:DataTypes.JSON,
        allowNull: true
    }
},{
    tableName:"setting",
    timestamps:true
})


module.exports = Setting