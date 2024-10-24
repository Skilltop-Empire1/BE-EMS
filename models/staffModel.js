
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
      userName: {
        type: DataTypes.STRING(100),
        allowNull: true,
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
        allowNull: true,
      },
      shiftSchedule: {
        type: DataTypes.STRING(50),
        allowNull: true,
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
        allowNull: true,
      },
      staffStatus: {
        type: DataTypes.ENUM("active", "pending", "inactive","registered"),
        defaultValue: "registered",
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
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [
          {
            label: 'Department',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,
          },
          {
            label: 'Staff',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Patients',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Appointments',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Accounts',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
          {
            label: 'Reports',
            view: false,
            create: false,
            edit: false,
            transfer: false,
            delete : false,          
          },
        ],
      },
      role: {
        type: DataTypes.ENUM("Doctor", "Nurse","Admin","Account","LabTech","Pharmacist","Radiologist","Super Admin"),
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
