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
}

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

  highlightActive();
  audio.play();
}

/* ACTIVE */
function highlightActive() {
  [...playlist.children].forEach((li, i) => {
    li.classList.toggle("active", i === currentIndex);
  });
}

/* CONTROLS */
playBtn.onclick = () => audio.paused ? audio.play() : audio.pause();
audio.onplay = () => playBtn.textContent = "⏸";
audio.onpause = () => playBtn.textContent = "▶";

nextBtn.onclick = () => loadSong((currentIndex + 1) % songs.length);
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
