const express = require('express')
const booksController = require('./../controllers/booksController')

const router = express.Router()

router.route('/').get(booksController.getBooks)
router.route('/:id').get(booksController.getBook)

module.exports = router