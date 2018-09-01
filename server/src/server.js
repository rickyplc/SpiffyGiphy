const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apiPort = 8081

app.use(bodyParser.json())

app.listen(apiPort, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('----\n==> 🌎  Server is running on port %s', apiPort)
})
