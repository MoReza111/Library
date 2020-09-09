const express = require('express')
const booksRouter = require('./routes/booksRoutes')
const authorsRouter = require('./routes/authorsRoutes.js')
const errorController = require('./controllers/errorController')

const app = express()

// JSON body Parser
app.use(express.json())
app.use(express.static)



app.use('/api/v1/books', booksRouter)
app.use('/api/v1/authors', authorsRouter)


app.use(errorController)
module.exports = app