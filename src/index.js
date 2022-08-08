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

//let weatherid = ["01d", "02d", "03d", `04d`, `09d`, `10d`, `11d`, `13d`, `50d`];

//return weather id icon index

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

//sets next five days
let ind = [`a`, `b`, `c`, `d`, `e`];
let n = 1;
while (n < 6) {
  let i = weekday + n;
  let wday = Days[i];
  let cardindex = ind[n - 1];
  let daycard = document.querySelector(`#${cardindex}`);
  daycard.innerHTML = `Last updated: ${wday}`;
  n = n + 1;
}

function changecity(l) {
  let cc = document.querySelector("#chosencity");
  cc.innerHTML = `${l}`;
}

//finding current temperature and location
function CurPosition(position) {
  let coords = [];
  coords.push(position.coords.latitude);
  coords.push(position.coords.longitude);
  let APIkey = "3ae5fb236870eefa55ebb52fb74c96e8";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${APIkey}&units=metric`;
  axios.get(url).then(curtemp);
}
function curtemp(response) {
  let tempma = Math.floor(response.data.main.temp_max);
  let tempmi = Math.floor(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let pressure = response.data.main.pressure;
  //let condition = response.data.weather.icon;
  //let dex = weathericon(condition);
  //let bigicon = document.querySelector(`#bigicon`);
  //bigicon.innerHTML = `${dex}`;
  let place = response.data.name;
  changecity(place);
  let ct = document.querySelector("#currenttempmax");
  ct.innerHTML = `${tempma}°`;
  let ctm = document.querySelector("#currenttempmin");
  ctm.innerHTML = ` / ${tempmi}°`;
  let cth = document.querySelector(`li#humidity`);
  let ctp = document.querySelector(`li#pressure`);
  cth.innerHTML = `Humidity: ${humidity}`;
  ctp.innerHTML = `Pressure: ${pressure}`;
}
function curposbut() {
  navigator.geolocation.getCurrentPosition(CurPosition);
}
let button = document.querySelector("#clbut");
button.addEventListener("click", curposbut);

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

//icons?
//<i class="fa-solid fa-sun"></i> clear sky exactly 800
//<i class="fa-solid fa-cloud"></i> clouds 803 804
//<i class="fa-solid fa-cloud-rain"></i> shower rain 300 500
//<i class="fa-solid fa-snowflake"></i> snow 600
//<i class="fa-solid fa-cloud-sun"></i> scattered clouds 801 802 maybe ignore
//<i class="fa-solid fa-cloud-bolt"></i> thunder storm 200
//<i class="fa-solid fa-smog"></i> mist 700
