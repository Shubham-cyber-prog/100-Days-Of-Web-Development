const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("errorMsg");
const weatherData = document.getElementById("weatherData");
const suggestions = document.getElementById("suggestions");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");
const uvIndex = document.getElementById("uvIndex");
const visibility = document.getElementById("visibility");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.onclick = () => {
  if (cityInput.value.trim()) fetchCity(cityInput.value.trim());
};

cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});

async function fetchCity(city) {
  showLoader();
  errorMsg.style.display = "none";
  
  try {
    // Check online status first
    if (!navigator.onLine) {
      showError("You are offline. Please check your internet connection.");
      return;
    }

    // Validate city input
    if (!city || city.trim().length === 0) {
      showError("Please enter a valid city name");
      return;
    }

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    if (!response.ok) {
      throw new Error(`Geocoding service error: ${response.status}`);
    }

    const geo = await response.json();

    if (!geo.results || geo.results.length === 0) {
      showError(`City "${city}" not found. Please try another search.`);
      return;
    }

    const c = geo.results[0];
    await fetchWeather(c.latitude, c.longitude, c.name, c.country);
  } catch (error) {
    console.error("Error fetching city:", error);
    
    if (!navigator.onLine) {
      showError("Connection lost. Please check your internet connection.");
    } else if (error.message.includes("Failed to fetch")) {
      showError("Unable to reach the geocoding service. Please try again later.");
    } else {
      showError("An error occurred while searching for the city. Please try again.");
    }
  }
}

async function fetchWeather(lat, lon, name, country) {
  try {
    if (!navigator.onLine) {
      showError("You are offline. Cannot fetch weather data.");
      return;
    }

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,uv_index,visibility`
    );

    if (!response.ok) {
      throw new Error(`Weather service error: ${response.status}`);
    }

    const data = await response.json();

    // Validate weather data
    if (!data || !data.current_weather) {
      throw new Error("Invalid weather data received");
    }

    // Update UI with weather data
    cityName.textContent = `${name || "Unknown"}, ${country || ""}`;
    temperature.textContent = Math.round(data.current_weather.temperature || 0);
    windSpeed.textContent = (data.current_weather.windspeed || 0) + " km/h";

    const i = 0;
    humidity.textContent = (data.hourly?.relativehumidity_2m?.[i] || "N/A") + "%";
    feelsLike.textContent = Math.round(data.hourly?.apparent_temperature?.[i] || 0) + "°C";
    uvIndex.textContent = (data.hourly?.uv_index?.[i] || "N/A");
    visibility.textContent = ((data.hourly?.visibility?.[i] || 0) / 1000).toFixed(1) + " km";

    const map = {
      0: ["Clear Sky", "fa-sun"],
      1: ["Mainly Clear", "fa-cloud-sun"],
      2: ["Partly Cloudy", "fa-cloud-sun"],
      3: ["Overcast", "fa-cloud"],
      61: ["Rain", "fa-cloud-rain"],
      95: ["Thunderstorm", "fa-bolt"]
    };

    const weatherCode = data.current_weather.weathercode || 0;
    const info = map[weatherCode] || ["Weather", "fa-cloud"];
    condition.textContent = info[0];
    weatherIcon.innerHTML = `<i class="fas ${info[1]}"></i>`;

    loader.style.display = "none";
    weatherData.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching weather:", error);
    
    if (!navigator.onLine) {
      showError("You are offline. Please check your internet connection.");
    } else if (error.message.includes("Invalid weather data")) {
      showError("Received invalid weather data. Please try again.");
    } else {
      showError("Unable to fetch weather data. Please try again later.");
    }
  }
}

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
