let currentDate = document.querySelector("#date");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = String(now.getHours()).padStart(2, "0");
let minute = now.getMinutes();

currentDate.innerHTML = `${day}, ${month} ${date} ${hour}:${minute}`;

function formatDay(timestamp) {
  let dates = new Date(timestamp * 1000);
  let day = dates.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let tempMax = Math.round(forecastDay.temperature.maximum);
    let tempMin = Math.round(forecastDay.temperature.minimum);
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-day">${formatDay(forecastDay.time)}</div>

                <img src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  forecastDay.condition.icon
                }.png" 
                alt="forecast icon"
                width = "45px"/>
                <div class="hi-low">
                  <span class="forecast-temp-min"> ${tempMin}° </span>
                  <span class="forecast-temp-max"> <strong>${tempMax}°</strong> </span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7a6tfo3aa33dcf22944a8db00a0bf65c";
  let ApiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=imperial`;
  axios.get(ApiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp-degree");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "91d9a2c92e23f81f6af46fe1bf68b707";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function newCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  search(cityInput.value);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", newCity);

search("Charleston");

function changeLocalTemp(event) {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    function changeLocalCity(response) {
      let changeCurrentCity = document.querySelector("#city");
      changeCurrentCity.innerHTML = response.data[0].name;
    }
    let apiKey = "91d9a2c92e23f81f6af46fe1bf68b707";
    let locationApiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.get(locationApiUrl).then(changeLocalCity);
    function showCurrentLocationTemp(response) {
      let currentLocationTemp = Math.round(response.data.main.temp);
      let currentLocalTemp = document.querySelector("#temp-degree");
      currentLocalTemp.innerHTML = `${currentLocationTemp}`;
    }

    let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    axios.get(currentApiUrl).then(showCurrentLocationTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", changeLocalTemp);
