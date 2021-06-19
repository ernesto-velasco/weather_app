require('dotenv').config()
const request = require('request')

const weatherforecast = (lat, lon, callback) => {
  let params = {
    key: process.env.weatherforecast_key,
    lat,
    lon,
  }
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily'
  request({url, qs: params, json: true}, (error, response) => {
    if (error)
      callback('No es posible contactar al servicio de clima', undefined)
    if (!response.body.data)
      return callback(
        'No es posible encontrar la información forecast, intenta de nuevo',
        undefined
      )
    callback(undefined, response.body.data)
  })
}

module.exports = weatherforecast
