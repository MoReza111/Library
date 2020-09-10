const Book = require('./../models/bookModel')
const catchAsync = require('./../Utils/catchAsync')
const AppError = require('./../Utils/appError')
const ApiFeatures = require('./../Utils/apiFeatures')

exports.getBooks = catchAsync(async (req, res, next) => {
    let filter = {}
    if (req.params.authorId) filter = { author: req.params.authorId }
    const features = new ApiFeatures(Book.find(filter).populate('author', select = '-books -dateOfBirth'), req.query)

    const books = await features.filter().sort().limitFields().paginate().query
    //const books = await Book.find().populate('author', select = '-books -dateOfBirth', model = Authors)

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

exports.createBook = catchAsync(async (req, res, next) => {
    const book = await Book.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body)

    if (!book) {
        return next(new AppError("There's No Book with that ID'"))
    }

    res.status(200).json({
        status: 'success',
        data: {
            book
        }
    })
})

exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
        return next(new AppError("There's No Book with that ID", 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
})
exports.setIDs = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.author = req.params.authorId;
    next();
}