const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
const db = require('./queries')
const router = express.Router()
const middleware = require('./middlewares')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const { check, validationResult } = require('express-validator');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const sentMail = require('./mail')
app.use(cookieParser());

// Static Files
app.use(express.static('public'));




const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "secretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs')





// Navigation
app.get('', (req, res) => {
  res.render('register.ejs', { text: 'Register here' })
})

router.post('/users', middleware.SignupMiddleware,
  (req, res) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    console.log(result)
    // if(req.body.password == req.body.confirm_password){
    if (hasErrors) {
      res.render('register.ejs', { text: 'Register here', err: result.errors[0].msg })
    } else {
      db.createUser(req, res)
    }
    // } else{
    //   res.render('register.ejs', { text: 'Register here',err:'password doesn\'t match' })
    // }
  }
);


app.get('/login',
  (req, res) => {
    res.render('login.ejs', { text: 'Login here' })
  }
)

app.get('/home',middleware.requireAuth,
  (req, res) => {
    res.render('home.ejs')
  }
)

app.get('/about',
  (req, res) => {
    res.render('about.ejs')
  }
)

app.post('/login', db.loginAuth)

app.get('/logout', function(req, res){
  req.session.destroy();
  res.send('<br />logged out!<br /><a href="/user">Check Session</a>');
  });

// db.loginAuth
app.get('/forgot', (req, res) => {
  sentMail("ananthu3454@gmail.com", "ananthu", "nil");
  console.log(req)
  res.render('register.ejs', { text: 'Register here', err: 'password doesn\'t match' })
})


app.get('/user/:id/:token', db.authUser)

app.get('/users/:id', db.getUserById)

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html')
})
app.use('/', router)


app.post('/upload', function(req, res) {
  console.log(req.files.foo); // the uploaded file object
});
// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port http://localhost:${port}`))

