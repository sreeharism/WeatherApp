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

// Setup Hnadle bar engine end views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Setup static directory to serve like css img and js
app.use(express.static(publicDirectorytPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Sreeharis Weather App',
        footerText: 'Sreehari Mullapulli'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App about page',
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
            error: 'Yous should provide a address'
        })
        
    }
    geoCode.geoCode(req.query.address, (error, { lattitude, longittude, location }) => {
        if (error) {
            return res.send({ error })   
        }
    
        weatherData( {lattitude, longittude}, (error, {currentTemp, currentPrecipProbability, currentSummary}) => {     
           if (error) {
            return res.send({ error }) 
           }
           res.send({
            location,
            temperature: currentTemp,
            precepProbability: currentPrecipProbability,
            weatherSummary: currentSummary,
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
app.listen(3000, () => {
    console.log('the server is up')
})
 