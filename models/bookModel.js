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
    authors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Author'
    }],
    dateOfPublish: Date,
    genres: [{
        type: String
    }]
})

const bookModel = mongoose.Model('Book', bookSchema)

module.exports = bookModel