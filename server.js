const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! voi VietHung')
})

app.get('/about', (req, res) => {
  res.send(` I'm VietHung `)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})