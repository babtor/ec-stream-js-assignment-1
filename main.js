fetch('https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid={16e5867aeca8a9ab08e5612a4596aed5}');
fetch('http://api.openweathermap.org/geo/1.0/direct?q=Stockholm,SWE&appid=16e5867aeca8a9ab08e5612a4596aed5')



//Asks the user for their current location, returns longitude and latitude values
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
function successCallback(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(latitude);
    console.log(longitude);
}
function errorCallback(error) {
    console.error('Error occurred while retrieving location:', error);
  }