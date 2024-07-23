const express = require("express")
cors = require("cors")
const morgan  = require("morgan")

const app = express()

app.use(morgan("tiny"))
const port = process.env.PORT || 5000

const start = () => {
    try {
        app.listen(port,() => {
            console.log(`app is listening to port ${port}`)
        })
    } catch (error) {
        
    }
}

start()