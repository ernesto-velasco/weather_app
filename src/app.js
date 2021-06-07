const express = require('express')
const compression = require('compression')
var minify = require('express-minify')

const app = express()

// config server
app.use(compression())
app.use(minify())
app.use(express.static('public', {maxAge: 31557600}))

// set routes to listen
app.get('/', (req, res) => res.send('Weather App.'))
app.get('/about', (req, res) => res.send('About'))
app.get('/help', (req, res) => res.send('Help'))
app.get('/weather', (req, res) => res.send('Weather Forecast'))

// config PORT
const PORT = process.env.PORT || 3000

// listening
app.listen(PORT, () => console.log('Server running on port', PORT))
