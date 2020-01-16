
const request = require('request')

const geoCode = (address,callback) => {
   const coordinateUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3JlZWhhcmlzbSIsImEiOiJjazVlYTEwNzgxejhkM2RtdThlZDg4cGJsIn0.-zPBb-3Ta_b7P49mT2U73A&limit=1'
   request({ url: coordinateUrl, json: true}, (error, response) => {
      if (error) {
         const error = 'The Coordinate API is not responding'
         const data = undefined
         callback(error, data)
      } else if ( response.body.features.length === 0 ) {
         const error = 'Problem with locations data'
         const data = undefined
         callback(error, data)
      } 
      else {
         const data = {
            lattitude: response.body.features[0].center[1],
            longittude: response.body.features[0].center[0],
            locations: response.body.features[0].place_name
         }
         const error = undefined
         callback(error, data)
      }
   })
}

module.exports = {
    geoCode: geoCode
}