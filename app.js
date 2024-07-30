const express = require("express")
require("dotenv").config()
cors = require("cors")
const morgan  = require("morgan")

const app = express()

const sqDb = require("./src/config/connect")
const {sequelize,Patient,Organization,Staff,Appointment} = require("./src/models")


const organizationRoute = require("./src/routes/organizationRoute")
const patientRoute = require("./src/routes/patientRoute")
const staffRoute = require("./src/routes/staffRoute")
const appointmentRoute = require("./src/routes/appointmentRoute")
const settingRoute = require("./src/routes/settingRoute")
app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 5000

app.use("/api/v1/organization",organizationRoute)
app.use("/api/v1/patient",patientRoute)
app.use("/api/v1/staff",staffRoute)
app.use("/api/v1/appointment",appointmentRoute)
app.use("/api/v1/setting",settingRoute)



const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        
        // Sync models
        await sequelize.sync({ force: false/*true*/ });
        console.log('Database synchronized...');
        //console.log(sqDb.config)
        app.listen(port,() => {
            console.log(`app is listening to port ${port}`)
        })
    } catch (error) {
        
    }
}

start()