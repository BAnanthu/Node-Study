const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'scope',
  port: 5434,
})

module.exports = {
    pool
}