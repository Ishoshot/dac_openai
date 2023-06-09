const Connection = require('../utils/Connection')
const connection = new Connection()
const fs = require('fs')
const { getDate, getFileDate, isWeekend, getDateAndTime } = require('./date')

class Logger {
  logToDB(prompt, data) {
    const con = connection.create()
    //create table if it doesn't exist
    var sql =
      'CREATE TABLE IF NOT EXISTS logs_openai (id INT AUTO_INCREMENT PRIMARY KEY, prompt VARCHAR(255), response VARCHAR(255), date DATETIME)'
    con.query(sql, function (err, result) {
      if (err) throw err
      console.log('Table created')
    })
    var sql = `INSERT INTO logs_openai (prompt, response, date) VALUES ('${prompt}', '${data.data}', now())`
    con.query(sql, function (erro, result) {
      if (erro) throw erro
      console.log('Inserted')
    })
    connection.close(con)
  }

  // Log To file
  logToFile(prompt, data) {
    const log = {
      date: getDateAndTime(),
      prompt: prompt,
      data: data.data,
    }

    //create a directory called logs if it doesn't exist
    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs')
    }

    //Log to file
    fs.appendFile(
      'logs/dac-log-' + getFileDate() + '.log',
      '\n' + JSON.stringify(log),
      function (err) {
        if (err) throw err
        console.log({ status: 'Successful' })
      },
    )

    // Script to determine weekend inorder to achieve logs
    isWeekend()
  }
}

module.exports = Logger
