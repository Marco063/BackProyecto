const mongoose = require('mongoose')

const { Schema } = mongoose

const SchemaEvent = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    attendance: [{
        type: mongoose.Types.ObjectId,
        ref: 'attendance'
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('event', SchemaEvent)