const mongoose = require('mongoose')

const auhtorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'An Author must have a First name']
    },
    lastName: {
        type: String,
        required: [true, 'An Author must have a Last name']
    },
    dateOfBirth: Date,
    book: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Books'
    }]
})

const auhtorModel = mongoose.model('Authors', auhtorSchema)

module.exports = auhtorModel