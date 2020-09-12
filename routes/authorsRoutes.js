const express = require('express')
const booksRouter = require('./../routes/booksRoutes')
const authorController = require('../controllers/authorsController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.use('/:authorId/books', booksRouter)

router.route('/').get(authorController.getAuthors).post(authController.authorize, authController.authorizeByRole('admin,supporting'), authorController.createAuthor)
router.route('/:id').get(authorController.getAuthor).put(authorController.updateAuthor)

module.exports = router