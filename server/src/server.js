const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const apiPort = 8081

const simplifyResponseData = (response) => {
  let data = []
  response.data.data.forEach((element) => {
    data.push({
      url: element.images.downsized_medium.url,
      title: element.title
    })
  })

  return data
}

app.use(bodyParser.json())

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

// Root endpoint
app.get('/', (req, res) => {
  res.send('Spiffy-API')
})

// Search endpoint
app.get('/search', (req, res) => {
  axios
    .get('https://api.giphy.com/v1/gifs/search?api_key=kqFn5fZG8yAhpJHmmJFW6jzI9zMlXv3I&limit=10&offset=' + req.query.offset + '&q=' + req.query.query)
    .then((response) => {
      let data = simplifyResponseData(response)
      res.send(data)
    })
    .catch((error) => {
      console.log(error.statusText)
      res.send({ data: [] })
    })
})

// Trending endpoint
app.get('/trending', (req, res) => {
  axios
    .get('https://api.giphy.com/v1/gifs/trending?api_key=kqFn5fZG8yAhpJHmmJFW6jzI9zMlXv3I&limit=10&offset=' + req.query.offset)
    .then((response) => {
      let data = simplifyResponseData(response)
      res.send(data)
    })
    .catch((error) => {
      console.log(error.statusText)
      res.send({ data: [] })
    })
})

app.listen(apiPort, (err) => {
  if (err) {
    console.error(err)
  }
  console.info('----\n==> 🌎  Server is running on port http://localhost:%s', apiPort)
})
