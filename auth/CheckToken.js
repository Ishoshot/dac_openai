const dotenv = require('dotenv')
dotenv.config()
const { log } = require('../utils/log')
const _token = process.env.TOKEN
const uuidv4 = require('uuid')

module.exports = {
  validateToken: (req, res) => {
    const token = req.token
    if (!token) {
      let data = {
        code: '90',
        message: 'No token provided.',
      }
      return data
    }
    if (token !== _token) {
      let data = {
        code: '01',
        message: 'Access to Open AI Intent Recognizer Failed',
        otherMessage: 'Invalid Token Code',
      }
      return data
    } else {
      let data = {
        code: '00',
      }
      return data
    }
  },
}
