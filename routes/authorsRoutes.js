const express = require('express')
const authorController = require('../controllers/authorsController')

const router = express.Router()

router.route('/').get(authorController.getAuthors)

module.exports = router