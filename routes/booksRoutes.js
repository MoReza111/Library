const express = require('express')
const Books = require('./../models/bookModel')

const router = express.Router()

router.route('/').get(async (req, res) => {
    const books = await Books.find()
    res.status(200).json({
        status: 'success',
        number: books.length,
        data: {
            books
        }
    })
})


module.exports = router