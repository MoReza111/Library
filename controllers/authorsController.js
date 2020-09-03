const mongoose = require('mongoose')
const Author = require('./../models/authorModel')
const catchAsync = require('./../Utils/catchAsync')
const AppError = require('./../Utils/appError')

exports.getAuthors = catchAsync(async (req, res, next) => {
    const authors = await Author.find().populate('books', select = "title -_id")

    res.status(200).json({
        status: 'success',
        number: authors.length,
        data: {
            authors
        }
    })
})

exports.getAuthor = catchAsync(async (req, res, next) => {
    const author = await Author.findById(req.params.id).populate('books')
    if (!author) {
        return next(new AppError("There's No Author with that ID", 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            author
        }
    })
})
exports.createAuthor = catchAsync(async (req, res, next) => {
    const author = await Author.create({
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        dateOfBirth: new Date(req.body.DateOfBirth)
    })
    res.status(201).json({
        status: 'success',
        data: {
            author
        }
    })
})
exports.updateAuthor = catchAsync(async (req, res, next) => {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!updatedAuthor) {
        return next(new AppError('There\'s No author with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedAuthor
        }
    })
})