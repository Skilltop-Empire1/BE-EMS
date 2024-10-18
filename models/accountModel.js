
module.exports = (sequelize, DataTypes) => {
  // Define the account model
  const Account = sequelize.define(
    "Account",
    {
      acctId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      patName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.ENUM("HMO", "Insurance", "NHIS", "Direct"),
        allowNull: false,
        defaultValue: "Direct",
      },
      paymentProvider: {
        type: DataTypes.ENUM("Hires", "HMO", "Federal Health Care"),
        allowNull: false,
        defaultValue: "Hires",
      },
      outstandBal: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
        defaultValue: 0.00,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: true,
        defaultValue: 0.00,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: true,
        defaultValue: 0.00,
      },
      treatmentType: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM("incomplete", "completed"),
        allowNull: true,
        defaultValue: "incomplete",
      },
      nextPayDueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      paymentRefNo: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true, 
      underscored: true, 
    }
  );

  // Define associations
  Account.associate = (models) => {
    Account.belongsTo(models.Patient, {
      foreignKey: "patId",
      as: "patient",
    });

    
    Account.hasMany(models.Report, {
      foreignKey: "acctId", //it will create accId in the report model
      as: "reports", 
    });
  };

  return Account;
};
