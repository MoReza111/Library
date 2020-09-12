const User = require('./../models/userModel')
const catchAsync = require('./../Utils/catchAsync')
const AppError = require('./../Utils/appError')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const signToken = id => {
    return jwt.sign({ id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id)

    // Remove password from output
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}


exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        userName: req.body.userName,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        email: req.body.email,
        name: req.body.name
    })

    createSendToken(newUser, 201, req, res)
})

exports.login = catchAsync(async (req, res, next) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        return next(new AppError('Please provide username and password', 400))
    }

    const user = await User.findOne({ userName }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect Credentials", 401))
    }

    createSendToken(user, 200, req, res)

})

exports.authorize = catchAsync(async (req, res, next) => {
    console.log(req.headers)
    if (!req.headers.authorization) {
        return next(new AppError(`Please Login`, 401))
    }

    const token = req.headers.authorization.split(' ')[1]

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    if (!user) {
        return next(new AppError('The user belonging to this token does no longer exist.', 404))
    }

    if (user.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please log in again.', 401))
    }

    req.user = user
    next()
})