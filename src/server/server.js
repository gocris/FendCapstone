const projectData = {}

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

const port = 5000;

const server = app.listen(port, ()=>{
    console.log(`server running!`);
    console.log(`server running on localhost:${port}`);
})

app.get('/all', (req, res)=>{
    console.log(':::Updating UI:::');
    console.log(projectData);
    res.send(projectData);
})

app.post('/addInfo', (req, res)=>{ 
    console.log(':::POST request recieved! Adding data to local server:::');
    console.log(req.body);
    console.log('---END OF req.body---');
    newInfo = {
        city: req.body.city,
        lng: req.body.lng,
        lat: req.body.lat,
    }
    
    Object.assign(projectData, newInfo);
})

app.post('/adddark', (req, res)=>{ 
    console.log(':::/addDark POST request recieved! Adding data to local server:::');
    console.log(req.body);
    console.log('---END OF req.body---');
    newInfo = {
        weather: req.body.weather,
        temperatureHigh: req.body.temperatureHigh,
        temperatureLow: req.body.temperatureLow,
    }
    
    Object.assign(projectData, newInfo);
})

app.post('/addpix', (req, res)=>{ 
    console.log(':::/addpix POST request recieved! Adding data to local server:::');
    console.log(req.body);
    console.log('---END OF req.body---');
    newInfo = {
        hits: req.body.hits,
        imageURL: req.body.imageURL
    }
    
    Object.assign(projectData, newInfo);
})

