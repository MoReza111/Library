const express = require('express')
const booksRouter = require('./routes/booksRoutes')
const authorsRouter = require('./routes/authorsRoutes.js')

const app = express()

// JSON body Parser
app.use(express.json())



app.use('/api/v1/books', booksRouter)
app.use('/api/v1/authors', authorsRouter)
module.exports = app 