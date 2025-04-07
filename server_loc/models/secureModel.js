const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const schema = mongoose.Schema

const newSecureSchema = new schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
})

const secureModel = mongoose.model('pass', newSecureSchema)

module.exports = secureModel