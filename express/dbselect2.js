var mysql = require('mysql');
const express = require('express')
const ejs = require('ejs')
var app = express()
app.set('view engine','ejs')

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_nodejsstudy"
});

var obj = {};
app.get('/data', function(req, res){
    connection.query('SELECT * FROM customers', function(err, result) {

        if(err){
            throw err;
        } else {
            
            res.render('print.ejs', {obj : result});                
        }
    });
});
app.listen(3000)