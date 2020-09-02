const AppError = require('./../Utils/appError')

const handleJWTError = () => new AppError('Invalid Token. Please Login again', 401)
const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again', 401)

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
    const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]
    const message = `Duplicate field value : ${value} Please use `
    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400)
}
const sendErrorDev = (err, req, res) => {
    //API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    }
    //Rendered Website
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message
    })


}

const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        // Operational , trusted error : send message to client 
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            })
        }
        // Programming or other unknown errors : Don't leak error details
        // 1) Log Error
        console.error('Error ', err)
        // 2) Send generit message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong'
        })

    }
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        })
    }
    // Programming or other unknown errors : Don't leak error details
    // 1) Log Error
    console.error('Error ', err)
    // 2) Send generit message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later'
    })
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        error.message = err.message
        if (error.kind === 'ObjectId') {
            error = handleCastErrorDB(error)
        }
        if (error.code === 11000) {
            error = handleDuplicateFieldsDB(error)
        }
        if (error._message === 'Validation failed') {
            error = handleValidationErrorDB(error)
        }
        if (error.name === 'JsonWebTokenError') {
            error = handleJWTError()
        }
        if (error.name === 'TokenExpiredError') {
            error = handleJWTExpiredError()
        }

        sendErrorProd(error, req, res)
    }
}