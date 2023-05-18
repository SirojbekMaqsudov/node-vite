const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('🌳 Connected To DB')
    }).catch(e => {
        console.log(e.message)
        console.log(`⚙ Reconnecting to DB`)
        setTimeout(() => {
            connectDB()
        }, 2000)
    })
}

module.exports = {
    connectDB
}