const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const weatherData = require('./utils/weatherModule')

const app = express()

// Define paths for express config
const publicDirectorytPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

// Setup Hnadle bar engine end views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve like css img and js
app.use(express.static(publicDirectorytPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        footerText: 'Created by Sreehari Mullapulli'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        footerText: 'Sreehari Mullapulli'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        footerText: 'Sreehari Mullapulli'
    })
}

)

app.get('/weather', (req, res) => {
    if ( !req.query.address ) {
        return res.send({
            error: 'You should provide a address'
        })
        
    }
    geoCode.geoCode(req.query.address, (error, { lattitude, longittude, location } = {}) => {
        if (error) {
            return res.send({ error })   
        }
    
        weatherData( {lattitude, longittude}, (error, {currentTemp, currentPrecipProbability, currentSummary} = {}) => {     
           if (error) {
            return res.send({ error }) 
           }
           const weatherSummary = 'In ' + location + ' , the current temperture is ' + currentTemp + ' degree celcius' + ' and it is '
           + currentSummary + '. The chance of rain is ' + currentPrecipProbability + ' Percentage.'
           res.send({
            location,
            temperature: currentTemp,
            precepProbability: currentPrecipProbability,
            weatherSummary: weatherSummary,
            address: req.query.address
        })
        })
     })
})

app.get("/help/*", (req, res) => {
res.render('error', {
    title: 'Help page not found',
    footerText: 'Please use proper url'
})
})
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page not found',
        footerText: 'Please use proper url'
    })
})  
app.listen(port, () => {
    console.log('the server is up on port ' + port)
})
 