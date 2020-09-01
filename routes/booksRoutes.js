const express = require('express')
const booksController = require('./../controllers/booksController')

const router = express.Router()

router.route('/').get(booksController.getBooks)


module.exports = router