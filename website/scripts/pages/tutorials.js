class VideoTutorials {
    constructor() {
        this.tutorials = [
            {
                id: 1,
                title: "HTML Fundamentals",
                description: "Learn the basics of HTML structure and semantic elements",
                videoId: "UB1O30fR-EE",
                platform: "youtube",
                duration: "15:30",
                difficulty: "beginner",
                category: "HTML",
                thumbnail: "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg"
            },
            {
                id: 2,
                title: "CSS Grid Layout",
                description: "Master CSS Grid for modern responsive layouts",
                videoId: "jV8B24rSN5o",
                platform: "youtube",
                duration: "22:45",
                difficulty: "intermediate",
                category: "CSS",
                thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/maxresdefault.jpg"
            },
            {
                id: 3,
                title: "JavaScript ES6 Features",
                description: "Explore modern JavaScript features and syntax",
                videoId: "NCwa_xi0Uuc",
                platform: "youtube",
                duration: "28:15",
                difficulty: "intermediate",
                category: "JavaScript",
                thumbnail: "https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg"
            },
            {
                id: 4,
                title: "Responsive Web Design",
                description: "Create mobile-first responsive websites",
                videoId: "srvUrASNdxs",
                platform: "youtube",
                duration: "35:20",
                difficulty: "beginner",
                category: "CSS",
                thumbnail: "https://img.youtube.com/vi/srvUrASNdxs/maxresdefault.jpg"
            },
            {
                id: 5,
                title: "Advanced JavaScript Concepts",
                description: "Deep dive into closures, promises, and async/await",
                videoId: "Mus_vwhTCq0",
                platform: "youtube",
                duration: "42:10",
                difficulty: "advanced",
                category: "JavaScript",
                thumbnail: "https://img.youtube.com/vi/Mus_vwhTCq0/maxresdefault.jpg"
            },
            {
                id: 6,
                title: "CSS Flexbox Complete Guide",
                description: "Master flexbox for flexible layouts",
                videoId: "JJSoEo8JSnc",
                platform: "youtube",
                duration: "18:45",
                difficulty: "beginner",
                category: "CSS",
                thumbnail: "https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg"
            }
        ];
        
        this.watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || {};
        this.videoNotes = JSON.parse(localStorage.getItem('videoNotes')) || {};
        this.currentFilter = 'all';
        this.searchQuery = '';
        
        this.init();
    }
    
    init() {
        this.renderTutorials();
        this.updateProgressStats();
        this.bindEvents();
    }
    
    bindEvents() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.renderTutorials();
        });
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.level;
                this.renderTutorials();
            });
        });
        
        // Modal events
        document.getElementById('videoModal').addEventListener('click', (e) => {
            if (e.target.id === 'videoModal') {
                this.closeModal();
            }
        });
        
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('saveNotes').addEventListener('click', () => {
            this.saveVideoNotes();
        });
        
        // Download buttons
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const resourceName = e.target.parentElement.querySelector('h3').textContent;
                this.downloadResource(resourceName);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    renderTutorials() {
        const grid = document.getElementById('tutorialsGrid');
        const filteredTutorials = this.tutorials.filter(tutorial => {
            const matchesFilter = this.currentFilter === 'all' || tutorial.difficulty === this.currentFilter;
            const matchesSearch = tutorial.title.toLowerCase().includes(this.searchQuery) ||
                                tutorial.description.toLowerCase().includes(this.searchQuery) ||
                                tutorial.category.toLowerCase().includes(this.searchQuery);
            return matchesFilter && matchesSearch;
        });
        
        grid.innerHTML = filteredTutorials.map(tutorial => this.createTutorialCard(tutorial)).join('');
        
        // Add click events to cards
        document.querySelectorAll('.tutorial-card').forEach(card => {
            card.addEventListener('click', () => {
                const tutorialId = parseInt(card.dataset.id);
                this.openVideoModal(tutorialId);
            });
        });
    }
    
    createTutorialCard(tutorial) {
        const isWatched = this.watchedVideos[tutorial.id];
        const progress = isWatched ? 100 : 0;
        
        return `
            <div class="tutorial-card" data-id="${tutorial.id}">
                <div class="tutorial-thumbnail">
                    <img src="${tutorial.thumbnail}" alt="${tutorial.title}" loading="lazy">
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                    ${isWatched ? '<div class="watched-indicator"><i class="fas fa-check"></i></div>' : ''}
                </div>
                <div class="tutorial-info">
                    <h3 class="tutorial-title">${tutorial.title}</h3>
                    <p class="tutorial-description">${tutorial.description}</p>
                    <div class="tutorial-meta">
                        <span class="duration"><i class="fas fa-clock"></i> ${tutorial.duration}</span>
                        <span class="difficulty ${tutorial.difficulty}">${tutorial.difficulty}</span>
                    </div>
                    <div class="watch-progress">
                        <div class="progress-bar" style="width: ${progress}%"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    openVideoModal(tutorialId) {
        const tutorial = this.tutorials.find(t => t.id === tutorialId);
        if (!tutorial) return;
        
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        
        // Set modal content
        document.getElementById('modalTitle').textContent = tutorial.title;
        document.getElementById('modalDuration').innerHTML = `<i class="fas fa-clock"></i> ${tutorial.duration}`;
        document.getElementById('modalDifficulty').textContent = tutorial.difficulty;
        document.getElementById('modalDescription').textContent = tutorial.description;
        
        // Load video
        const videoUrl = this.getVideoEmbedUrl(tutorial);
        videoFrame.src = videoUrl;
        
        // Load existing notes
        const notes = this.videoNotes[tutorialId] || '';
        document.getElementById('videoNotes').value = notes;
        document.getElementById('videoNotes').dataset.tutorialId = tutorialId;
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Mark as watched after 5 seconds
        setTimeout(() => {
            this.markAsWatched(tutorialId);
        }, 5000);
    }
    
    closeModal() {
        const modal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    }
    
    getVideoEmbedUrl(tutorial) {
        if (tutorial.platform === 'youtube') {
            return `https://www.youtube.com/embed/${tutorial.videoId}?autoplay=1&rel=0`;
        }
        return '';
    }
    
    markAsWatched(tutorialId) {
        this.watchedVideos[tutorialId] = {
            watchedAt: new Date().toISOString(),
            completed: true
        };
        localStorage.setItem('watchedVideos', JSON.stringify(this.watchedVideos));
        this.updateProgressStats();
        this.renderTutorials();
    }
    
    saveVideoNotes() {
        const textarea = document.getElementById('videoNotes');
        const tutorialId = parseInt(textarea.dataset.tutorialId);
        const notes = textarea.value.trim();
        
        if (notes) {
            this.videoNotes[tutorialId] = notes;
        } else {
            delete this.videoNotes[tutorialId];
        }
        
        localStorage.setItem('videoNotes', JSON.stringify(this.videoNotes));
        
        // Show success feedback
        const saveBtn = document.getElementById('saveNotes');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Saved!';
        saveBtn.style.background = '#4caf50';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = '#667eea';
        }, 2000);
    }
    
    updateProgressStats() {
        const watchedCount = Object.keys(this.watchedVideos).length;
        const totalVideos = this.tutorials.length;
        const completionRate = Math.round((watchedCount / totalVideos) * 100);
        
        // Calculate total watch time
        const watchedTutorials = this.tutorials.filter(t => this.watchedVideos[t.id]);
        const totalMinutes = watchedTutorials.reduce((total, tutorial) => {
            const [minutes, seconds] = tutorial.duration.split(':').map(Number);
            return total + minutes + (seconds / 60);
        }, 0);
        
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        
        // Update UI
        document.getElementById('watchedCount').textContent = watchedCount;
        document.getElementById('totalTime').textContent = `${hours}h ${minutes}m`;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
    }
    
    downloadResource(resourceName) {
        // Simulate download
        const link = document.createElement('a');
        link.href = '#';
        link.download = resourceName.toLowerCase().replace(/\s+/g, '-') + '.pdf';
        
        // Show download feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Downloaded!';
        btn.style.background = '#4caf50';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }, 2000);
        
        // In a real app, this would trigger actual file download
        console.log(`Downloading: ${resourceName}`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoTutorials();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideoTutorials;
}