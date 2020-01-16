const request = require('request')
const geoCode = require('./utils/geoCode')
const weatherData = require('./utils/weatherModule')

geoCode.geoCode('warangal', (error, data) => {
   console.log('Error: ',  error)
   console.log('Data: ' , data)
   weatherData( { lattitude: data.lattitude, longittude: data.longittude }, (error, data) => {
      console.log('Error: ',  error)
      console.log('The weather is: ', data.currentSummary)
      console.log('The current temperature is: ' + data.currentTemp + '^C')
      console.log('The probability of rain is: ' + data.currentPrecipProbability)
   })
})

