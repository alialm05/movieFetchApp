const { check, validationResult } = require('express-validator');
const { StatusCodes } = require("http-status-codes")
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//const shortid = require('shortid')

require("dotenv").config()

const ValidateSignUp = [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({min: 6}).withMessage("Password must be 6 characters long")
]

// request is the validation chain passed to this funciton, res the the value returned from this method
const isRequestValid = (req, res, next) => {
    const errors = validationResult(req)
    console.log(`request: `, req.body)
    if(errors.isEmpty()){
        return next() // next() is a function that calls the next middleware in the stack (sign up)
    }
    return res.status(StatusCodes.BAD_REQUEST).json({errors: errors.array()})
}

const signUp = async (req, res) => {
    const {email, password} = req.body
    if (!email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Please enter all fields"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    //email = email.toLowerCase()

    const userData = {
        email,
        password: hashedPassword
    }

    const user = await User.findOne({email})

    if (user){
        console.log(`existing user: `, user)
        return res.status(StatusCodes.BAD_REQUEST).json({message: "User already exists"})
    }
    else {
        await User.create(userData)
        return res.status(StatusCodes.CREATED).json({message: "Account created successfully!"})
    }

}


const signIn = async (req, res) => {

    try {
        const {email, password} = req.body
        
        if (!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Please enter all fields"})
        }

        const user = await User.findOne({email})

        if (!user){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "User does not exist"})
        }

        const isMatch = user.authenticatePass(password)

        if (!isMatch){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Username or Password is incorrect!"})
        }

        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_ACCESS, {expiresIn: "15m"});
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_REFRESH, {expiresIn: "30d"});

        res.cookie(
            'refreshToken', 
            refreshToken,
            {httpOnly: true})

        user.refreshToken = refreshToken
        await user.save()
        
        return res.status(StatusCodes.OK).json({accessToken: accessToken})
        

    } catch (error) {
        console.error(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Server error"})
    }

}


module.exports = {ValidateSignUp, isRequestValid, signUp, signIn}