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


class WeatherApp {
    constructor() {
        this.apiKey = '003fddc023a25bd09aca868ba11a7b1b';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.geoUrl = 'https://api.openweathermap.org/geo/1.0';
        this.isCelsius = true;
        
        this.initializeElements();
        this.bindEvents();
        this.loadDefaultWeather();
    }

    initializeElements() {
        // Input elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        this.unitToggle = document.getElementById('unitToggle');

        // Display elements
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
        this.weatherContent = document.getElementById('weatherContent');

        // Current weather elements
        this.currentTemp = document.getElementById('currentTemp');
        this.currentLocation = document.getElementById('currentLocation');
        this.currentDate = document.getElementById('currentDate');
        this.currentWeatherIcon = document.getElementById('currentWeatherIcon');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');

        // Forecast elements
        this.forecastContainer = document.getElementById('forecastContainer');

        // Highlights elements
        this.uvIndex = document.getElementById('uvIndex');
        this.uvDescription = document.getElementById('uvDescription');
        this.visibility = document.getElementById('visibility');
        this.sunrise = document.getElementById('sunrise');
        this.sunset = document.getElementById('sunset');
        this.airQuality = document.getElementById('airQuality');
        this.airQualityDescription = document.getElementById('airQualityDescription');
    }

    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());
        this.unitToggle.addEventListener('click', () => this.toggleUnits());
    }

    async loadDefaultWeather() {
        await this.getWeatherByCity('London');
    }

    showLoading() {
        this.loading.classList.remove('hidden');
        this.errorMessage.classList.add('hidden');
        this.weatherContent.classList.add('hidden');
    }

    hideLoading() {
        this.loading.classList.add('hidden');
    }

    showError(message = 'City not found. Please try again.') {
        this.errorMessage.querySelector('p').textContent = message;
        this.errorMessage.classList.remove('hidden');
        this.weatherContent.classList.add('hidden');
        this.hideLoading();
    }

    showWeatherContent() {
        this.weatherContent.classList.remove('hidden');
        this.errorMessage.classList.add('hidden');
        this.hideLoading();
        
        // Add animation class
        this.weatherContent.classList.add('weather-update');
        setTimeout(() => {
            this.weatherContent.classList.remove('weather-update');
        }, 600);
    }

    async handleSearch() {
        const city = this.searchInput.value.trim();
        if (!city) return;

        await this.getWeatherByCity(city);
        this.searchInput.value = '';
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by this browser.');
            return;
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
