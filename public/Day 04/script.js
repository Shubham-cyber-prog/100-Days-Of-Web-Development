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
  try {
    const geo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    ).then(r => r.json());

    if (!geo.results) throw Error();

    const c = geo.results[0];
    fetchWeather(c.latitude, c.longitude, c.name, c.country);
  } catch {
    showError("City not found");
  }
}

async function fetchWeather(lat, lon, name, country) {
  const data = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,uv_index,visibility`
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
