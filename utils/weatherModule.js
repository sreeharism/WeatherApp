const request = require('request')

const weatherModule = (coordinates, callback) => {

    const weatherUrl = 'https://api.darksky.net/forecast/ef50ec5f9455c708243a65de94a27621/' + encodeURIComponent(coordinates.lattitude) + ',' + encodeURIComponent(coordinates.longittude) + '?units=si&lang=en'
request({ url: weatherUrl, json: true }, (error, response) => {
   if (error) {
      const error = 'Unable connect to weather service'
      weatherData = undefined
      callback(error,weatherData)
   }else if (response.body.error) {
    const error = 'Problem with weather data'
    const weatherData = undefined
    callback(error,weatherData)
   }
    else {
        const error = undefined
        const weatherData = {
            currentTemp: response.body.currently.temperature,
            currentPrecipProbability: response.body.currently.precipProbability,
            currentSummary: response.body.currently.summary
        }
        callback(error,weatherData)
   }
})
}

module.exports = weatherModule