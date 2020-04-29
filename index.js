const serverless = require('serverless-http')
const express = require('express')
const app = express()

app.get('/hello/:name', function (req, res) {
  const { params: { name } } = req
  res.status(200).set('X-SLS-Content-Type', 'text/plain').send(`Hello ${name}!`)
})

app.get('/admin/forbidden', function (req, res) {
  res.sendStatus(403)
})

app.get('/error/500', function (req, res) {
  throw new AssertionError()
})

app.use(function (err, req, res, next) {
  res.status(500).json({ error: err })
})

const birds = require('./birds')
app.use('/birds', birds)

module.exports.handler = serverless(app)
