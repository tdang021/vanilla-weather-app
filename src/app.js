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

console.log(new Date());
