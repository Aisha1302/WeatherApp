
// ? ================== T  O  D  A  Y ================================

let todayName = document.getElementById("todayName");
let todayNumber = document.getElementById("todayNumber");
let todayMonth = document.getElementById("todayMonth");
let locationName = document.getElementById("location");
let todayTemp = document.getElementById("todayTemp");
let todayImg = document.getElementById("todayImg");
let todayWeather = document.getElementById("todayWeather");
let windHumidity = document.getElementById("windHumidity");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");

// ? ============= T  O  M  O  R  R  O  W ================================== 

let tomorrowName = document.getElementById("tomorrowName");
let tomorrowImg = document.getElementById("tomorrowImg");
let tomorrowMaxTemp = document.getElementById("tomorrowMaxTemp");
let tomorrowMinTemp = document.getElementById("tomorrowMinTemp");
let tomorrowWeather = document.getElementById("tomorrowWeather");

// ? ============= A  F  T  E  R     T  O  M  O  R  R  O  W ================== 

let afterTomorrowName = document.getElementById("afterTomorrowName");
let aftmImg = document.getElementById("afterTomorrowImg");
let aftmMaxTemp = document.getElementById("afterTomorrowMaxTemp");
let aftmMinTemp = document.getElementById("afterTomorrowMinTemp");
let aftmWeather = document.getElementById("afterTomorrowWeather");

// ? =========== S  E  A  R  C  H      I  N  P  U  T ========================

let search = document.getElementById("search");

search.addEventListener("input", function () {
    start(search.value);
});
async function getData(key) {
    let req = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=65d7abd7e1f94135a3e72058231508&q=${key}&days=7`);
    let weatherData = await req.json();
    return weatherData;
}

// ! ================== T  O  D  A  Y ==================================
function displayTodayData(data) {
    let today = new Date();
    todayName.innerHTML = today.toLocaleDateString("en-US", { weekday: "long" });
    todayMonth.innerHTML = today.toLocaleDateString("en-US", { month: "long" });
    todayNumber.innerHTML = today.getDate();

    locationName.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayImg.setAttribute("src", data.current.condition.icon);
    todayWeather.innerHTML = data.current.condition.text;
    windHumidity.innerHTML = data.current.humidity;
    windSpeed.innerHTML = data.current.wind_kph;
    windDirection.innerHTML = data.current.wind_dir;
}

// ! ================== T  O  M  O  R  R  O  W =============================
function displayTomorrowData(data) {
    let tomorrow = new Date(data.forecast.forecastday[1].date);
    tomorrowName.innerHTML = tomorrow.toLocaleDateString("en-US", { weekday: "long" });
    tomorrowImg.setAttribute("src", data.forecast.forecastday[1].day.condition.icon);
    tomorrowMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    tomorrowMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    tomorrowWeather.innerHTML = data.forecast.forecastday[1].day.condition.text;
}

// !=================== A  F  T  E  R     T  O  M  O  R  R  O  W =================
function displayAfterTomorrowData(data) {
    let aftTomorrow = new Date(data.forecast.forecastday[2].date);
    afterTomorrowName.innerHTML = aftTomorrow.toLocaleDateString("en-US", { weekday: "long" });
    aftmImg.setAttribute("src", data.forecast.forecastday[2].day.condition.icon);
    aftmMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    aftmMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    aftmWeather.innerHTML = data.forecast.forecastday[2].day.condition.text;
}

async function start(key = "cairo") {
    let weatherData = await getData(key);
    displayTodayData(weatherData);
    displayTomorrowData(weatherData);
    displayAfterTomorrowData(weatherData);
}

start();