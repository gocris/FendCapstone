const username = "cris562" //GeoNames username
const GeoNames = 'api.geonames.org/postalCodeSearchJSON?';
const darkSkyUrl = 'https://api.darksky.net/forecast/';
const darkSkyAPIKey = '671a71b3bef16fefdbe5d84fc06a7c00';
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayAPIKey = '14765512-087c09684104ecafca4e3b55f';
const proxy = 'https://cors-anywhere.herokuapp.com/';

const gen = (function() {
    document.getElementById('gene').addEventListener('click', performAction);
 
function performAction(e) { 
    handleCountdown();
    const zipCode = document.getElementById('zip').value;
    
    _fetchGeoNames(username, zipCode)

    .then((data)=>{
        postInfo('/addInfo', {city: data.postalCodes[0].placeName, lng: data.postalCodes[0].lng, lat: data.postalCodes[0].lat })
    .then(updateUI() 
    .then(()=>{
        console.log
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);
        const countdownInDays = dateDifference(startDate, endDate) / 8.64e7;
    
        let currentDate = new Date(startDate);
        for (let i = 0; i < countdownInDays; i++) {
            const time = currentDate.getTime() / 1000;
            handleDarkSky(darkSkyUrl, darkSkyAPIKey, time, i);
            currentDate.setDate(currentDate.getDate() + 1);
            }
    
        const placeName = document.getElementById('cityUI').textContent;
    
        _fetchPixabay(placeName)
        .then((pixdata)=>{
            postInfo('/addpix', {hits: pixdata.totalHits, imageURL: pixdata.hits[0].largeImageURL})
            .then(updatePixUI())
        }); 
      })
    )
});
}

const postInfo = async (url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 
        'Content-Type': 'application/json',
    },    
    body: JSON.stringify(data),
    });

    try { 
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

const updateUI = async ()=>{ 
    const response = await fetch('/all')

    try {
        const allData = await response.json();

        document.getElementById('cityUI').textContent = allData.city;
        document.getElementById('dateUI').textContent = allData.lng;
        document.getElementById('tempUI').textContent = allData.lat;

    } catch(error) { 
        console.log('error', error);
    }
}

const updateDarkUI = async (daySinceStart)=>{
    const response = await fetch('/all')

    try {
        const allData = await response.json()
        console.log(allData);

        const temperatureHighAndLowText = `Day ${daySinceStart + 1}: Highs of ${allData.temperatureHigh}\u00B0\F ↑ Lows of ${allData.temperatureLow}\u00B0\F ↓ & ${allData.weather}. `;
      
        const child = document.createElement('li');
        child.innerHTML = temperatureHighAndLowText;
        document.getElementById('weather').appendChild(child); 
    } catch(error) {
        console.log('error', error);
    }
}

const updatePixUI = async()=>{
    const response = await fetch('/all')

    try { 
        const allData = await response.json();
        
        if (allData.hits != 0) {
            const pixImg = document.createElement('img');
            pixImg.setAttribute("height", "300");
            pixImg.src = allData.imageURL;
            document.getElementById('pixImage').appendChild(pixImg); 
            console.log(document.getElementsByClassName('pixy').length);
        }
        else {
            console.log( error, 'no results')
        }
        
    } catch(error) { 
        console.log('error', error);
    }
}

const _fetchGeoNames = async (username, zipOrCity)=>{
    // we build our data necessary for doing the fetch operation from weather api
    const cityOrPostal = getCityOrPostalCode(zipOrCity);
    const url = `http://${GeoNames}${cityOrPostal}&maxRows=10&username=${username}`;
    
    const response = await fetch(url)
    try {
      const data = await response.json();
      console.log(data);
      return data;
    } catch(error) {
      console.log("error", error);
    }
  };

  // Remember that you have to change your GeoNames URL constant if you do it this way
const getCityOrPostalCode = (zipOrCity)=>{
  
    if (/\d/.test(zipOrCity.value)) {
      return 'postalcode=' + zipOrCity;
    } else {
      // Otherwise we simply expect it to be a city, and as above, do validation here if you want to
      return 'placename=' + zipOrCity;
    }
};

const _fetchDarkSky = async(darkURL, darkKey, lat, lng, time)=>{

    const response = await fetch(`${proxy}${darkURL}${darkKey}/${lat},${lng},${time}`);
    try { 
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

const handleCountdown = ()=>{
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
  
    const time = new Date();
    const countdown = Math.ceil(startDate - time);
  
    const LoT = endDate.getTime() - startDate.getTime();
    document.getElementById('countDownUI').textContent = (Math.ceil(countdown / 8.64e7) + ' Days to go!');
    document.getElementById('lotUI').textContent = (LoT / 8.64e7 + ' Day trip.');
};

const handleDarkSky = (darkURL, darkAPI, time, daySinceStart)=>{
    const lat = document.getElementById('tempUI').textContent;
    const lng = document.getElementById('dateUI').textContent;
  
    _fetchDarkSky(darkURL, darkAPI, lat, lng, time)
    .then((data)=>{
        postInfo('/addDark', {weather: data.daily.data[0].icon, temperatureHigh: data.daily.data[0].temperatureHigh, temperatureLow: data.daily.data[0].temperatureLow})
    .then(
        updateDarkUI(daySinceStart)
    )
});
}
 
const _fetchPixabay = async(image)=>{
        const response = await fetch(`${pixabayURL}${pixabayAPIKey}&q=${image}`)
        try { 
            const pixdata = response.json();
            console.log(pixdata);
            return pixdata;
        } catch(error) {
            console.log('error', error)
        }
};
     
  

const dateDifference = (startDate, endDate) => {
    return endDate.getTime() - startDate.getTime();
  };

//unit converter
let fair = function(kelvin){ 
    return ((kelvin - 273.15) * 9/5 + 32);
}

})();

export { gen }
