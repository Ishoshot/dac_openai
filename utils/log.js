const Logger = require('../services/logger')
const logger = new Logger()

module.exports = {
  log: (_data) => {
    const { data, prompt } = _data;
    logger.logToDB(prompt, data)
    logger.logToFile(prompt, data)
  },
}
