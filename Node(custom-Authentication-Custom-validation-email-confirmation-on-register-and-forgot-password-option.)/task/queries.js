const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: 'Ananthu@123',
  port: 5432,
})
// const sentMail = require('./mail')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = (request, response) =>  {
    const { username, email, password } = request.body
    let token = jwt.sign({_id:username},process.env.TOKEN_SECRET)
    const hashpass = bcrypt.hashSync(password, saltRounds);
    pool.query('INSERT INTO users (username, email,password,token) VALUES ($1, $2, $3,$4) RETURNING *', [username, email, hashpass,token], function(error, results){
      if (error) {
        throw error
      }
     else{
      response.status(201).send(`User added with ID:${results.rows[0].id}`);
      // sentMail(results.rows[0].email,results.rows[0].username,results.rows[0].token);
     }
    })
  
  }



  const getUserById = (request, response) => {
    console.log(request)
    const id = parseInt(request.params.id)
    console.log("dddd")
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  
  module.exports = {
    createUser,getUserById
  }