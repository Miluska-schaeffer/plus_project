
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Friday",
  "Saturday"
];


let months = [
"jan",
"feb",
'mar',
'apr',
'may',
'jun',
'jul',
'aug',
'set',
'oct',
'nov',
'dec'

];


function formatDate (timestamp) {
 let now = new Date(timestamp);
 let day = days[now.getDay()];
 let nowDate = now.getDate();
 let nowMonth = months[now.getMonth()];

 let nowYear = now.getFullYear();
 return `${day} <br> ${nowDate} ${nowMonth} ${nowYear}`;

}

function formatTime(timestamp) {
let now = new Date(timestamp);
let currentHour = now.getHours();
if(currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if(currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

 return `${currentHour}:${currentMinutes}`;
}
// function formatHours(timestamp) {
//   let now = new Date(timestamp);
// let currentHour = now.getHours();
// if(currentHour < 10) {
//   currentHour = `0${currentHour}`;
// }
// let currentMinutes = now.getMinutes();
// if(currentMinutes < 10) {
//   currentMinutes = `0${currentMinutes}`;
// }
//   return `${currentHour}:${currentMinutes}`;
// }

function displayTemperature(response) {
  // console.log(response);
  let h1Temperature = document.querySelector("#h1-temperature");
  let currentCountry = document.querySelector("#current-country");
  // console.log(currentCountry);
  let currentCity = document.querySelector("#currentcity-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#todays-date-text");
  let timeElement = document.querySelector("#city-time");
  let dayTime = response.data.dt * 1000;

  celsiusTemperature = response.data.main.temp;
  h1Temperature.innerHTML = `${Math.round(celsiusTemperature)}`;

  currentCity.innerHTML = `${response.data.name},`;
  currentCountry.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(dayTime);
  timeElement.innerHTML = formatTime(dayTime);

  //
  let iconElement = document.querySelector("#icon");
  let iconImg = response.data.weather[0].icon;
  iconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${iconImg}@2x.png`
  );
  iconElement.setAttribute(
    'alt',
     response.data.weather[0].description
  );

  document.body.style.backgroundImage = `url(imgs/${iconImg}@2x.png)`;

}

function displayForecast(response) {
      let forecastEl = document.querySelector("#forecast");
      forecastEl.innerHTML = null;
      let forecast = null;

  for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastEl.innerHTML += `
      <div class="col-2 text-center">
        <h4 class="forecast-times">
          ${formatTime(forecast.dt * 1000)}
        </h4>
        <img
          class="forecast-icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
        <div class="">
          <span class="forecast-times">
             ${Math.round(forecast.main.temp_max)}°/
          </span>
          <span class="forecast-times">
             ${Math.round(forecast.main.temp_min)}°
          </span>
        </div>
      </div>
  `;

  }
}


function search(city) {
  let apiKey = "214166bc4b81334cc7b642eccb7e6e84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // console.log(apiUrl);

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
 let cityInput = document.querySelector("#city-input");

 search(cityInput.value);
 }



// temp c/f conversions

function showFarenheitTemp(event) {
  event.preventDefault();
  let h1Temperature = document.querySelector("#h1-temperature");
// remove actvie class from celsois
celsiusLink.classList.remove("active");
farenheitLink.classList.add("active");
  let farenheitTemperature = (celsiusTemperature* 9 ) / 5 + 32;
  h1Temperature.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let h1Temperature = document.querySelector("#h1-temperature");
  h1Temperature.innerHTML = Math.round(celsiusTemperature);
}




let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",  handleSubmit);

let farenheitLink = document.querySelector("#farenheit-temp");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", showCelsiusTemp);





// default
search("berlin");

// fixed citites:
// berlin
function showBerlin(event) {
  event.preventDefault();
  search(berlin.innerHTML);
}
let berlin = document.querySelector("#berlin");
berlin.addEventListener("click", showBerlin);
// new york
function showNewYork(event) {
  event.preventDefault();
  search(newYork.innerHTML);
}
let newYork = document.querySelector("#new-york");
newYork.addEventListener("click", showNewYork);
// bogota
function showBogota(event) {
  event.preventDefault();
  search(bogota.innerHTML);
}
let bogota = document.querySelector("#bogota");
bogota.addEventListener("click", showBogota);
// paris
function showParis(event) {
  event.preventDefault();
  search(paris.innerHTML);
}
let paris = document.querySelector("#paris");
paris.addEventListener("click", showParis);
// los angeles
function showLA(event) {
  event.preventDefault();
  search(losAng.innerHTML);
}
let losAng = document.querySelector("#los-angeles");
losAng.addEventListener("click", showLA);


function searchLocation(position) {
  let apiKey = "214166bc4b81334cc7b642eccb7e6e84";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);


}

let locButton = document.querySelector("#currentloc-button");
locButton.addEventListener("click", getCurrentPosition);



