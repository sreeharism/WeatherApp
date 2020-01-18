const geoCode = require('./utils/geoCode')
const weatherData = require('./utils/weatherModule')

const location = process.argv[2]

if (location) {
  
   console.log('Fetching weather data for the location: ', location )
geoCode.geoCode(location, (error, {lattitude, longittude, locations}) => {
   if (error) {
      return console.log('Error: ',  error)   
   }

   weatherData( {lattitude, longittude}, (error, {currentTemp, currentPrecipProbability, currentSummary}) => {
      
      if (error) {
      return console.log('Error: ',  error)   
      }
   console.log('location: ', locations)   
      console.log('The weather is: ', currentSummary)
      console.log('The current temperature is: ' + currentTemp + ' degree celcius')
      console.log('The probability of rain is: ' + currentPrecipProbability + '%')
   })
})

} else {
   console.log('Give location as argument for which you need to find weather data')
}


