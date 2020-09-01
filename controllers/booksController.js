const Books = require('./../models/bookModel')
const Authors = require('./../models/authorModel')


exports.getBooks = async (req, res) => {
    const books = await Books.find().populate('author', select = '-books -dateOfBirth', model = Authors)
    res.status(200).json({
        status: 'success',
        number: books.length,
        data: {
            books
        }
    })
}
