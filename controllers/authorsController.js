const mongoose = require('mongoose')
const Author = require('../models/authorModel')

exports.getAuthors = async (req, res) => {
    const authors = await Author.find().populate('books', select = "title -_id")
    res.status(200).json({
        status: 'success',
        number: authors.length,
        data: {
            authors
        }
    })
}