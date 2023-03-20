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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp-degree");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "91d9a2c92e23f81f6af46fe1bf68b707";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Charleston&limit=5&appid=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemperature);
