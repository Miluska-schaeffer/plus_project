// day & date
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Friday",
  "Saturday"
];

// let now = new Date();

// let day = days[now.getDay()];

// let nowDate = now.getDate();
// let nowMonth = now.getMonth();
// let nowYear = now.getFullYear();

// let htmlElement = document.querySelector("#todays-date-text");
// htmlElement.innerHTML = `${day} ${nowDate}.${nowMonth + 1}.${nowYear}`;

// // hour
// let currentHour = now.getHours();
// let currentMinutes = now.getUTCMinutes();

// let cityTimeHtml = document.querySelector("#city-time");

// cityTimeHtml.innerHTML = `${currentHour}:${currentMinutes}`;

// // search
// function addCitySearch(event) {
//   event.preventDefault();
//   let searchValue = document.querySelector("#search_query");
//   let currentCity = document.querySelector("#currentcity-name");
//   currentCity.innerHTML = `${searchValue.value}`;
// }

// let searchForm = document.querySelector("#search-form");
// searchForm.addEventListener("submit", addCitySearch);

// bonus
// find the h1 element with the temp
// let h1Temperature = document.querySelector("#h1-temperature");
//  create func from celsius to f
// function goCelsiustoF(event) {
//   event.preventDefault();
//   h1Temperature.innerHTML = "19°";
// }

// find the a element and create a clic event
// let celsiusTemp = document.querySelector("a#celsius-temp");
// celsiusTemp.addEventListener("click", goCelsiustoF);

// // small functioon to go from celsius to farenheit
// function toFarenheit(celsius) {
//   let fahrenheit = (celsius * 9) / 5 + 32;
//   return Math.floor(fahrenheit);
// }

// // repeat steps from faren to celsius
// function goFarehtoC(event) {
//   event.preventDefault();
//   h1Temperature.innerHTML = `${toFarenheit(19)}°`;
// }

// let farenhTemp = document.querySelector("#farenheit-temp");
// farenhTemp.addEventListener("click", goFarehtoC);


// console.log(Object.keys(weather)[0].temp);

// // `It is currently ${Math.temp.round} (66°F) in Paris with a humidity of 80%"


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
 return `${day} ${nowDate}.${nowMonth}.${nowYear}`;

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


function displayTemperature(response) {
  let h1Temperature = document.querySelector("#h1-temperature");
  h1Temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;

}



function displayRelatedInfo(response) {
  // console.log(response.data);
  let currentCity = document.querySelector("#currentcity-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#todays-date-text");

  let timeElement = document.querySelector("#city-time");


  let dayTime = response.data.dt * 1000;

  currentCity.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(dayTime);
  timeElement.innerHTML = formatTime(dayTime);
}

function displayIcon(response){
  let iconElement = document.querySelector("#icon");
  let iconImg = response.data.weather[0].icon;
  iconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${iconImg}@2x.png`
  );
  iconElement.setAttribute(
    'alt',
     response.data.weather[0].description
  );
}

function search(city) {
  let apiKey = "214166bc4b81334cc7b642eccb7e6e84";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
  axios.get(apiUrl).then(displayRelatedInfo);
  axios.get(apiUrl).then(displayIcon);

}


function handleSubmit(event) {
  event.preventDefault();
 let cityInput = document.querySelector("#city-input");

 search(cityInput.value);
 }


search("lima");



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",  handleSubmit);


// berlin
function showBerlin(event){
  event.preventDefault();
  let berlin = document.querySelector("#berlin");
  search(berlin.innerHTML);
}


 berlin.addEventListener('click', showBerlin );

// // new york
// function showNewYork(event){
//   event.preventDefault();
//   let newYork = document.querySelector("#new-york");
//   search(newYork.innerHTML);
// }


//  newYork.addEventListener('click', showNewYork );

// bogota
function showBogota(event){
  event.preventDefault();
  let bogota = document.querySelector("#bogota");
  search(bogota.innerHTML);
}


 bogota.addEventListener('click', showBogota );

// paris
function showParis(event){
  event.preventDefault();
  let paris = document.querySelector("#paris");
  search(paris.innerHTML);
}


 paris.addEventListener('click', showParis );


// los angeles
function showLA(event){
  event.preventDefault();
  let losAng = document.querySelector("#los-angeles");
  search(losAng.innerHTML);
}


 losAng.addEventListener('click', showLA);















