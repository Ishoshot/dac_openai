const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bearerToken = require('express-bearer-token')
const { validateToken } = require('./auth/CheckToken')
const router = express.Router()
const { log } = require('./utils/log')
const { getPromptBreakdown } = require('./services/openai')


dotenv.config()
app.use(
  bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token',
    cookie: false, // by default is disabled
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router);


// General Middleware
router.use(function (req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path)
  let data = validateToken(req, res)
  if (data.code !== '00') {
    return res.status(403).json(data)
  }
  return next()
})


/* --------------------------- Application Routes --------------------------- */
router.post('/openai/intent-recognizer', async function (req, res) {
  const { prompt } = req.body
  console.log(prompt)
  if (!prompt) {
    return res.status(422).json({
      code: '90',
      message: 'Prompt is required',
    })
  }
  const data = await getPromptBreakdown(prompt)
  console.log(data)
  log({
    "prompt": prompt,
    "data": data
  });
  return res.status(200).json(data)
})


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
