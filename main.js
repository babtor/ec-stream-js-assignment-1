let apiKey = "e79a4558d37f0ddb584eb4a4854fb14b";

function fetchedListData() {
  fetch("city_list.json")
    .then((response) => response.json())
    .then((data) => {
      createOptionsList(data);

      function createOptionsList(data) {
        let select = document.getElementById("cities");

        data.forEach((item) => {
          let option = document.createElement("option");
          option.value = [item.lat, item.lng];
          option.textContent = item.city;
          option.locationName = item.city;
          select.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function fetchedData() {
  let selectedValue = document.getElementById("cities").value;
  let latitude, longitude;

  const selectedCoordinates = selectedValue.split(",");
  const selectedLatitude = selectedCoordinates[0];
  const selectedLongitude = selectedCoordinates[1];
  latitude = selectedLatitude;
  longitude = selectedLongitude;

  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      clearData();

      addWeather(data);
      addTemperature(data);
      addLocation();
      timeDisplay();
      setInterval(timeDisplay, 1000);
    })

    .catch((error) => {
      console.error("Error:", error);
    });
}

function clearData() {
  let locationElement = document.getElementById("location");
  locationElement.textContent = "";

  let tempElement = document.getElementById("temp");
  tempElement.textContent = "";

  let pressureElement = document.getElementById("pres");
  pressureElement.textContent = "";

  let humidityElement = document.getElementById("humi");
  humidityElement.textContent = "";

  let windElement = document.getElementById("wind");
  windElement.textContent = "";

  let weatherElement = document.getElementById("weatherText");
  weatherElement.textContent = "";
}

function addLocation() {
  let selectedOption = document.getElementById("cities").selectedOptions[0];
  let locationName = selectedOption.locationName;
  let location = document.getElementById("location");
  location.textContent = locationName;
}

function addTemperature(data) {
  let temperature = data.main.temp;
  let temperatureTextNode = document.createTextNode(
    Math.floor(temperature) + "°C"
  );
  let tempDiv = document.getElementById("temp");
  tempDiv.appendChild(temperatureTextNode);

  let pressure = data.main.pressure;
  let pressureTextNode = document.createTextNode(
    "Current pressure: " + pressure + " hPa"
  );
  let pressureDiv = document.getElementById("pres");
  pressureDiv.appendChild(pressureTextNode);

  let humidity = data.main.humidity;
  let humidityTextNode = document.createTextNode("Humidity: " + humidity + "%");
  let humidityDiv = document.getElementById("humi");
  humidityDiv.appendChild(humidityTextNode);

  let wind = data.wind.speed;
  let windTextNode = document.createTextNode("Wind strength: " + wind + " M/S");
  let windDiv = document.getElementById("wind");
  windDiv.appendChild(windTextNode);
}

function addWeather(data) {
  let weatherIcons = {
    "01d": "https://openweathermap.org/img/wn/01d@4x.png",
    "01n": "https://openweathermap.org/img/wn/01n@4x.png",
    "02d": "https://openweathermap.org/img/wn/02d@4x.png",
    "02n": "https://openweathermap.org/img/wn/02nd@4x.png",
    "03d": "https://openweathermap.org/img/wn/03d@4x.png",
    "03n": "https://openweathermap.org/img/wn/03n@4x.png",
    "04d": "https://openweathermap.org/img/wn/04d@4x.png",
    "04n": "https://openweathermap.org/img/wn/04n@4x.png",
    "09d": "https://openweathermap.org/img/wn/09d@4x.png",
    "09n": "https://openweathermap.org/img/wn/09n@4x.png",
    "10d": "https://openweathermap.org/img/wn/10d@4x.png",
    "10n": "https://openweathermap.org/img/wn/10n@4x.png",
    "11d": "https://openweathermap.org/img/wn/11d@4x.png",
    "11n": "https://openweathermap.org/img/wn/11n@4x.png",
    "13d": "https://openweathermap.org/img/wn/13d@4x.png",
    "13n": "https://openweathermap.org/img/wn/13n@4x.png",
    "50d": "https://openweathermap.org/img/wn/50d@4x.png",
    "50n": "https://openweathermap.org/img/wn/50n@4x.png",
  };

  let weatherCode = data.weather[0]["icon"];
  let weatherIcon = weatherIcons[weatherCode];
  let displayedIcon = document.getElementById("weatherImg");
  displayedIcon.src = weatherIcon;

  let weatherData = data.weather[0]["main"];
  let weatherTextNode = document.createTextNode(weatherData);
  let weatherDiv = document.getElementById("weatherText");
  weatherDiv.appendChild(weatherTextNode);
}

function timeDisplay() {
  let today = new Date();
  let hours = today.getHours().toString().padStart(2, "0");
  let minutes = today.getMinutes().toString().padStart(2, "0");
  let seconds = today.getSeconds().toString().padStart(2, "0");
  let year = today.getFullYear().toString().padStart(2, "0");
  let month = today.getMonth().toString().padStart(2, "0");
  let day = today.getDate().toString().padStart(2, "0");

  let currentDate = year + "-" + month + "-" + day;
  let time = hours + ":" + minutes + ":" + seconds;
  let timeDiv = document.getElementById("clock");
  let dateDiv = document.getElementById("dates");
  dateDiv.textContent = currentDate;
  timeDiv.textContent = time;
}

fetchedListData();
fetchedData();

setInterval(fetchedData, 30 * 60 * 1000);
