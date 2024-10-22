
module.exports = (sequelize, DataTypes) => {
  // Define the Department model
  const Department = sequelize.define(
    "Department",
    {
      deptId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      hod: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      deptContact: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      operationHr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noOfStaff: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      bedCapacity: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      specialty: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      noOfPatient: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      equipment: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      deptBudget: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
    },
    {
      timestamps: false, 
      underscored: true, 
    }
  );

  // Define associations
  Department.associate = (models) => {
    Department.hasMany(models.Patient, {
      foreignKey: "deptId", //  It will create deptId in the patient model
      as: "patients",
    });
    Department.hasMany(models.Staff, {
      foreignKey: "deptId", 
      as: "staffs",
    });
    Department.hasMany(models.Appointment, {
      foreignKey: "deptId", 
      as: "appointments",
    });
    Department.hasMany(models.Report, {
      foreignKey: "deptId", 
      as: "reports",
    });
  };

  return Department;
};
