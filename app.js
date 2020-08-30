const express = require('express')
const booksRouter = require('./routes/booksRoutes')

const app = express()

// JSON body Parser
app.use(express.json())



app.use('/api/v1/books', booksRouter)

module.exports = app 