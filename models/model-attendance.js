const mongoose = require('mongoose')

const { Schema } = mongoose

const SchemaAttendance = new Schema({
    position: {
        type: Number,
        require: true
    },
    affiliate: {
        type: mongoose.Types.ObjectId,
        ref: 'affiliate'
    },
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'event'
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('attendance', SchemaAttendance)