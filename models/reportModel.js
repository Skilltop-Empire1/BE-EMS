


// module.exports = (sequelize, DataTypes) => {
//   const Report = sequelize.define(
//     "Report",
//     {
//       reportId: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//         allowNull: false,
//       },
//       patName: {
//         type: DataTypes.STRING(100),
//         allowNull: true,
//       },
//       reportDate: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       diagnosis: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       prescription: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       consultDate: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       testsOrdered: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       followupDate: {
//         type: DataTypes.DATEONLY,
//         allowNull: true,
//       },
//       notes: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//       vitalSign: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       paymentRefNo: {
//         type: DataTypes.STRING(250),
//         allowNull: true,
//       },
//     },
//     {
//       timestamps: true,
//       underscored: true,
//     }
//   );

//   Report.associate = (models) => {
//     Report.belongsTo(models.Patient, {
//       foreignKey: "patId",
//       as: "patient",
      
//     });

    
//     Report.belongsTo(models.Staff, {
//       foreignKey: "staffId",
//       as: "doctor",
//     });
//     Report.belongsTo(models.Staff, {
//       foreignKey: "staffId",
//       as: "nurse",
//     });
//     Report.belongsTo(models.Staff, {
//       foreignKey: "staffId",
//       as: "pharmacy",
//     });
//     Report.belongsTo(models.Staff, {
//       foreignKey: "staffId",
//       as: "lab",
//     });

//     Report.belongsTo(models.Account, {
//       foreignKey: "acctId",
//       as: "account",
//     });
//   };

  
//   return Report;
// };


module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    "Report",
    {
      reportId: {
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
      prescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      consultDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      testsOrdered: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      followupDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      vitalSign: {
        type: DataTypes.JSONB, 
        allowNull: true,
      },
      paymentRefNo: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  Report.associate = (models) => {
    Report.belongsTo(models.Patient, {
      foreignKey: "patId",
      as: "patient",
    });

    
    Report.belongsTo(models.Staff, {
      foreignKey: "doctorId", 
      as: "doctor",
    });
    Report.belongsTo(models.Staff, {
      foreignKey: "nurseId", 
      as: "nurse",
    });
    Report.belongsTo(models.Staff, {
      foreignKey: "pharmacyId", 
      as: "pharmacy",
    });
    Report.belongsTo(models.Staff, {
      foreignKey: "labId", 
      as: "lab",
    });

    Report.belongsTo(models.Account, {
      foreignKey: "acctId",
      as: "account",
    });
  };

  return Report;
};
