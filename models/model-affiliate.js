const mongoose = require('mongoose')

const { Schema } = mongoose

const SchemaAffiliate = new Schema({
    document: {
        type: Number,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    genre: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    discipline: {
        type: mongoose.Types.ObjectId,
        ref: 'discipline'
    },
    attendance: [{
        type: mongoose.Types.ObjectId,
        ref: 'attendance'
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('affiliate', SchemaAffiliate)