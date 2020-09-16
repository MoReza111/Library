const express = require('express')
const booksController = require('./../controllers/booksController')

const router = express.Router({ mergeParams: true })

router.route('/genres')
    .get(booksController.getGenres)

router.route('/')
    .get(booksController.getBooks)
    .post(booksController.setIDs, booksController.createBook)

router.route('/:id')
    .get(booksController.getBook)
    .put(booksController.updateBook)
    .delete(booksController.deleteBook)


module.exports = router