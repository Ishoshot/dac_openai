const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

class Connection {
  create() {
    return mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.ENV === 'production' ? process.env.MYSQL_DB_PROD : process.env.MYSQL_DB,
    })
  }

  close(con) {
    con.end()
  }
}
module.exports = Connection
