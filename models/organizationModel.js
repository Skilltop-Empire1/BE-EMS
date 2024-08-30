const { DataTypes } = require("sequelize");
const sequelize = require("../../config/connect");

const Organization = sequelize.define('Organization', {
    org_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    org_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    org_username: {
        type: DataTypes.STRING(100),
        allowNull: true
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
    }
}, {
    tableName: 'organizations',
    timestamps: false
});

module.exports = Organization;
