const express = require('express')
const Author = require('./../models/authorModel')

const router = express.Router()

router.route('/').get(async (req, res) => {
    const authors = await Author.find().populate('books', select = "title -_id")
    res.status(200).json({
        status: 'success',
        number: authors.length,
        data: {
            authors
        }
    })
})

module.exports = router