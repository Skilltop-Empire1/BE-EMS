// Import dependencies
const { Sequelize } = require("sequelize");
require("dotenv").config(); // Ensure .env variables are loaded

// Declaring database configuration parameters
const CONFIG = {
  DB_name: process.env.DB_name,
  DB_username: process.env.DB_username,
  DB_password: process.env.DB_password,
  DB_dialect: process.env.DB_dialect,
  DB_host: process.env.DB_host,
  DB_port: process.env.DB_port, 
};

// Create a new Sequelize instance
const sequelize = new Sequelize(
  CONFIG.DB_name,
  CONFIG.DB_username,
  CONFIG.DB_password,
  {
    host: CONFIG.DB_host,
    dialect: CONFIG.DB_dialect, // Should be a string such as 'postgres'
    port: CONFIG.DB_port,
    logging: false, // Optionally disable logging
    dialectOptions: {
      connectTimeout: 60000, // 60 seconds
    },
  }
);

// Function to authenticate and sync the database
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL database successful");

    await sequelize.sync({ alter: true }); // Ensures database schema is up-to-date without altering
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to the PostgreSQL database:", error);
    throw error;
  }
};

// Initialize the database
initializeDatabase();

// Export the Sequelize instance
module.exports = sequelize;
