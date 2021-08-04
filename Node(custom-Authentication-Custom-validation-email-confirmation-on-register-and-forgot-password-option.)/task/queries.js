const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'scope',
  port: 5434,
})
const sentMail = require('./mail')
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
      sentMail(results.rows[0].email,results.rows[0].username,results.rows[0].token,results.rows[0].id);
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

  const authUser = (request, response) => {
    console.log("request")
    console.log(request)
    const id = parseInt(request.params.id)
    console.log("dddd*",id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      if(results.rows[0].token == request.params.token){
        console.log("true")
        pool.query('UPDATE users SET is_verified = TRUE WHERE id = $1',[id],(error, results) => {
          if (error) {
            throw error
          }
        })
      }else{
        console.log("false")
      }
    })
  }

  
  module.exports = {
    createUser,getUserById,authUser
  }