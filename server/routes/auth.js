const express = require('express');
const router = express.Router();

//import controller

const { signup, accountActivation, signin } = require('../controller/auth');

//import validators
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', accountActivation);
router.post('/sign-in', userSigninValidator, runValidation, signin);

module.exports = router;
