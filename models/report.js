

module.exports = (sequelize, DataTypes) => {
    const MedicalReport = sequelize.define(
      "MedicalReport",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        reportDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        diagnosis: {
          type: DataTypes.TEXT,
          allowNull: true, 
        },
        treatment: {
          type: DataTypes.TEXT,
          allowNull: true, 
        },
        prescription: {
          type: DataTypes.TEXT,
          allowNull: true, 
        },
        testsOrdered: {
          type: DataTypes.TEXT,
          allowNull: true, 
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true, 
        },
      },
      {
        timestamps: true, 
        underscored: true, 
      }
    );
  
    
    MedicalReport.associate = (models) => {
      MedicalReport.belongsTo(models.Patient, {
        foreignKey: "patient_id",
        as: "patient",
        allowNull: false, 
      });
  
      MedicalReport.belongsTo(models.Staff, {
        foreignKey: "doctor_id",
        as: "doctor",
        allowNull: false, 
      });
  
      MedicalReport.belongsTo(models.Organization, {
        foreignKey: "organization_id",
        as: "organization",
        allowNull: false, 
      });
    };
  
    return MedicalReport;
  };
  