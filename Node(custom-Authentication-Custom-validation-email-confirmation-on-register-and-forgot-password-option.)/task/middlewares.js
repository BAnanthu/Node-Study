const { response } = require('express');
const { check, validationResult } = require('express-validator'); 


const SignupMiddleware = [
                        check('username')
                        .isAlphanumeric()
                        .withMessage('username must be alphanumeric'),
                        
                        check('email')
                        .trim()
                        .escape()
                        .normalizeEmail()
                        .isEmail()
                        .withMessage('please enter a valid email'),
                    
                         check('password').isLength({ min: 8 })
                        .withMessage('Password Must Be at Least 8 Characters')
                        .matches('[0-9]')
                        .withMessage('Password Must Contain a Number')
                        .matches('[A-Z]')
                        .withMessage('Password Must Contain an Uppercase Letter')
                        .trim().escape()
                    ]


module.exports = {
    SignupMiddleware,
}




// Add sanitation
// In this project, we use 3 sanitization methods:
// trim() trims characters from input. By default (with no parameters) this method trims whitespace.
// escape() will replace certain characters (i.e. <, >, /, &, ', ") with the corresponding HTML entity.
// normalizeEmail() ensures the email address is in a safe and standard format.