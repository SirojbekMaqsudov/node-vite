const express = require('express')
require('dotenv').config()
const cors = require("cors");
const {connectDB} = require("./db/mongoose");

const app = express()
const PORT = process.env.PORT || 5000

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

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
            console.clear()
            console.log(`🚀 Server started on port ${PORT}`)
        })
    }catch (e) {
        console.log(e.message)
    }
}

start()