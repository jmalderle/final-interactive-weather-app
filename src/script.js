function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Funday! Ehh… Sunday!",
    "Monday, have a grreat start!",
    "Tiddely-Tuesday!",
    "pheeew, already Wednesday!",
    "Thurssssday",
    "finally Friday!",
    "another sweet Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} CET`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `           
    <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                     <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">${Math.round(
                      forecastDay.temp.max
                    )}° </span>
                    <span class="weather-forecast-temperature-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;

  let apiKey = "ceb455b9c7b642371d7b3ed2d734c15b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getWeatherGif(response) {
  let weatherType = response.data.weather[0].main;
  let weatherTypeElement = document.querySelector("#weatherTypeGif");
  if (weatherType === "Snow") {
    weatherTypeElement.innerHTML = `
    <img src="media/chilly.gif" class="weatherTypeGif" alt="chilly" width="200" />`;
  } else if (weatherType === "Rain") {
    weatherTypeElement.innerHTML = `
    <img src="media/rain.gif" class="weatherTypeGif" alt="chilly" width="200" />`;
  } else if (weatherType === "Thunderstorm") {
    weatherTypeElement.innerHTML = `
    <img src="media/thunderstorm.gif" class="weatherTypeGif" alt="chilly" width="200" />`;
  } else if (weatherType === "Clear") {
    weatherTypeElement.innerHTML = `
    <img src="media/clearsky.gif" class="weatherTypeGif" alt="chilly" width="200" />`;
  }
}

function search(city) {
  let apiKey = "ceb455b9c7b642371d7b3ed2d734c15b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(getWeatherGif);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Berlin");
