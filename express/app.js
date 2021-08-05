const Express = require('express');
let ejs = require('ejs');
const bodyParser= require('body-parser')
const path = require('path');

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

app.post('/form',(req,res)=>{
    var data =req.body
    console.log(data)
    console.log(data.fname)
    console.log(data.lname)
    res.render('home.ejs',{name:data.fname + data.lname})
})
app.listen(3000)
console.log("http://localhost:3000/")