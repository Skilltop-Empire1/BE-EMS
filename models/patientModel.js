
module.exports = (sequelize, DataTypes) => {
  // Define the Patient model
  const Patient = sequelize.define(
    "Patient",
    {
      patId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      lastVisit: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      medCondition: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true, 
      underscored: true, 
    }
  );

  // Define associations
  Patient.associate = (models) => {
    Patient.belongsTo(models.Department, {
      foreignKey: "deptId", 
      as: "department", 
    });
    
    Patient.belongsTo(models.Staff, {
      foreignKey: "staffId", 
      as: "staff", 
    });
    
    Patient.hasMany(models.Appointment, {
      foreignKey: "patId", 
      as: "appointments",
    });
    
    Patient.hasOne(models.Account, {
      foreignKey: "patId", 
      as: "account",
    });
    
    Patient.hasOne(models.Report, {
      foreignKey: "patId", 
      as: "report",
    });
  };

  return Patient;
};
