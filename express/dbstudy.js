const express = require('express')
const ejs = require('ejs')
var app = express()
app.set('view engine','ejs')

const mysql = require('mysql')
const connection = mysql.createConnection({
                        host : 'localhost',
                        user : 'root',
                        password : '',
                        database : 'person',
                        table : 'person_details'
                        

})

connection.connect(function(err){
    if(err){
        return console.error('ERROR'+err.message)
    }
    else{
        console.log("Connected to MySQL......")
        // connection.query("CREATE TABLE customers (customer_id VARCHAR(10),customer_name VARCHAR(50),customer_place VARCHAR(50))")
        // console.log("Table created successfully....")
        // connection.query("INSERT INTO customers (customer_id,customer_name,customer_place) VALUES ('SES102','Hari','Kollam')")
        // console.log("Value Inserted .....")
        
    }
})