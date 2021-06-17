require('dotenv').config()
const request = require('request')
const translate = require('@iamtraction/google-translate')

const weatherstack = (lat, long, callback) => {
  let params = {
    access_key: process.env.weatherstack_key,
    query: encodeURIComponent(lat) + ',' + encodeURIComponent(long),
    forecast_days: 3,
  }
  console.log(params)
  const baseURL = 'http://api.weatherstack.com/current'
  request({url: baseURL, qs: params, json: true}, (error, response) => {
    if (error) return 'No es posible contactar al servicio de clima', undefined
    console.log(response.body)
    if (!response.body.current)
      return callback(
        'No es posible encontrar la información current, intenta de nuevo',
        undefined
      )
    const current = response.body.current
    const forecast = response.body.forecast
    let description = current.weather_descriptions[0]
    translate(description, {from: 'en', to: 'es'})
      .then((response) => {
        let description_es = response.text
        callback(undefined, {
          temp: current.temperature,
          feelslike: current.feelslike,
          precip: current.precip,
          wind_speed: current.wind_speed,
          humidity: current.humidity,
          description,
          description_es,
        })
      })
      .catch((error) => {
        callback(undefined, {
          current: {
            temp: current.temperature,
            feelslike: current.feelslike,
            precip: current.precip,
            wind_speed: current.wind_speed,
            humidity: current.humidity,
            description: current.weather_descriptions[0],
            description_es: current.weather_descriptions[0],
          },
          forecast: {},
        })
      })
  })
}

module.exports = weatherstack
