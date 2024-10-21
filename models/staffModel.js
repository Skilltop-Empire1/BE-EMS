
module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    "Staff",
    {
      staffId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      profileUrl: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      shiftSchedule: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      vacationDays: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dateOfHire: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      employStatus: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      staffStatus: {
        type: DataTypes.ENUM("active", "pending", "inactive"),
        defaultValue: "pending",
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      educationalQualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      yrOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      licence: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      specialization: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY, 
        allowNull: false,
        validate: {
          isDate: true, 
        },
      },
      permission: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("Doctor", "Nurse"),
        allowNull: false,
        defaultValue: "Doctor",
      },
    },
    {
      timestamps: false,
      underscored: true, 
    }
  );

  // Define associations
  Staff.associate = (models) => {
    Staff.belongsTo(models.Department, {
      foreignKey: "deptId", 
      as: "department",
    });

    Staff.hasMany(models.Appointment, {
      foreignKey: "staffId", 
      as: "appointments",
    });

    Staff.hasMany(models.Report, {
      foreignKey: "staffId", 
      as: "reports",
    });
  };

  return Staff;
};
