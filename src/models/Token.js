const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    userID: {type: String, required: true},
    refreshToken: {type: String, required: true}
})

module.exports = {
    Token: model('Token', TokenSchema)
}