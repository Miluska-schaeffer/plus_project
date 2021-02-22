
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
  //
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
  //
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

}


function handleSubmit(event) {
  event.preventDefault();
 let cityInput = document.querySelector("#city-input");

 search(cityInput.value);
 }



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",  handleSubmit);


// berlin
function showBerlin(event){
  event.preventDefault();
  let berlin = document.querySelector("#berlin");
  search(berlin.innerHTML);
}


 berlin.addEventListener("click", showBerlin );

// new york
function showNewYork(event){
  event.preventDefault();
  let newYork = document.querySelector("#new-york");
  search(newYork.innerHTML);
}


 newYork.addEventListener("click", showNewYork );

// bogota
function showBogota(event){
  event.preventDefault();
  let bogota = document.querySelector("#bogota");
  search(bogota.innerHTML);
}


 bogota.addEventListener("click", showBogota );

// paris
function showParis(event){
  event.preventDefault();
  let paris = document.querySelector("#paris");
  search(paris.innerHTML);
}


 paris.addEventListener("click", showParis );


// los angeles
function showLA(event){
  event.preventDefault();
  let losAng = document.querySelector("#los-angeles");
  search(losAng.innerHTML);
}


 losAng.addEventListener("click", showLA);



// default
search("lima");










