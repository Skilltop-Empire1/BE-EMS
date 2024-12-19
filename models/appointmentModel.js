
module.exports = (sequelize, DataTypes) => {
  // Define the Appointment model
  const Appointment = sequelize.define(
    "Appointment",
    {
      appointId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      appointDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      appointTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      patName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      patMedCond: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true, 
      underscored: true, 
    }
  );

  // Define associations
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, {
      foreignKey: "patId",
      as: "patient",
    });

    
    Appointment.belongsTo(models.Staff, {
      foreignKey: "staffId",
      as: "staff", 
    });

    
    Appointment.belongsTo(models.Department, {
      foreignKey: "deptId",
      as: "department",
    });
  };

  return Appointment;
};
