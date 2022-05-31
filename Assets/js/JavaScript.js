var APIKey = "14bc867c043fde0bb3bdc169e6907127";
var city;
var cityEL = document.querySelector(".cityName");



function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser."); 
        cityEL.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var longetude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + longetude + "&lon=" + latitude + "&appid=" + APIKey;
    console.log(url);
    getWeather(url);
    return;
}

function getWeather (url) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        //get the temperature
        var temp = data.main.temp;
        var tempF = (temp * (9/5) - 459.67).toFixed(2);
        var tempEL = document.querySelector(".weatherTemp");
        tempEL.innerHTML = tempF + "&#8457;";
        // var temp = data.main.temp;
        // var tempEL = document.querySelector(".temp");
        // tempEL.innerHTML = temp;
        // var weather = data.weather[0].main;
        // var weatherEL = document.querySelector(".weather");
        // weatherEL.innerHTML = weather;
        // var icon = data.weather[0].icon;
        // var iconEL = document.querySelector(".icon");
        // iconEL.src = "http://openweathermap.org/img/w/" + icon + ".png";
    })
}

getCurrentLocation();