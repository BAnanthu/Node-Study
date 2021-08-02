const express =  require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
// const db = require('./queries')
const router = express.Router()
const middleware = require('./middlewares')

const { check, validationResult } = require('express-validator');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());  

// Static Files
app.use(express.static('public'));

// Set View's
app.set('views', './views');
app.set('view engine','ejs')

// Navigation
app.get('', (req, res) => {
    res.render('register.ejs', { text: 'Register here' })
})

router.post('/users',middleware.SignupMiddleware,
(req, res) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if(req.body.password == req.body.confirm_password){
    if(hasErrors) {
      res.render('register.ejs', { text: 'Register here',err:result.errors[0].msg })
    }else{
      db.createUser(req, res)
    }
  } else{
    res.render('register.ejs', { text: 'Register here',err:'password doesn\'t match' })
  }
}
);


app.get('/user/:token',(req,res)=>{
  console.log(req.params.token)
})

// app.get('/users/:id', db.getUserById)
app.get('/about', (req, res) => {
   res.sendFile(__dirname + '/views/about.html')
})
app.use('/',router)
// Listen on Port 5000
app.listen(port, () => console.info(`App listening on port http://localhost:${port}`))

