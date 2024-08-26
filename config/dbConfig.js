//import the dependencies

const Sequelize = require("sequelize");
require("dotenv").config();

//declaring database configuration parameter

const CONFIG = {
  DB_name: process.env.DB_name,
  DB_username: process.env.DB_username,
  DB_password: process.env.DB_password,
  DB_dialect: process.env.DB_dialect,
  DB_host: process.env.DB_host,
};

//database connection
const db = new Sequelize(
  CONFIG.DB_name,
  CONFIG.DB_username,
  CONFIG.DB_password,
  {
    host: CONFIG.DB_host,
    dialect: CONFIG.DB_dialect,
  }
);

//check for errors
try {
  db.authenticate();
  db.sync({ force: false });
  console.log("Connection to database successsfull and synced successfully");
} catch (error) {
  throw error;
}

module.exports = db;
