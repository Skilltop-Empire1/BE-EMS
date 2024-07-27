const express = require("express")
require("dotenv").config()
cors = require("cors")
const morgan  = require("morgan")

const app = express()

const sqDb = require("./src/config/connect")
const {sequelize,Patient,Organization,Staff,Appointment} = require("./src/models")


const OrganizationRoute = require("./src/routes/organizationRoute")
app.use(morgan("tiny"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 5000

app.use("/api/v1/organization",OrganizationRoute)


const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        
        // Sync models
        await sequelize.sync({ force: true });
        console.log('Database synchronized...');
        //console.log(sqDb.config)
        app.listen(port,() => {
            console.log(`app is listening to port ${port}`)
        })
    } catch (error) {
        
    }
}

start()