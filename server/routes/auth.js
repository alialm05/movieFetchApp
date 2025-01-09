const express = require('express');
const router = express.Router();
const { ValidateSignUp, isRequestValid, signIn, signUp } = require('../controllers/registerController');

router.route('/register')
    .post(ValidateSignUp, isRequestValid, signUp) // check validation chain, pass it to isRequestValid func, then sign up if all is well


router.route('/signin')
    .post(ValidateSignUp, isRequestValid, signIn)

module.exports = router;