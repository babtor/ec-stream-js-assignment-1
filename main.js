    let apiKey = '16e5867aeca8a9ab08e5612a4596aed5';
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={apiKey}';

    fetch(apiUrl)
    .then(response => response.json)
    .then(data => {
        console.log(data);
    })

    .catch(error => {
        // Handle any errors that occurred during the API request
        console.error('Error:', error);
      });

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    }

    function errorCallback(error) {
        console.error('Error occurred while retrieving location:', error);
      }
