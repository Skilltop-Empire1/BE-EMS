//import the required dependencies
const express = require("express")
const db = require("./config/dbConfig")

//import patient model
require("./models/PatientModel")



//create express app
const app = express()


//middleware
app.use(express.urlencoded({extended: false}))


//route
app.use('/EMS/patients', require('./routes/patientRoute'))


//declear listening port
const PORT = process.env.PORT||5000


//run the server
app.listen(PORT, ()=>{
    console.log(`Application running on port ${PORT}`)
})

 
