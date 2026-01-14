const searchInput = document.getElementById("search");
const playlist = document.getElementById("playlist");
const resultsPlaceholder = document.getElementById("resultsPlaceholder");
const recommendedList = document.getElementById("recommendedList");

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("cover");
const current = document.getElementById("current");

let songs = [];
let currentIndex = -1;

/* =========================
   RECOMMENDED
========================= */
const recommended = [
  "Arijit Singh",
  "Taylor Swift",
  "Ed Sheeran",
  "The Weeknd",
  "Coldplay"
];

recommended.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  li.onclick = () => searchSongs(name);
  recommendedList.appendChild(li);
});

/* =========================
   SEARCH
========================= */
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchSongs(searchInput.value);
});

async function searchSongs(query) {
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
    return;
  }

  data.results.forEach((song, index) => {
    if (!song.previewUrl) return;
    songs.push(song);

    const li = document.createElement("li");
    li.textContent = `${song.trackName} – ${song.artistName}`;
    li.onclick = () => loadSong(index);
    playlist.appendChild(li);
  });
}

/* =========================
   LOAD SONG
========================= */
function loadSong(index) {
  const song = songs[index];
  if (!song) return;

  currentIndex = index;

  audio.src = song.previewUrl;
  titleEl.textContent = song.trackName;
  artistEl.textContent = song.artistName;
  coverEl.src = song.artworkUrl100.replace("100x100", "300x300");

  current.classList.remove("placeholder");

  playBtn.disabled = false;
  prevBtn.disabled = false;
  nextBtn.disabled = false;

  highlightActive();
  audio.play();
  playBtn.textContent = "⏸";
}

/* =========================
   HIGHLIGHT ACTIVE
========================= */
function highlightActive() {
  [...playlist.children].forEach((li, i) => {
    li.classList.toggle("active", i === currentIndex);
  });
}

/* =========================
   CONTROLS
========================= */
playBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
};

nextBtn.onclick = () => {
  if (!songs.length) return;
  loadSong((currentIndex + 1) % songs.length);
};

prevBtn.onclick = () => {
  if (!songs.length) return;
  loadSong((currentIndex - 1 + songs.length) % songs.length);
};

/* =========================
   TIME + PROGRESS
========================= */
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
};

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

function formatTime(time) {
  if (!time) return "0:00";
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

/* =========================
   VOLUME
========================= */
volume.oninput = () => {
  audio.volume = volume.value;
};

audio.onended = () => nextBtn.click();
