const express = require("express")
require("dotenv").config()
cors = require("cors")
const morgan  = require("morgan")

const app = express()

//const sqDb = require("./config/connect")
const {sequelize,Patient,Organization,Staff,Appointment} = require("./models")


const organizationRoute = require("./routes/organizationRoute")
const patientRoute = require("./routes/patientRoute")
const appointmentRoute = require("./routes/appointmentRoute")
const settingRoute = require("./routes/settingRoute")
const dataController = require('./routes/StaffDataController.js'); 

app.use(morgan("tiny"))

const corsOptions = {
    origin:["http://localhost:5000",`${process.env.CLIENT_URL}`],
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    allowedHeaders:'Content-Type,Authorization'
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 5000

app.use("/EMS/organization",organizationRoute)
app.use("/EMS/patients",patientRoute)
app.use("//EMS/staff",dataController)
app.use("/EMS/appointment",appointmentRoute)
app.use("/EMS/setting",settingRoute)



const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...'); 
        
        // Sync models
        await sequelize.sync({ force: true/*true*/ });
        console.log('Database synchronized...');
        app.listen(port,() => {
            console.log(`app is listening to port ${port}`)
        })
    } catch (error) {
        
    }
}

start();
