const { Sequelize } = require('sequelize');

// Define the configuration object
const config = {
  development: {
    username: 'root',
    password: 'password',
    database: 'newdb',//EMS
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,  // Show SQL queries in the console
    define: {
      timestamps: false,  // Disable automatic timestamp columns
    },
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'newdb_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'newdb_prod',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};

// Determine the environment (default to development)
const env = process.env.NODE_ENV || 'development';

// Select the configuration for the current environment
const currentConfig = config[env];

// Initialize Sequelize with the selected configuration
const sequelize = new Sequelize(currentConfig.database, currentConfig.username, currentConfig.password, {
  host: currentConfig.host,
  dialect: currentConfig.dialect,
  logging: currentConfig.logging,
  define: currentConfig.define,
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database & tables:', err);
  });

// Export the initialized Sequelize instance
module.exports = sequelize;
