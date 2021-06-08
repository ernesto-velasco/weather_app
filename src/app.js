require('dotenv').config()
const express = require('express')
const compression = require('compression')
var minify = require('express-minify')
const hbs = require('hbs')
const path = require('path')

const app = express()

// config server
//app.use(compression())
//app.use(minify())
//app.use(express.static('public', {maxAge: 31557600}))
app.use(express.static('public'))

// config app engine
app.set('view engine', 'hbs')

// RegisterPartials method to create shared templates
hbs.registerPartials(path.join(__dirname, '../', '/views/partials'))

// set locals
app.use((request, response, next) => {
  response.locals = {
    site: {
      title: process.env.APP_NAME,
      description: process.env.APP_DESCRIPTION || '',
    },
    author: {
      name: process.env.AUTHOR || '',
      contact: {
        github: process.env.AUTHOR_CONTACT_GITHUB || '',
      },
    },
  }
  next()
})

// set routes to listen
app.get('/', (request, response) => response.send('Weather App.'))
app.get('/about', (request, response) => response.send('About'))
app.get('/help', (request, response) => response.send('Help'))
app.get('/weather', (request, response) => response.send('Weather Forecast'))

app.get('/*', (request, response) => {
  response.render('404')
})

// config PORT
const PORT = process.env.PORT || 3000

// listening
app.listen(PORT, () => console.log('Server running on port', PORT))
