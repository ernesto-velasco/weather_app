require('dotenv').config()
const request = require('request')

const geocoding = (adress, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(adress) +
    '.json'

  let params = {
    access_token: process.env.mapbox_key,
  }

  request({url, qs: params, json: true}, (error, response) => {
    if (error)
      return callback(
        'No es posible contactar al servicio de geo codificación',
        undefined
      )

    if (response.body.features.length === 0)
      return callback(
        'No es posible encontrar la ubicación, intenta de nuevo',
        undefined
      )

    let long = response.body.features[0].center[0]
    let lat = response.body.features[0].center[1]
    callback(undefined, {
      long: long,
      lat: lat,
    })
  })
}

module.exports = geocoding
