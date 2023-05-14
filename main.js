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
