const mongoose = require('mongoose')

const { Schema } = mongoose

const SchemaDiscipline = new Schema({
    name: {
        type: String,
        required: true
    },
    individual: {
        type: Boolean,
        required: true
    },
    affiliate: [{
        type: mongoose.Types.ObjectId,
        ref: 'affiliate'
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('discipline', SchemaDiscipline)