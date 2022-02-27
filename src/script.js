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

function formatSuntimeDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes} CET`;
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
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  sunriseElement.innerHTML = formatSuntimeDate(
    response.data.sys.sunrise * 1000
  );
  sunsetElement.innerHTML = formatSuntimeDate(response.data.sys.sunset * 1000);
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
    <img src="media/chilly.gif" class="weatherTypeGif" alt="snow" />`;
  } else if (weatherType === "Rain") {
    weatherTypeElement.innerHTML = `
    <img src="media/rain.gif" class="weatherTypeGif" alt="rain" />`;
  } else if (weatherType === "Drizzle") {
    weatherTypeElement.innerHTML = `
    <img src="media/drizzle.gif" class="weatherTypeGif" alt="drizzle" />`;
  } else if (weatherType === "Thunderstorm") {
    weatherTypeElement.innerHTML = `
    <img src="media/thunderstorm.gif" class="weatherTypeGif" alt="thunderstorm" />`;
  } else if (weatherType === "Clear") {
    weatherTypeElement.innerHTML = `
    <img src="media/clearsky.gif" class="weatherTypeGif" alt="clear" />`;
  } else if (weatherType === "Mist") {
    weatherTypeElement.innerHTML = `
    <img src="media/mist.gif" class="weatherTypeGif" alt="mist"  />`;
  } else if (weatherType === "Fog") {
    weatherTypeElement.innerHTML = `
    <img src="media/fog.gif" class="weatherTypeGif" alt="fog"  />`;
  } else if (weatherType === "smoke") {
    weatherTypeElement.innerHTML = `
    <img src="media/smoke.gif" class="weatherTypeGif" alt="smoke"  />`;
  } else if (weatherType === "Haze") {
    weatherTypeElement.innerHTML = null;
  } else if (weatherType === "Dust") {
    weatherTypeElement.innerHTML = `
    <img src="media/dust.gif" class="weatherTypeGif" alt="dust"  />`;
  } else if (weatherType === "Sand") {
    weatherTypeElement.innerHTML = `
    <img src="media/sand.gif" class="weatherTypeGif" alt="sand"  />`;
  } else if (weatherType === "Ash") {
    weatherTypeElement.innerHTML = `
    <img src="media/ash.gif" class="weatherTypeGif" alt="ash"  />`;
  } else if (weatherType === "Squall") {
    weatherTypeElement.innerHTML = `
    <img src="media/squall.gif" class="weatherTypeGif" alt="squall"  />`;
  } else if (weatherType === "Tornado") {
    weatherTypeElement.innerHTML = `
    <img src="media/tornado.gif" class="weatherTypeGif" alt="tornado"  />`;
  } else if (weatherType === "Clouds") {
    weatherTypeElement.innerHTML = `<img src="media/clouds.gif" class="weatherTypeGif" alt="clouds"  />`;
  }
}

function showColoredCityNames(response) {
  let specialCity = response.data.sys.name;
  let specialCityElement = document.querySelector("#city");
  if (specialCity === "Paris") {
    specialCityElement.innerHTML = `
    RED`;
  } else if (specialCity === "Paris") {
    specialCityElement.innerHTML = `
    RED`;
  }
}

function search(city) {
  let apiKey = "ceb455b9c7b642371d7b3ed2d734c15b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(getWeatherGif);
  axios.get(apiUrl).then(showColoredCityNames);
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
