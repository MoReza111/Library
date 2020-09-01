const Authors = require('./../models/authorModel')
const Book = require('./../models/bookModel')


exports.getBooks = async (req, res) => {
    const books = await Book.find().populate('author', select = '-books -dateOfBirth', model = Authors)
    res.status(200).json({
        status: 'success',
        number: books.length,
        data: {
            books
        }
    })
}

exports.getBook = async (req, res) => {
    console.log(req.params.id)
    const book = await Book.findById(req.params.id).populate('author', select = '-books -dateOfBirth')
    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
}