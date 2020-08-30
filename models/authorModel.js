const mongoose = require('mongoose')

const auhtorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'An Author must have a First name']
    },
    lastName: {
        type: String,
        required: [true, 'An Author must have a Last name']
    },
    dateOfBirth: Date,
    books: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    }]
})

const Auhtor = mongoose.model('Author', auhtorSchema)

module.exports = Auhtor