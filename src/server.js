const express = require('express')
require('dotenv').config()
const cors = require("cors");
const logger = require('morgan')
const {connectDB} = require("./db/mongoose");

const app = express()
const PORT = process.env.PORT || 5000

//Middlewares
app.use(cors({
    origin: process.env.CLIENT_ADDRESS //Your client address
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger('combined'))

//Routing
const Router = require('./routes/index')
app.use('/api/v1', Router)

//Error Handler
const ErrorMiddleware = require('./middlewares/ErrorMiddleware')
app.use(ErrorMiddleware)

const start = () => {
    try {
        connectDB()

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    }catch (e) {
        console.log(e.message)
    }
}

start()