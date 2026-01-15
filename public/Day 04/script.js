
// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherData = document.getElementById('weatherData');
const errorMsg = document.getElementById('errorMsg');
const loader = document.getElementById('loader');

// Elements to update
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('weatherIcon');
const feelsLike = document.getElementById('feelsLike');
const uvIndex = document.getElementById('uvIndex');
const visibility = document.getElementById('visibility');

const suggestionsBox = document.getElementById('suggestions');

// ===================== EVENTS =====================

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (!city) {
        errorMsg.textContent = "Please enter a city name";
        errorMsg.style.display = "block";
        return;
    }
    getCityCoordinates(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (!city) return;
        getCityCoordinates(city);
    }
});

// ===================== API LOGIC =====================

// Step 1: Get coordinates
async function getCityCoordinates(city) {
    weatherData.classList.add('hidden');
    errorMsg.style.display = 'none';
    loader.style.display = 'block';

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        if (!geoResponse.ok) {
            throw new Error("Failed to fetch city coordinates");
        }
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude, name, country } = geoData.results[0];
        getWeather(latitude, longitude, name, country);
    } catch (error) {
        loader.style.display = 'none';
        errorMsg.textContent = "City not found. Try again.";
        errorMsg.style.display = 'block';
    }
}

// Step 2: Get weather
async function getWeather(lat, lon, name, country) {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,uv_index,visibility`;
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();

        const currentHour = new Date().toISOString().slice(0, 13) + ":00";
        const hourIndex = data.hourly.time.indexOf(currentHour);
        const index = hourIndex !== -1 ? hourIndex : 0;

        cityName.textContent = `${name}, ${country}`;
        temperature.textContent = Math.round(data.current_weather.temperature);
        windSpeed.textContent = `${data.current_weather.windspeed} km/h`;
        humidity.textContent = `${data.hourly.relativehumidity_2m[index]}%`;
        feelsLike.textContent = `${Math.round(data.hourly.apparent_temperature[index])}°C`;
        uvIndex.textContent = data.hourly.uv_index[index];
        visibility.textContent = `${data.hourly.visibility[index] / 1000} km`;

        const code = data.current_weather.weathercode;
        const weatherInfo = getWeatherInfo(code);

        condition.textContent = weatherInfo.description;
        weatherIcon.innerHTML = weatherInfo.icon;

        loader.style.display = 'none';
        weatherData.classList.remove('hidden');
    } catch (error) {
        loader.style.display = 'none';
        errorMsg.textContent = "Error fetching weather data.";
        errorMsg.style.display = 'block';
    }
}

// ===================== WEATHER CODE MAP =====================

function getWeatherInfo(code) {
    const weatherCodes = {
        0: { description: "Clear Sky", icon: "<i class='fas fa-sun'></i>" },
        1: { description: "Mainly Clear", icon: "<i class='fas fa-cloud-sun'></i>" },
        2: { description: "Partly Cloudy", icon: "<i class='fas fa-cloud-sun'></i>" },
        3: { description: "Overcast", icon: "<i class='fas fa-cloud'></i>" },
        45: { description: "Fog", icon: "<i class='fas fa-smog'></i>" },
        48: { description: "Rime Fog", icon: "<i class='fas fa-smog'></i>" },
        51: { description: "Light Drizzle", icon: "<i class='fas fa-cloud-rain'></i>" },
        61: { description: "Rain", icon: "<i class='fas fa-cloud-rain'></i>" },
        71: { description: "Snow", icon: "<i class='fas fa-snowflake'></i>" },
        80: { description: "Rain Showers", icon: "<i class='fas fa-cloud-sun-rain'></i>" },
        95: { description: "Thunderstorm", icon: "<i class='fas fa-bolt'></i>" }
    };

    return weatherCodes[code] || {
        description: "Unknown Weather",
        icon: "<i class='fas fa-question'></i>"
    };
}

// ===================== AUTOCOMPLETE =====================

function debounce(fn, delay = 400) {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

async function fetchSuggestions(query) {
    if (query.length < 2) {
        suggestionsBox.style.display = "none";
        return;
    }

    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.results) {
            suggestionsBox.style.display = 'none';
            return;
        }

        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'block';

        data.results.forEach(city => {
            const div = document.createElement('div');
            div.textContent = `${city.name}, ${city.country}`;
            div.style.padding = '12px 16px';
            div.style.cursor = 'pointer';

            div.addEventListener('click', () => {
                cityInput.value = city.name;
                suggestionsBox.style.display = 'none';
                getCityCoordinates(city.name);
            });

            suggestionsBox.appendChild(div);
        });
    } catch (err) {
        suggestionsBox.style.display = 'none';
        errorMsg.textContent = "Unable to load suggestions";
        errorMsg.style.display = 'block';
    }
}

cityInput.addEventListener(
    'input',
    debounce(e => fetchSuggestions(e.target.value))
);

document.addEventListener('click', e => {
    if (!e.target.closest('#suggestions') && e.target !== cityInput) {
        suggestionsBox.style.display = 'none';
    }
});

const lastCity = localStorage.getItem("lastCity");
if (lastCity) getCityCoordinates(lastCity);

