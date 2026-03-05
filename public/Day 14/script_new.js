const searchInput = document.getElementById("search");
const playlist = document.getElementById("playlist");
const resultsPlaceholder = document.getElementById("resultsPlaceholder");
const recommendedList = document.getElementById("recommendedList");

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const themeToggle = document.getElementById("themeToggle");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("cover");
const current = document.getElementById("current");

let songs = [];
let currentIndex = -1;
let isShuffle = false;

/* THEME TOGGLE */
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  document.body.classList.toggle("light-mode", savedTheme === "light-mode");
  updateThemeIcon();
}

function updateThemeIcon() {
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const theme = document.body.classList.contains("light-mode") ? "light-mode" : "dark-mode";
  localStorage.setItem("theme", theme);
  updateThemeIcon();
});

initTheme();

/* AUTO LOAD THE WEEKND ON PAGE LOAD */
window.addEventListener('load', () => {
  setTimeout(() => {
    searchSongs("The Weeknd", true);
  }, 500); // Small delay to ensure everything is loaded
});

/* RECOMMENDED */
["Arijit Singh","Taylor Swift","Ed Sheeran","The Weeknd","Coldplay"]
.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  li.onclick = () => searchSongs(name);
  recommendedList.appendChild(li);
});

/* SEARCH */
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchSongs(searchInput.value);
});

async function searchSongs(query, autoLoadFirst = false) {
  if (!query) return;

  playlist.innerHTML = "";
  resultsPlaceholder.style.display = "none";
  songs = [];
  currentIndex = -1;

  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=15`
  );
  const data = await res.json();

  if (!data.results.length) {
    resultsPlaceholder.style.display = "block";
    resultsPlaceholder.textContent = "🎶 No songs found";
    return;
  }

  data.results.forEach((song, index) => {
    if (!song.previewUrl) return;
    songs.push(song);

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${song.artworkUrl60}">
      <div>
        <strong>${song.trackName}</strong><br>
        <small>${song.artistName}</small>
      </div>
    `;
    li.onclick = () => loadSong(index);
    playlist.appendChild(li);
  });
  // Enable shuffle button when songs are loaded
  if (songs.length > 0) {
    shuffleBtn.disabled = false;

  // Auto-load first song if requested (for The Weeknd on page load)
  if (autoLoadFirst && songs.length > 0) {
    setTimeout(() => {
      loadSong(0);
    }, 1000); // Wait a bit for the UI to update
  }
}}

/* LOAD SONG */
function loadSong(index) {
  const song = songs[index];
  if (!song) return;

  currentIndex = index;
  audio.src = song.previewUrl;
  titleEl.textContent = song.trackName;
  artistEl.textContent = song.artistName;
  coverEl.src = song.artworkUrl100.replace("100x100","300x300");

  current.classList.remove("placeholder");
  playBtn.disabled = prevBtn.disabled = nextBtn.disabled = false;
  // Keep shuffle button enabled as long as there are songs
  if (songs.length > 0) {
    shuffleBtn.disabled = false;

  // Auto-load first song if requested (for The Weeknd on page load)
  if (autoLoadFirst && songs.length > 0) {
    setTimeout(() => {
      loadSong(0);
    }, 1000); // Wait a bit for the UI to update
  }
}

  highlightActive();
  audio.play();
}

/* ACTIVE */
function highlightActive() {
  [...playlist.children].forEach((li, i) => {
    li.classList.toggle("active", i === currentIndex);
  });
}

/* SHUFFLE */
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
  shuffleBtn.title = isShuffle ? "Shuffle: ON - Click to disable" : "Shuffle: OFF - Click to enable";
  console.log("Shuffle mode:", isShuffle ? "ON" : "OFF");
});

function getNextIndex() {
  if (isShuffle && songs.length > 1) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentIndex);
    return newIndex;
  }
  return (currentIndex + 1) % songs.length;
}

/* CONTROLS */
playBtn.onclick = () => audio.paused ? audio.play() : audio.pause();
audio.onplay = () => playBtn.textContent = "⏸";
audio.onpause = () => playBtn.textContent = "▶";

nextBtn.onclick = () => loadSong(getNextIndex());
prevBtn.onclick = () => loadSong((currentIndex - 1 + songs.length) % songs.length);

/* TIME */
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
};

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

function formatTime(t) {
  if (!t) return "0:00";
  return `${Math.floor(t/60)}:${Math.floor(t%60).toString().padStart(2,"0")}`;
}

/* VOLUME */
volume.oninput = () => audio.volume = volume.value;
audio.onended = () => nextBtn.click();

