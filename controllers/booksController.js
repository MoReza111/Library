const Authors = require('./../models/authorModel')
const Book = require('./../models/bookModel')
const catchAsync = require('./../Utils/catchAsync')
const AppError = require('./../Utils/appError')

exports.getBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find().populate('author', select = '-books -dateOfBirth', model = Authors)

    if (!books) {
        return next(new AppError('Not Found', 404))
    }

    res.status(200).json({
        status: 'success',
        number: books.length,
        data: {
            books
        }
    })
})

exports.getBook = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id).populate('author', select = '-books -dateOfBirth')

    if (!book) {
        return next(new AppError("There's No Author with that ID", 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
})