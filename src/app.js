require('dotenv').config()
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const geocoding = require('./utils/geocoding')
const current = require('./utils/weatherstack')
const forecast = require('./utils/weatherforecast')

const app = express()

app.use(express.static('public'))

// config app engine
app.set('view engine', 'hbs')

// RegisterPartials method to create shared templates
hbs.registerPartials(path.join(__dirname, '../', '/views/partials'))

hbs.registerHelper('loud', (aString) => aString.toUpperCase())

app.get('/getweather', (request, response) => {
  let city = request.query.city
  if (!city) {
    return response.send({
      error: 'You have to provide a city.',
    })
  }

  geocoding(city, (error, data) => {
    if (error) return console.log('Error', error)
    console.log(data)
    let lat = data.lat
    let long = data.long
    current(lat, long, (error, data) => {
      if (error) return console.log('Error', error)
      let current = data
      forecast(lat, long, (error, data) => {
        if (error) return console.error('Error: ', error)
        let forecast = data
        response.send({
          description: current.description,
          descriptionEs: current.description_es,
          temp: current.temp,
          feelslike: current.feelslike,
          precip: current.precip,
          forecast,
        })
      })
    })
  })
})

// set locals
app.use((request, response, next) => {
  response.locals = {
    site: {
      title: process.env.APP_NAME,
      description: process.env.APP_DESCRIPTION || '',
    },
    author: {
      name: process.env.AUTHOR_NAME || '',
      contact: {
        github: process.env.AUTHOR_CONTACT_GITHUB || '',
      },
    },
  }
  next()
})

// set routes to listen
app.get('/', (request, response) => response.render('index', {route: 'index'}))
app.get('/about', (request, response) => response.render('about'))
app.get('/help', (request, response) => response.render('help'))
app.get('/weather', (request, response) => response.render('weather'))

app.get('/*', (request, response) => response.render('404'))

// config PORT
const PORT = process.env.PORT || 3000

// listening
app.listen(PORT, () => console.log('Server running on port', PORT))
