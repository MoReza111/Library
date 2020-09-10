const User = require('./../models/userModel')
const catchAsync = require('./../Utils/catchAsync')
const jwt = require('jsonwebtoken')

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

    createSendToken(newUser, 201, req, res);
})