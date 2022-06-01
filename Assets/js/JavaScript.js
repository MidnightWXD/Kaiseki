var APIKey = "14bc867c043fde0bb3bdc169e6907127";
var city;
var cityEL = document.querySelector(".cityName");
var searchBtn = document.querySelector(".btn-search");

// Returns message if browser doesn't support geolocation
function geoError() {
    cityEL.innerHTML = "No location found";
}
// Gets current location
function showPosition(position) {
    var longetude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var urlForecast  = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude
     + "&lon=" + longetude + "&exclude=hourly,minutely" + "&appid=" + APIKey;
    
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude
    + "&lon=" + longetude + "&appid=" + APIKey; 
    
    getWeather(url, urlForecast);
}
// Gets weather data from API
function getWeather (url, urlForecast) {
    fetch(urlForecast )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var uvIndex = data.current.uvi;
        var uvIndexEL = document.querySelector(".uvIndex");
        uvIndexEL.innerHTML = "UV INDEX: " + uvIndex;
        for(var i = 1; i < 6; i++) {
            var forecast = data.daily[i];
            var forecastDate = new Date(forecast.dt * 1000);
            forecastDate = forecastDate.toLocaleDateString();
            var forecastTemp = forecast.temp.day;
            var forecastTempF = (forecastTemp * (9/5) - 459.67).toFixed(2);
            var forecastIcon = forecast.weather[0].icon;
            var forecastWind = forecast.wind_speed;
            var forecastHumidity = forecast.humidity;
            var forecastIconURL = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
            var forecastELDate = document.querySelector(".day" + i);
            var forecastIconEL = document.querySelector(".icon" + i);
            var forecastTempEL = document.querySelector(".temp" + i);
            var forecastWindEL = document.querySelector(".wind" + i);
            var forecastHumidityEL = document.querySelector(".humidity" + i);
            
            forecastELDate.innerHTML = forecastDate;
            
            forecastIconEL.setAttribute("src", forecastIconURL);
            
            forecastTempEL.innerHTML = "Temp: " + forecastTempF + "&#8457;";
            
            forecastWindEL.innerHTML = "Wind: " + forecastWind + " mph";
            
            forecastHumidityEL.innerHTML = "Humidity: " + forecastHumidity + "%";
        }
    })
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var date = moment();
        var dateString = date.format("M/D/YYYY");
        var currentPosition = data.name;
        cityEL.innerHTML = currentPosition + " " + "(" + dateString + ")";
        var iconEL = document.createElement("img");
        iconEL.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        cityEL.append(iconEL);
        var temp = data.main.temp;
        var tempF = (temp * (9/5) - 459.67).toFixed(2);
        var tempEL = document.querySelector(".weatherTemp");
        tempEL.innerHTML = "TEMP: " + tempF + "&#8457;";
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var windSpeedEL = document.querySelector(".windSpeed");
        windSpeedEL.innerHTML = "WIND SPEED: " + windSpeed + " MPH";
        var humidityEL = document.querySelector(".humidity");
        humidityEL.innerHTML = "HUMIDITY: " + humidity + "%";
  
    })
}
navigator.geolocation.getCurrentPosition(showPosition, geoError);

searchBtn.addEventListener("click", function() {
    city = document.querySelector("#city").value;
    localStorage.setItem("city", city);
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        var lat = data.lat;
        var lon = data.lon;
        var urlForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat
        + "&lon=" + lon + "&exclude=hourly,minutely" +  "&appid=" + APIKey;
        // getWeather(url, urlForecast);
    })
});

