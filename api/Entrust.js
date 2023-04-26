const { log } = require('../utils/log')
const Validator = require('../utils/Validator')
const validator = new Validator()

class Entrust {
  block(req, res) {
    var valid = validator.entrust(req, res)
    if (valid) {
      // Call log on Request
      log(req)
      // Call Bank's API
      return res.status(200).json({ message: 'Blocked!!!' })
    }
  }

  unlock(req, res) {
    var valid = validator.entrust(req, res)
    if (valid) {
      // Call log on Request
      log(req)
      // Call Bank's API
      return res.status(200).json({ message: 'Unblocked!!!' })
    }
  }
}

module.exports = Entrust
