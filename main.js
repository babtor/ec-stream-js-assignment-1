let apiKey = 'e79a4558d37f0ddb584eb4a4854fb14b';


function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      document.body.onload = addElement;
      function addElement() {
      const locationName = document.createTextNode(data.name);
      let location = document.getElementById("location");
      location.appendChild(locationName);
      }
      addElement();

    })
    .catch(error => {
      console.error('Error:', error);
    });

}

function errorCallback(error) {
  console.error('Error occurred while retrieving location:', error);
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
