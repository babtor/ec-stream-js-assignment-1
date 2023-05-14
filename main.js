let apiKey = 'e79a4558d37f0ddb584eb4a4854fb14b';


function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let units = 'metric';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.body.onload = addLocation;
      document.body.onload = addTemperature;
      document.body.onload = addWeather;

      function addLocation() {
      let locationName = document.createTextNode(data.name);
      let location = document.getElementById("location");
      location.appendChild(locationName);
      }

      function addTemperature() {
        let temperature = data.main.temp
        let temperatureTextNode = document.createTextNode(temperature);
        let tempdiv = document.getElementById("temp");
        tempdiv.appendChild(temperatureTextNode);  
      }

      function addWeather() {
        let weatherIcons = {
          '01d': 'https://openweathermap.org/img/wn/01d@2x.png',
          '01n': 'https://openweathermap.org/img/wn/01n@2x.png',
          '02d': 'https://openweathermap.org/img/wn/02d@2x.png',
          '02n': 'https://openweathermap.org/img/wn/02nd@2x.png',
          '03d': 'https://openweathermap.org/img/wn/03d@2x.png',
          '03n': 'https://openweathermap.org/img/wn/03n@2x.png',
          '04d': 'https://openweathermap.org/img/wn/04d@2x.png',
          '04n': 'https://openweathermap.org/img/wn/04n@2x.png',
          '09d': 'https://openweathermap.org/img/wn/09d@2x.png',
          '09n': 'https://openweathermap.org/img/wn/09n@2x.png',
          '10d': 'https://openweathermap.org/img/wn/10d@2x.png',
          '10n': 'https://openweathermap.org/img/wn/10n@2x.png',
          '11d': 'https://openweathermap.org/img/wn/11d@2x.png',
          '11n': 'https://openweathermap.org/img/wn/11n@2x.png',
          '13d': 'https://openweathermap.org/img/wn/13d@2x.png',
          '13n': 'https://openweathermap.org/img/wn/13n@2x.png',
          '50d': 'https://openweathermap.org/img/wn/50d@2x.png',
          '50n': 'https://openweathermap.org/img/wn/50n@2x.png'
        };
        let weatherCode = data.weather[0]["icon"];
        let weatherIcon = weatherIcons[weatherCode];
        let displayedIcon = document.getElementById("weatherImg");
        displayedIcon.src = weatherIcon;
        let weatherData = data.weather[0]["main"];
        let weatherTextNode = document.createTextNode(weatherData);
        let weatherDiv = document.getElementById("weather");
        weatherDiv.appendChild(weatherTextNode);
      }
      addWeather();
      addTemperature();
      addLocation();

    })

    .catch(error => {
      console.error('Error:', error);
    });

}

function errorCallback(error) {
  console.error('Error occurred while retrieving location:', error);
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
