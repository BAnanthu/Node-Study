const Express = require('express');
let ejs = require('ejs');
const bodyParser= require('body-parser')
const path = require('path');
const multer = require('multer');
var upload = multer({dest:'uploads/'});

const app = Express() // creating an express application
app.use(bodyParser.urlencoded({extended:false}))
app.use(Express.static(path.join(__dirname , 'public')));
app.set('view engine','ejs')
console.log(__dirname)
function doSomething(){
    return true;
}

app.get('/',(req,res)=>{

    // const promise2 = promise.then(successCallback, failureCallback);
    res.render('home.ejs', { name:"ananthu b", age:22 } )
})

app.get('/about',(req,res)=>{
    res.render('about.ejs')
})

// app.post('/upload',(req,res)=>{
//     console.log(req)
//     res.json({status:200})
// })
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../upload');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});



  const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
app.get('/upload', (req, res) => {
    res.render('up.ejs')
})

var upload = multer({ storage: storage })
app.post('/upload', upload.single('pic'), (req, res) => {
    try {
      res.send(req.file);
    }catch(err) {
      res.send(400);
    }
  });


app.post('/form',(req,res)=>{
    var data =req.body
    console.log(data)
    console.log(data.fname)
    console.log(data.lname)
    res.render('home.ejs',{name:data.fname + data.lname})
})
app.listen(3000)
console.log("http://localhost:3000/")