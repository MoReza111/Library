const express = require('express')
const booksRouter = require('./routes/booksRoutes')
const authorsRouter = require('./routes/authorsRoutes')
const userRoutes = require('./routes/userRoutes')
const errorController = require('./controllers/errorController')
const AppError = require('./Utils/appError')

const app = express()

// JSON body Parser
app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/api/v1/books', booksRouter)
app.use('/api/v1/authors', authorsRouter)
app.use('/api/v1/users', userRoutes)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorController)
module.exports = app