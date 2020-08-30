const express = require('express')
const booksRouter = require('./routes/booksRoutes')

const app = express()





app.use('/api/v1/books', booksRouter)

module.exports = app 