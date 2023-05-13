//Asks the user for their current location, returns longitude and latitude values
async function fetchData(latitude, longitude) {
    const apiKey = '16e5867aeca8a9ab08e5612a4596aed5';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}';

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          // Handle the response data from OpenWeatherMap API
          console.log(data);
          // Extract and use the desired weather information from the response
        } else {
          throw new Error('Error occurred while fetching data');
        }
      } catch (error) {
        // Handle any errors that occurred during the API request
        console.error('Error:', error);
      }
    }
    
    function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
    
      fetchData(latitude, longitude);
    }
    
    function errorCallback(error) {
      console.error('Error occurred while retrieving location:', error);
    }
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

