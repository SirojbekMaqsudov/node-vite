const {Schema, model} = require('mongoose')
const uuid = require("uuid");

const UserSchema = new Schema({
    id: {type: String, default: uuid.v4},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

module.exports = {
    User: model('User', UserSchema)
}