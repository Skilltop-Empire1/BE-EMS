// Import required dependencies
const express = require("express");
const cron = require("node-cron");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");
const { createSuperAdmin } = require("./controllers/staffController");
const notFoundError = require("./errors/notFoundError")
const globalError = require("./errors/errorHandler")

const swaggerDocs = require("./swagger");

require("dotenv").config();

// Database and models
require("./models");

// Import routes
const departmentRoute = require("./routes/departmentRoute");
const staffRoute = require("./routes/staffRoute");
const patientRoute = require("./routes/patientRoute");
const appointmentRoute = require("./routes/appointmentRoute");
const reportRoute = require("./routes/reportRoute");
const accountRoute = require("./routes/accountRoutes");
// const settingRoute = require("./routes/settingRoute");
const whiteList = [process.env.CLIENT_URL,'http://localhost:3000']
// Configure CORS
const corsOptions = {
  origin: function(origin,callback){
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null,true)
    }else{
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

// Create Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(morgan("tiny"));


// Define the port
const port = process.env.PORT || 5005;

// Schedule tasks to ping the server every 30 minutes
cron.schedule("*/30 * * * *", async () => {
  try {
    const response = await axios.get(
      "https://be-ems-production-2721.up.railway.app/"
    );
    console.log("Ping successful:", response.status);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
});

// Define routes
app.use("/api/v1/department", departmentRoute);
app.use("/api/v1/staff", staffRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/appointment", appointmentRoute);
app.use("/api/v1/report", reportRoute);
app.use("/api/v1/account", accountRoute);
// app.use("/api/v1/setting", settingRoute);

const client_url = process.env.CLIENT_URL || "http://localhost:5005";
swaggerDocs(app, client_url);

// errors
app.use(notFoundError)
app.use(globalError)
// Synchronize models and start the server
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
};



// Initialize the server
startServer();
// Call createSuperAdmin when the app starts
createSuperAdmin();
