let Days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let Months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let curmetmax = null;
let curmetmin = null;
let weatherid = null;
//icons?
let ids = [`01`, `02`, `03`, `04`, `09`, `10`, `11`, `13`, `50`];
let iconclass = [
  `fa-sun`,
  `fa-cloud-sun`,
  `fa-cloud-sun`,
  `fa-cloud`,
  `fa-cloud-rain`,
  `fa-cloud-rain`,
  `fa-cloud-bolt`,
  `fa-snowflake`,
  `fa-smog`,
];
function addingcurrenticon(wid) {
  let u = 0;
  let idindex = 0;
  let widtw = wid.slice(0, 2);
  while (u < 9) {
    if (widtw === ids[u]) {
      idindex = u;
      u = 9;
    } else {
      u = u + 1;
    }
  }
  let mainicon = document.querySelector(`#current-icon`);
  mainicon.removeAttribute("class");
  mainicon.classList.add(`fa-solid`);
  mainicon.classList.add(iconclass[idindex]);
}

//finds time and date
let now = new Date();
let weekday = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
let hour = now.getHours();
let mins = ("0" + now.getMinutes()).slice(-2);
let todaysday = Days[weekday];
let todaysmonth = Months[month];
let time = `${hour}:${mins}`;
let DDate = `${date}/${month + 1}/${year}`;
let Datee = document.querySelector("#date-time");
Datee.innerHTML = `Last updated: ${todaysday} - ${DDate}  ${time} `;

function changecity(l) {
  let cc = document.querySelector("#chosencity");
  cc.innerHTML = `${l}`;
}
//capatalize first letter
function capitalize(str) {
  if (str == null) {
    return str;
  }

  return str.substring(0, 1).toUpperCase() + str.substring(1);
}
//finding current temperature and location
function CurPosition(position) {
  let coords = [];
  coords.push(position.coords.latitude);
  coords.push(position.coords.longitude);
  let APIkey1 = "3ae5fb236870eefa55ebb52fb74c96e8";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${APIkey1}&units=metric`;
  axios.get(url).then(curtemp);
}

function curtemp(response) {
  curmetmax = response.data.main.temp_max;
  curmetmin = response.data.main.temp_min;
  weatherid = response.data.weather[0].icon;
  addingcurrenticon(weatherid);
  let tempma = Math.floor(curmetmax);
  let tempmi = Math.floor(curmetmin);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let description = response.data.weather[0].description;
  let place = response.data.name;
  changecity(place);
  let ct = document.querySelector("#currenttempmax");
  ct.innerHTML = `${tempma}`;
  let ctm = document.querySelector("#currenttempmin");
  ctm.innerHTML = ` / ${tempmi}`;
  let cwd = document.querySelector("li#description");
  let cth = document.querySelector("li#humid");
  let ctp = document.querySelector("li#wi");
  cwd.innerHTML = `${capitalize(description)}`;
  cth.innerHTML = `Humidity: ${humidity}%`;
  ctp.innerHTML = `Wind: ${wind} km/h`;
  celci.innerHTML = `??C`;
  faren.classList.add("active");
  faren.innerHTML = `??F`;
}
function curposbut() {
  navigator.geolocation.getCurrentPosition(CurPosition);
}
let button = document.querySelector("#clbut");
button.addEventListener("click", curposbut);
//changing metrics
let celcius = document.querySelector(`#celci`);
let faren = document.querySelector(`#faren`);
celcius.addEventListener("click", makecelci);
faren.addEventListener("click", makefaren);

function makefaren(event) {
  event.preventDefault();
  faren.classList.remove("active");
  celcius.classList.add("active");
  let farconmax = Math.floor((curmetmax * 9) / 5 + 32);
  let farconmin = Math.floor((curmetmin * 9) / 5 + 32);
  let toptemp = document.querySelector(`#currenttempmax`);
  let bottemp = document.querySelector(`#currenttempmin`);
  toptemp.innerHTML = `${farconmax}`;
  bottemp.innerHTML = ` / ${farconmin}`;
}
function makecelci(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  faren.classList.add("active");
  let toptemp = document.querySelector(`#currenttempmax`);
  let bottemp = document.querySelector(`#currenttempmin`);
  toptemp.innerHTML = `${Math.floor(curmetmin)}`;
  bottemp.innerHTML = ` / ${Math.floor(curmetmax)}`;
}
//finding searched city temp
function citie(event) {
  event.preventDefault();
  let input = document.querySelector("#City");
  let APIkey = "3ae5fb236870eefa55ebb52fb74c96e8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIkey}&units=metric`;
  axios.get(url).then(curtemp);
}

let form = document.querySelector("#pleasework");
form.addEventListener("submit", citie);
