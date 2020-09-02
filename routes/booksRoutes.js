const express = require('express')
const booksController = require('./../controllers/booksController')

const router = express.Router({ mergeParams: true })

router.route('/').get(booksController.getBooks).post(booksController.setIDs, booksController.createBook)
router.route('/:id').get(booksController.getBook)

module.exports = router