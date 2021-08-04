const { response } = require('express');
const { check, validationResult } = require('express-validator'); 

const jwt = require('jsonwebtoken')

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
                        .trim().escape(),

                        check('confirm_password').custom((value, { req }) => {
                            if (value !== req.body.password) {
                              throw new Error('Password confirmation does not match password');
                            }
                        
                            // Indicates the success of this synchronous custom validator
                            return true;
                          }),
                    ]


  const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    console.log("Middleware work")

    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, 'secretkey', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
          console.log(decodedToken);
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  };



  
  // const requireAuth = (req, res, next) => {
    
  //   console.log("Middleware work")
  //   if(req.session.userid){
  //     next();
  //   }
  //   else{
  //     res.redirect('/')
  //   }

  // };

module.exports = {
    SignupMiddleware,requireAuth
}




// Add sanitation
// In this project, we use 3 sanitization methods:
// trim() trims characters from input. By default (with no parameters) this method trims whitespace.
// escape() will replace certain characters (i.e. <, >, /, &, ', ") with the corresponding HTML entity.
// normalizeEmail() ensures the email address is in a safe and standard format.