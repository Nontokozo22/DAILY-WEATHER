function updateWeather(response){
    let currentTemperatureElement = document.querySelector("#current-weather-temperature")
    let temperature = response.data.temperature.current
    let cityElement = document.querySelector("#city");
    let weatherConditionElement = document.querySelector("#weather-condition")
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let icon = document.querySelector("#weatherIcon");
    let date = new Date(response.data.time * 1000);
    let currentTime = document.querySelector("#time")
console.log(response.data)
   cityElement.innerHTML = response.data.city;
   currentTemperatureElement.innerHTML=Math.round(temperature);
   weatherConditionElement.innerHTML = response.data.condition.description
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`
   windElement.innerHTML=`${response.data.wind.speed}km/h`;
   icon.innerHTML = `<img src="${response.data.condition.icon_url}" class= "weather-icon"/>`;
   currentTime.innerHTML = formatDate(date); 
   
   fetchForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];

    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes},`;
}

function searchCity(city){
let apiKey = "fee5e0t01bad61o3ad3a4130f72ea73d";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    searchCity(searchInput.value);
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days =["Sun","Mon","Tue", "Wed", "Thur", "Fri", "Sat"];
    
    return days[date.getDay()];
}

function fetchForecast(city){
    let apiKey = "fee5e0t01bad61o3ad3a4130f72ea73d"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast)

}

function displayForecast(response){


let forecastHtml = "";

response.data.daily.forEach(function (day, index){

    if (index < 5) {
    forecastHtml = 
    forecastHtml +
 `
 <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div class="forecast-icon">
        <img src="${day.condition.icon_url}"/></div>
        <div class="forecast-temperatures">
         <div class="forecast-temperature"> 
         <strong>${Math.round(day.temperature.maximum)}°</strong> 
         </div>
         <div class="forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
         </div>
         </div>
         `;
           }
    });

let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchformElement = document.querySelector("#search-form")
searchformElement.addEventListener("submit", handleSearchSubmit)
 

searchCity("Durban")