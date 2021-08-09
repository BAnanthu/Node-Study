var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var user = {
    "user4" : {
       "name" : "mohit",
       "password" : "password4",
       "profession" : "teacher",
       "id": 4
    }
 }
 
 app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(typeof(data))
       data = JSON.parse( data );
       console.log(typeof(data))
       data["user4"] = user["user4"];
       console.log(typeof(user))
       console.log(typeof(JSON.stringify(data)))
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })



 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })

 app.put('/:id/:name', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       user.name = req.params.name
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })
 
 
 app.delete('/deleteUser/:id', function (req, res) {
    console.log("data")
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log(data)
      data = JSON.parse( data );
      delete data["user" + req.params.id];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})
 

//api with postgress

const queries = require('./queries')

app.post('/user/:username/:email/:password',queries.createUser)

app.get('/user/:id',queries.getUserById)

app.put('/user/:id/:name',queries.putUserById)

app.delete('/user/:id',queries.deleteUserById)

app.listen(3000)
console.log("http://localhost:3000/")

