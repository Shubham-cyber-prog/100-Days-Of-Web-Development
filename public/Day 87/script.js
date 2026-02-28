// ================= MUSIC DATA =================
const musicLibrary = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:35",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:23",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];


// ================= STATE =================
let currentSongIndex = 0;
let isPlaying = false;
let likedSongs = new Set();
let recentlyPlayed = [];


// ================= DOM =================
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const progressBar = document.getElementById("progress-bar");
const searchInput = document.getElementById("search-input");
const songList = document.getElementById("song-list");


// ================= INIT =================
function init() {
    renderMusicLibrary();
    loadSong(0);
    createParticles();
}


// ================= RENDER =================
function renderMusicLibrary() {
    songList.innerHTML = "";

    musicLibrary.forEach((song, index) => {
        const row = document.createElement("div");
        row.className = "song-row";
        row.dataset.index = index;

        row.innerHTML = `
            <img src="${song.cover}" width="50">
            <div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <span>${song.duration}</span>
        `;

        row.addEventListener("click", () => playSong(index));
        songList.appendChild(row);
    });
}


// ================= SEARCH =================
function handleSearch() {
    const query = searchInput.value.toLowerCase();

    const filtered = musicLibrary.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
    );

    renderFilteredSongs(filtered);
}

function renderFilteredSongs(filteredSongs) {
    songList.innerHTML = "";

    if (filteredSongs.length === 0) {
        songList.innerHTML = "<p>No songs found 😔</p>";
        return;
    }

    filteredSongs.forEach(song => {
        const index = musicLibrary.indexOf(song);

        const row = document.createElement("div");
        row.className = "song-row";

        row.innerHTML = `
            <img src="${song.cover}" width="50">
            <div>
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <span>${song.duration}</span>
        `;

        row.addEventListener("click", () => playSong(index));
        songList.appendChild(row);
    });
}


// ================= PLAYER =================
function loadSong(index) {
    currentSongIndex = index;
    const song = musicLibrary[index];

    audioPlayer.src = song.src;

    document.getElementById("current-song-title").textContent = song.title;
    document.getElementById("current-song-artist").textContent = song.artist;
    document.getElementById("current-album-art").src = song.cover;

    updateDynamicBackground();
}

function playSong(index) {
    loadSong(index);
    play();
}

function play() {
    audioPlayer.play();
    isPlaying = true;
    playPauseBtn.innerHTML = "⏸";
}

function pause() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = "▶";
}

function togglePlayPause() {
    isPlaying ? pause() : play();
}

function playNextSong() {
    currentSongIndex =
        (currentSongIndex + 1) % musicLibrary.length;
    playSong(currentSongIndex);
}

function playPreviousSong() {
    currentSongIndex =
        (currentSongIndex - 1 + musicLibrary.length) % musicLibrary.length;
    playSong(currentSongIndex);
}


// ================= LIVE BACKGROUND =================
// function createParticles() {
//     const container = document.querySelector(".particles");

//     for (let i = 0; i < 25; i++) {
//         const span = document.createElement("span");

//         span.style.left = Math.random() * 100 + "vw";
//         span.style.animationDuration = (6 + Math.random() * 10) + "s";

//         container.appendChild(span);
//     }
// }

function createParticles() {
    const container = document.querySelector(".particles");

    const emojis = ["🎵", "🎧", "✨", "🎉", "🔥", "🎶"];

    for (let i = 0; i < 25; i++) {
        const span = document.createElement("span");

        span.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        span.style.left = Math.random() * 100 + "vw";
        span.style.animationDuration = (6 + Math.random() * 10) + "s";
        span.style.animationDelay = Math.random() * 5 + "s";

        container.appendChild(span);
    }
}


// 🎵 Dynamic song background
function updateDynamicBackground() {
    const bg = document.querySelector(".dynamic-bg");
    const song = musicLibrary[currentSongIndex];

    if (bg) {
        bg.style.backgroundImage = `url(${song.cover})`;
    }
}


// ================= EVENTS =================
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", playNextSong);
prevBtn.addEventListener("click", playPreviousSong);
searchInput.addEventListener("input", handleSearch);

audioPlayer.addEventListener("ended", playNextSong);


// ================= START =================
document.addEventListener("DOMContentLoaded", init);