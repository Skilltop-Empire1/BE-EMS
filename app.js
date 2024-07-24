const express = require("express")
require("dotenv").config()
cors = require("cors")
const morgan  = require("morgan")

const app = express()

const sqDb = require("./src/config/connect")
app.use(morgan("tiny"))
app.use(cors())
const port = process.env.PORT || 5000

const start = () => {
    try {
        console.log(sqDb.config)
        app.listen(port,() => {
            console.log(`app is listening to port ${port}`)
        })
    } catch (error) {
        
    }
}

start()