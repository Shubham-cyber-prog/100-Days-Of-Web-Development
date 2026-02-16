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
                category: "HTML"
            },
            {
                id: 2,
                title: "CSS Grid Layout",
                description: "Master CSS Grid for modern responsive layouts",
                videoId: "jV8B24rSN5o",
                platform: "youtube",
                duration: "22:45",
                difficulty: "intermediate",
                category: "CSS"
            },
            {
                id: 3,
                title: "JavaScript ES6 Features",
                description: "Explore modern JavaScript features and syntax",
                videoId: "NCwa_xi0Uuc",
                platform: "youtube",
                duration: "28:15",
                difficulty: "intermediate",
                category: "JavaScript"
            },
            {
                id: 4,
                title: "Responsive Web Design",
                description: "Create mobile-first responsive websites",
                videoId: "srvUrASNdxs",
                platform: "youtube",
                duration: "35:20",
                difficulty: "beginner",
                category: "CSS"
            },
            {
                id: 5,
                title: "Advanced JavaScript Concepts",
                description: "Deep dive into closures, promises, and async/await",
                videoId: "Mus_vwhTCq0",
                platform: "youtube",
                duration: "42:10",
                difficulty: "advanced",
                category: "JavaScript"
            },
            {
                id: 6,
                title: "CSS Flexbox Complete Guide",
                description: "Master flexbox for flexible layouts",
                videoId: "JJSoEo8JSnc",
                platform: "youtube",
                duration: "18:45",
                difficulty: "beginner",
                category: "CSS"
            }
        ];
        
        this.watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || {};
        this.currentFilter = 'all';
        this.searchQuery = '';
        
        this.init();
    }
    
    init() {
        this.renderTutorials();
        this.updateStats();
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
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('videoModal').addEventListener('click', (e) => {
            if (e.target.id === 'videoModal') {
                this.closeModal();
            }
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
        return `
            <div class="tutorial-card" data-id="${tutorial.id}">
                <div class="tutorial-thumbnail">
                    <div class="play-overlay">▶️</div>
                </div>
                <div class="tutorial-info">
                    <h3 class="tutorial-title">${tutorial.title}</h3>
                    <p class="tutorial-description">${tutorial.description}</p>
                    <div class="tutorial-meta">
                        <span class="duration">⏱️ ${tutorial.duration}</span>
                        <span class="difficulty ${tutorial.difficulty}">${tutorial.difficulty}</span>
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
        document.getElementById('modalDescription').textContent = tutorial.description;
        
        // Load video
        const videoUrl = this.getVideoEmbedUrl(tutorial);
        videoFrame.src = videoUrl;
        
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
        this.updateStats();
    }
    
    updateStats() {
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
        // Show download feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Downloaded!';
        btn.style.background = '#10B981';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#8B5CF6';
        }, 2000);
        
        console.log(`Downloading: ${resourceName}`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoTutorials();
});