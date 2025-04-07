const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')

const schema = mongoose.Schema

const userSchema = schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minLenght: [3, 'username too short'],
        maxLenght: [10, 'username too short']
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPass: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    savedLocations: {
        type: Array
    },
    userHistory: {
        type: Array
    }
})

const usermodel = mongoose.model('locUsers', userSchema)

module.exports = usermodel