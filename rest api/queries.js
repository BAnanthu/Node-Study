const db = require('./db-config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const saltRounds = 10;


// CRUD is an acronym that stands for CREATE, READ, UPDATE, and DELETE. 

  //Create
  const createUser = (request, response) =>  {
    const { username, email, password } = request.params
    let token = jwt.sign({_id:username},'secretkey')
    const hashpass = bcrypt.hashSync(password, saltRounds);
    db.pool.query('INSERT INTO users (username, email,password,token) VALUES ($1, $2, $3,$4) RETURNING *', [username, email, hashpass,token], function(error, results){
      if (error) {
        throw error
      }
     else{
    //   response.status(201).send(`User added with ID:${results.rows[0].id}`);
      response.status(201).json(results.rows[0]);
     }
    })
  
  }


 // Read
  const getUserById = (request, response) => {
    console.log(request)
    const id = parseInt(request.params.id)
    console.log("fetching data.....")
    db.pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  //Update

  const putUserById = (request, response) => {
    console.log(request)
    const id = parseInt(request.params.id)
    const name =request.params.name
    console.log("updating data.....")
    db.pool.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING id, username, email', [name,id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //Delete
  const deleteUserById = (request, response) => {
    console.log(request)
    const id = parseInt(request.params.id)
    console.log("deleting data.....")
    db.pool.query('DELETE FROM users WHERE id = $1 RETURNING id, username, email', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUserById,
    putUserById,
    deleteUserById,
    createUser
  }