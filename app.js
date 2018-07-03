const express = require('express')

// App
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Hello Jenkins')
})

module.exports = app
