const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book must have a title']
    },
    description: {
        type: String,
        required: [true, 'A book must have a description']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'Author'
    },
    dateOfPublish: Date,
    genres: [{
        type: String
    }]
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book