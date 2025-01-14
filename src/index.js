function updateWeather(response){
    let currentTemperatureElement = document.querySelector("#current-weather-temperature")
   let temperature = response.data.temperature.current
     let cityElement = document.querySelector("#weather-app-city");
    
     cityElement.innerHTML = response.data.city;
   currentTemperatureElement.innerHTML=Math.round(temperature)
}

function searchCity(city){
let apiKey = "fee5e0t01bad61o3ad3a4130f72ea73d";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   
    searchCity(searchInput.value)
}

let searchformElement = document.querySelector("#search-form")
searchformElement.addEventListener("submit", handleSearchSubmit)