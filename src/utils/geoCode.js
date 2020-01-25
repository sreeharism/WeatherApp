
const request = require('request')

const geoCode = (address,callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3JlZWhhcmlzbSIsImEiOiJjazVlYTEwNzgxejhkM2RtdThlZDg4cGJsIn0.-zPBb-3Ta_b7P49mT2U73A&limit=1'
   request({ url, json: true}, (error, {body}) => {
      if (error) {
         const error = 'Unable to connect to geoCode Service'
         const data = undefined
         callback(error, data)
      } else if ( body.features.length === 0 ) {
         const error = 'Problem with locations data'
         const data = undefined
         callback(error, data)
      } 
      else {
         const data = {
            lattitude: body.features[0].center[1],
            longittude: body.features[0].center[0],
            location: body.features[0].place_name
         }
         const error = undefined
         callback(error, data)
      }
   })
}

module.exports = {
    geoCode: geoCode
}