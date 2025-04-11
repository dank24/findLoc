const { type } = require('express/lib/response')
const mongoose = require('mongoose')

const schema = mongoose.Schema

const newDataSchema = new schema({
    category: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    lat: {
        type: String,
        required: [true, 'must have latitude value'],
    },
    lng: {
        type: String,
        required: [true, ',ust have longitude value']
    }
})

const dataModel = mongoose.model('locData', newDataSchema)

module.exports = dataModel