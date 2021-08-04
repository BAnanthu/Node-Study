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
  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'secretkey', {
      expiresIn: maxAge
    });
  };

  const loginAuth = (request, response) => {
    console.log("request")
    console.log(request)
    const username = request.body.username
    const password = request.body.password

    pool.query('SELECT * FROM users WHERE username = $1', [username], (error, results) => {
      if (error) {
        throw error
      }
      // console.log( results.rows[0].password, results.rows[0].id, results.rows[0].username)
     if( bcrypt.compareSync(password, results.rows[0].password) == true){
      // session=request.session;
      const token = createToken(results.rows[0].id);
      response.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); //The res. cookie() function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON. Parameters: The name parameter holds the name of the cookie and the value parameter is the value assigned to the cookie name.
      // session.userid=request.body.username;
      // console.log(request.session)
      response.redirect('/home');
     }
      // console.log(bcrypt.compareSync(password, results.rows[0].password))
      // response.status(200).json(results.rows)
    })
    // console.log("***",username)
    // pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username,"Ananthu@123"], (error, results) => {
    //   if (error) {
    //     throw error
    //   }
    //   response.status(200).json(results.rows)
    // })
  }

  
  module.exports = {
    createUser,getUserById,authUser,loginAuth
  }