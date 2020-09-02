const mongoose = require('mongoose')
const Author = require('./authorModel')

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

bookSchema.pre('save', async function (next) {
    console.log(this)
    await Author.findByIdAndUpdate(this.author, { $push: { books: this._id } })
    next()
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book