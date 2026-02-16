const forecast = document.getElementById("forecast");

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("errorMsg");
const weatherData = document.getElementById("weatherData");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");
const uvIndex = document.getElementById("uvIndex");
const visibility = document.getElementById("visibility");
const weatherIcon = document.getElementById("weatherIcon");


// 7 days Forecast function js 
function renderForecast(daily) {
  forecast.innerHTML = "";
  forecast.classList.remove("hidden");

  const icons = {
    0: "fa-sun",
    1: "fa-cloud-sun",
    2: "fa-cloud-sun",
    3: "fa-cloud",
    61: "fa-cloud-rain",
    95: "fa-bolt"
  };

  daily.time.forEach((day, i) => {
    const date = new Date(day);
    const name = date.toLocaleDateString("en-US", { weekday: "short" });

    const icon = icons[daily.weathercode[i]] || "fa-cloud";

    forecast.innerHTML += `
      <div class="forecast-card">
        <div>${name}</div>
        <i class="fas ${icon}"></i>
        <div class="temp">
          ${Math.round(daily.temperature_2m_max[i])}°
        </div>
        <div style="opacity:.7">
          ${Math.round(daily.temperature_2m_min[i])}°
        </div>
      </div>
    `;
  });
}

searchBtn.onclick = () => {
  if (cityInput.value.trim()) fetchCity(cityInput.value.trim());
};

/* ------------------ EVENTS ------------------ */

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchCity(city);
});


cityInput.addEventListener("keypress", e => {
  if (e.key === "Enter") searchBtn.click();
});

cityInput.addEventListener("input", () => {
  errorMsg.style.display = "none";
});

/* ------------------ FUNCTIONS ------------------ */

async function fetchCity(city) {
  showLoader();
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1`
    );
    const geo = await res.json();

    if (!geo.results || geo.results.length === 0) {
      throw new Error("City not found");
    }

    const c = geo.results[0];
    await fetchWeather(c.latitude, c.longitude, c.name, c.country);
  } catch {
    showError("City not found");
  }
}

async function fetchWeather(lat, lon, name, country) {

  const data = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,uv_index,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
  ).then(r => r.json());

  cityName.textContent = `${name}, ${country}`;
  temperature.textContent = Math.round(data.current_weather.temperature);
  windSpeed.textContent = data.current_weather.windspeed + " km/h";

  const i = 0;
  humidity.textContent = data.hourly.relativehumidity_2m[i] + "%";
  feelsLike.textContent = Math.round(data.hourly.apparent_temperature[i]) + "°C";
  uvIndex.textContent = data.hourly.uv_index[i];
  visibility.textContent = data.hourly.visibility[i] / 1000 + " km";

  const map = {
    0: ["Clear Sky", "fa-sun"],
    1: ["Mainly Clear", "fa-cloud-sun"],
    2: ["Partly Cloudy", "fa-cloud-sun"],
    3: ["Overcast", "fa-cloud"],
    61: ["Rain", "fa-cloud-rain"],
    95: ["Thunderstorm", "fa-bolt"]
  };

  const info = map[data.current_weather.weathercode] || ["Weather", "fa-cloud"];
  condition.textContent = info[0];
  weatherIcon.innerHTML = `<i class="fas ${info[1]}"></i>`;

  loader.style.display = "none";
  weatherData.classList.remove("hidden");
  renderForecast(data.daily);

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,uv_index,visibility`
    );
    const data = await res.json();

    cityName.textContent = `${name}, ${country}`;
    temperature.textContent = Math.round(data.current_weather.temperature);
    windSpeed.textContent = data.current_weather.windspeed + " km/h";

    // FIX: find closest hourly index
    const currentTime = new Date(data.current_weather.time).getTime();
    let closestIndex = 0;
    let minDiff = Infinity;
    data.hourly.time.forEach((t, idx) => {
      const diff = Math.abs(new Date(t).getTime() - currentTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    // Set humidity, feels-like, UV, visibility
    humidity.textContent = data.hourly.relativehumidity_2m[closestIndex] + "%";
    feelsLike.textContent =
      Math.round(data.hourly.apparent_temperature[closestIndex]) + "°C";
    uvIndex.textContent = data.hourly.uv_index[closestIndex];
    visibility.textContent =
      (data.hourly.visibility[closestIndex] / 1000).toFixed(1) + " km";

    // Weather code mapping
    const weatherMap = {
      0: ["Clear Sky", "fa-sun"],
      1: ["Mainly Clear", "fa-cloud-sun"],
      2: ["Partly Cloudy", "fa-cloud-sun"],
      3: ["Overcast", "fa-cloud"],
      45: ["Fog", "fa-smog"],
      48: ["Fog", "fa-smog"],
      51: ["Drizzle", "fa-cloud-rain"],
      61: ["Rain", "fa-cloud-rain"],
      63: ["Heavy Rain", "fa-cloud-showers-heavy"],
      71: ["Snow", "fa-snowflake"],
      95: ["Thunderstorm", "fa-bolt"]
    };

    const code = data.current_weather.weathercode;
    const info = weatherMap[code] || ["Weather", "fa-cloud"];

    condition.textContent = info[0];
    weatherIcon.innerHTML = `<i class="fas ${info[1]}"></i>`;

    weatherData.classList.remove("hidden");
  } catch {
    showError("Failed to load weather data");
  } finally {
    loader.style.display = "none";
  }

}

/* ------------------ UI HELPERS ------------------ */

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
