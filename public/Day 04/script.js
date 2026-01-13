// DOM
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherData = document.getElementById("weatherData");
const errorMsg = document.getElementById("errorMsg");
const loader = document.getElementById("loader");
const suggestionsBox = document.getElementById("suggestions");

// Weather fields
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const weatherIcon = document.getElementById("weatherIcon");
const feelsLike = document.getElementById("feelsLike");
const uvIndex = document.getElementById("uvIndex");
const visibility = document.getElementById("visibility");

// Events
searchBtn.addEventListener("click", searchCity);
cityInput.addEventListener("keydown", e => e.key === "Enter" && searchCity());

// UI helpers
function showLoader() {
    loader.style.display = "block";
    errorMsg.style.display = "none";
    weatherData.classList.add("hidden");
}

function showError(msg) {
    loader.style.display = "none";
    errorMsg.textContent = msg;
    errorMsg.style.display = "block";
}

function searchCity() {
    const city = cityInput.value.trim();
    if (!city) return;
    getCityCoordinates(city);
}

// Fetch city coordinates
async function getCityCoordinates(city) {
    showLoader();
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const res = await fetch(url);
        const data = await res.json();
        if (!data.results) throw new Error();

        const { latitude, longitude, name, country } = data.results[0];
        fetchWeather(latitude, longitude, name, country);
    } catch {
        showError("City not found");
    }
}

// Fetch weather
async function fetchWeather(lat, lon, name, country) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,uv_index,visibility`;
        const res = await fetch(url);
        const data = await res.json();

        const time = new Date().toISOString().slice(0, 13) + ":00";
        const index = data.hourly.time.indexOf(time) || 0;

        const info = getWeatherInfo(data.current_weather.weathercode);

        cityName.textContent = `${name}, ${country}`;
        temperature.textContent = Math.round(data.current_weather.temperature);
        condition.textContent = info.description;
        weatherIcon.innerHTML = info.icon;
        windSpeed.textContent = `${data.current_weather.windspeed} km/h`;
        humidity.textContent = `${data.hourly.relativehumidity_2m[index]}%`;
        feelsLike.textContent = `${Math.round(data.hourly.apparent_temperature[index])}°C`;
        uvIndex.textContent = data.hourly.uv_index[index];
        visibility.textContent = `${(data.hourly.visibility[index] / 1000).toFixed(1)} km`;

        document.body.dataset.weather = data.current_weather.weathercode;

        loader.style.display = "none";
        weatherData.classList.remove("hidden");

        localStorage.setItem("lastCity", name);
    } catch {
        showError("Failed to load weather");
    }
}

// Weather icons
function getWeatherInfo(code) {
    const map = {
        0: { description: "Clear Sky", icon: "<i class='fas fa-sun'></i>" },
        1: { description: "Mostly Clear", icon: "<i class='fas fa-cloud-sun'></i>" },
        2: { description: "Partly Cloudy", icon: "<i class='fas fa-cloud-sun'></i>" },
        3: { description: "Overcast", icon: "<i class='fas fa-cloud'></i>" },
        45:{ description: "Fog", icon: "<i class='fas fa-smog'></i>" },
        61:{ description: "Rain", icon: "<i class='fas fa-cloud-rain'></i>" },
        71:{ description: "Snow", icon: "<i class='fas fa-snowflake'></i>" },
        95:{ description: "Thunderstorm", icon: "<i class='fas fa-bolt'></i>" }
    };
    return map[code] || { description: "Unknown", icon: "<i class='fas fa-question'></i>" };
}

// Autocomplete
function debounce(fn, delay = 400) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
    };
}

async function fetchSuggestions(query) {
    if (query.length < 2) {
        suggestionsBox.style.display = "none";
        return;
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    const res = await fetch(url);
    const data = await res.json();

    suggestionsBox.innerHTML = "";
    if (!data.results) return;

    suggestionsBox.style.display = "block";
    data.results.forEach(city => {
        const div = document.createElement("div");
        div.textContent = `${city.name}, ${city.country}`;
        div.onclick = () => {
            cityInput.value = city.name;
            suggestionsBox.style.display = "none";
            getCityCoordinates(city.name);
        };
        suggestionsBox.appendChild(div);
    });
}

cityInput.addEventListener("input", debounce(e => fetchSuggestions(e.target.value)));

const lastCity = localStorage.getItem("lastCity");
if (lastCity) getCityCoordinates(lastCity);
