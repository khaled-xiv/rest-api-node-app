const express = require('express');
const {check} = require('express-validator/check');
const jwt_verify = require('../middleware/tokenChecker');


const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register',
    // [   check('password','please enter a password with 8 caracters at leaset').isLength({min:8}).isAlphanumeric(),
    //     check('email').
    //     isEmail().
    //     withMessage('please enter a valid email address')
    // ],
    authController.register);
router.post('/login', authController.login);

router.post('/me',jwt_verify, authController.me);

module.exports = router;
