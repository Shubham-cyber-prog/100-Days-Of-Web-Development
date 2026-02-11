// Music Data
const musicLibrary = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:35",
        cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:23",
        cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        duration: "2:58",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        album: "F*CK LOVE 3",
        duration: "2:21",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 6,
        title: "Heat Waves",
        artist: "Glass Animals",
        album: "Dreamland",
        duration: "3:58",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        id: 7,
        title: "Industry Baby",
        artist: "Lil Nas X",
        album: "MONTERO",
        duration: "3:32",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        id: 8,
        title: "Easy On Me",
        artist: "Adele",
        album: "30",
        duration: "3:44",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];

// State Management
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let likedSongs = new Set();
let playlists = [];
let recentlyPlayed = [];

// DOM Elements
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const likeBtn = document.getElementById('like-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');
const songList = document.getElementById('song-list');
const recentlyPlayedContainer = document.getElementById('recently-played');
const playlistContainer = document.getElementById('playlist-container');
const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playlistModal = document.getElementById('playlist-modal');
const cancelPlaylistBtn = document.getElementById('cancel-playlist');
const savePlaylistBtn = document.getElementById('save-playlist');
const playlistNameInput = document.getElementById('playlist-name');

// Player Controls
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', playPreviousSong);
nextBtn.addEventListener('click', playNextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
likeBtn.addEventListener('click', toggleLike);

// Volume Controls
volumeSlider.addEventListener('input', updateVolume);
muteBtn.addEventListener('click', toggleMute);

// Progress Bar
progressBar.addEventListener('input', seekTo);
audioPlayer.addEventListener('timeupdate', updateProgress);

// Playlist Controls
createPlaylistBtn.addEventListener('click', () => {
    playlistModal.style.display = 'flex';
    playlistNameInput.value = '';
});

cancelPlaylistBtn.addEventListener('click', () => {
    playlistModal.style.display = 'none';
});

savePlaylistBtn.addEventListener('click', createPlaylist);

// Initialize
function init() {
    renderMusicLibrary();
    renderRecentlyPlayed();
    loadPlaylists();
    
    // Set initial volume
    audioPlayer.volume = volumeSlider.value / 100;
    
    // Load first song
    loadSong(currentSongIndex);
}

function renderMusicLibrary() {
    songList.innerHTML = '';
    
    musicLibrary.forEach((song, index) => {
        const songRow = document.createElement('div');
        songRow.className = 'song-row';
        songRow.dataset.index = index;
        
        songRow.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-title">
                <div class="song-img">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div>
                    <div class="song-name">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            </div>
            <div class="song-album">${song.album}</div>
            <div class="song-duration">${song.duration}</div>
        `;
        
        songRow.addEventListener('click', () => playSong(index));
        songList.appendChild(songRow);
    });
}

function renderRecentlyPlayed() {
    recentlyPlayedContainer.innerHTML = '';
    
    recentlyPlayed.slice(0, 4).forEach(songId => {
        const song = musicLibrary.find(s => s.id === songId);
        if (song) {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.innerHTML = `
                <div class="song-album-art">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div class="song-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
            `;
            songCard.addEventListener('click', () => {
                const index = musicLibrary.findIndex(s => s.id === song.id);
                playSong(index);
            });
            recentlyPlayedContainer.appendChild(songCard);
        }
    });
}

function loadSong(index) {
    if (index < 0 || index >= musicLibrary.length) return;
    
    currentSongIndex = index;
    const song = musicLibrary[index];
    
    // Update audio player
    audioPlayer.src = song.src;
    
    // Update UI
    document.getElementById('current-song-title').textContent = song.title;
    document.getElementById('current-song-artist').textContent = song.artist;
    document.getElementById('current-album-art').src = song.cover;
    document.getElementById('mini-track-title').textContent = song.title;
    document.getElementById('mini-track-artist').textContent = song.artist;
    document.getElementById('mini-album-art').src = song.cover;
    
    // Update song row highlight
    document.querySelectorAll('.song-row').forEach(row => {
        row.classList.remove('active');
    });
    document.querySelector(`.song-row[data-index="${index}"]`)?.classList.add('active');
    
    // Update like button
    updateLikeButton();
    
    // Add to recently played
    addToRecentlyPlayed(song.id);
    
    // Play if already playing
    if (isPlaying) {
        audioPlayer.play().catch(e => console.log("Autoplay prevented:", e));
    }
}

function playSong(index) {
    loadSong(index);
    play();
}

function togglePlayPause() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

function play() {
    audioPlayer.play().catch(e => console.log("Play error:", e));
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pause() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function playPreviousSong() {
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) newIndex = musicLibrary.length - 1;
    playSong(newIndex);
}

function playNextSong() {
    let newIndex;
    
    if (isShuffle) {
        do {
            newIndex = Math.floor(Math.random() * musicLibrary.length);
        } while (newIndex === currentSongIndex && musicLibrary.length > 1);
    } else {
        newIndex = currentSongIndex + 1;
        if (newIndex >= musicLibrary.length) {
            if (isRepeat) {
                newIndex = 0;
            } else {
                pause();
                return;
            }
        }
    }
    
    playSong(newIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? '#1db954' : '#b3b3b3';
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? '#1db954' : '#b3b3b3';
}

function toggleLike() {
    const songId = musicLibrary[currentSongIndex].id;
    if (likedSongs.has(songId)) {
        likedSongs.delete(songId);
    } else {
        likedSongs.add(songId);
    }
    updateLikeButton();
}

function updateLikeButton() {
    const songId = musicLibrary[currentSongIndex].id;
    if (likedSongs.has(songId)) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
}

function updateProgress() {
    if (!audioPlayer.duration) return;
    
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
    
    // Update progress bar background
    document.querySelector('.progress-bg').style.setProperty('--progress', `${progress}%`);
    
    // Update time display
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
}

function seekTo() {
    const time = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = time;
}

function updateVolume() {
    const volume = volumeSlider.value / 100;
    audioPlayer.volume = volume;
    muteBtn.innerHTML = volume > 0 ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
}

function toggleMute() {
    if (audioPlayer.volume > 0) {
        audioPlayer.volume = 0;
        volumeSlider.value = 0;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        audioPlayer.volume = 0.7;
        volumeSlider.value = 70;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function addToRecentlyPlayed(songId) {
    // Remove if already exists
    const index = recentlyPlayed.indexOf(songId);
    if (index > -1) {
        recentlyPlayed.splice(index, 1);
    }
    
    // Add to beginning
    recentlyPlayed.unshift(songId);
    
    // Keep only last 10
    if (recentlyPlayed.length > 10) {
        recentlyPlayed.pop();
    }
    
    renderRecentlyPlayed();
}

function loadPlaylists() {
    const savedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    playlists = savedPlaylists;
    renderPlaylists();
}

function savePlaylists() {
    localStorage.setItem('playlists', JSON.stringify(playlists));
}

function renderPlaylists() {
    playlistContainer.innerHTML = '';
    
    playlists.forEach((playlist, index) => {
        const li = document.createElement('li');
        li.textContent = playlist.name;
        li.addEventListener('click', () => openPlaylist(index));
        playlistContainer.appendChild(li);
    });
}

function createPlaylist() {
    const name = playlistNameInput.value.trim();
    if (name) {
        playlists.push({
            name: name,
            songs: []
        });
        savePlaylists();
        renderPlaylists();
        playlistModal.style.display = 'none';
    }
}

function openPlaylist(index) {
    // This function would open the playlist view
    alert(`Opening playlist: ${playlists[index].name}`);
}

// Event Listeners for audio player
audioPlayer.addEventListener('ended', playNextSong);
audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audioPlayer.duration);
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSongs = musicLibrary.filter(song => 
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.album.toLowerCase().includes(searchTerm)
    );
    
    // Re-render filtered songs
    songList.innerHTML = '';
    filteredSongs.forEach((song, index) => {
        const originalIndex = musicLibrary.findIndex(s => s.id === song.id);
        const songRow = document.createElement('div');
        songRow.className = 'song-row';
        songRow.dataset.index = originalIndex;
        
        songRow.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-title">
                <div class="song-img">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div>
                    <div class="song-name">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
            </div>
            <div class="song-album">${song.album}</div>
            <div class="song-duration">${song.duration}</div>
        `;
        
        songRow.addEventListener('click', () => playSong(originalIndex));
        songList.appendChild(songRow);
    });
});

// Initialize the application
document.addEventListener('DOMContentLoaded', init);

// View controls
document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        if (this.querySelector('.fa-list')) {
            // List view - already implemented
        } else {
            // Grid view - could implement alternative view
        }
    });
});

// Navigation menu
document.querySelectorAll('.nav-menu li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
    });
});