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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="forecast-day">${day}</div>
                <img src="img/sun-cloud.png" class="forecast-icon" />
                <div class="hi-low">
                  <span class="foreccast-temp-min">57°</span>
                  <span class="forecast-temp-max">72°</span>
                </div>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
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

function showCelciusTemperature(event) {
  event.preventDefault();
  let celciusTemp = (fahrenheitTemperature - 32) * (5 / 9);
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp-degree");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temp-degree");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheitTemp.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", newCity);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

search("Charleston");
displayForecast();

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
