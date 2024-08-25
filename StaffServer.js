const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataController = require('./routes/StaffDataController.js'); 

// Middleware to parse JSON
app.use(bodyParser.json());

// Routes
app.use('/', dataController);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



/// GOTO NPM SEQUELIZE ON HOW TO CREATE A MODEL 