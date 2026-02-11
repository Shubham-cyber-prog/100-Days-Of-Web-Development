// Voice Notes App - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // App state
    const appState = {
        isRecording: false,
        mediaRecorder: null,
        audioChunks: [],
        notes: [],
        currentAudio: null,
        currentNoteId: null,
        recordingStartTime: null,
        timerInterval: null,
        recordingTime: 0,
        animationId: null,
        visualizerBars: []
    };

    // DOM Elements
    const recordBtn = document.getElementById('recordBtn');
    const stopBtn = document.getElementById('stopBtn');
    const saveBtn = document.getElementById('saveBtn');
    const notesList = document.getElementById('notesList');
    const emptyState = document.getElementById('emptyState');
    const notesCount = document.getElementById('notesCount');
    const noteTitleInput = document.getElementById('noteTitle');
    const timer = document.getElementById('timer');
    const recordingStatus = document.getElementById('recordingStatus');
    const visualizer = document.getElementById('visualizer');
    const searchNotes = document.getElementById('searchNotes');
    const filterBtn = document.getElementById('filterBtn');
    
    // Audio Player Modal Elements
    const audioPlayerModal = document.getElementById('audioPlayerModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const audioTitle = document.getElementById('audioTitle');
    const audioDate = document.getElementById('audioDate');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const deleteNoteBtn = document.getElementById('deleteNoteBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Initialize the app
    initApp();
    
    function initApp() {
        loadNotesFromStorage();
        updateNotesList();
        setupEventListeners();
        setupVisualizerBars();
    }
    
    function setupEventListeners() {
        // Recording controls
        recordBtn.addEventListener('click', startRecording);
        stopBtn.addEventListener('click', stopRecording);
        saveBtn.addEventListener('click', saveRecording);
        
        // Search and filter
        searchNotes.addEventListener('input', filterNotes);
        filterBtn.addEventListener('click', filterNotes);
        
        // Audio player modal
        closeModal.addEventListener('click', () => {
            audioPlayerModal.style.display = 'none';
            if (appState.currentAudio) {
                appState.currentAudio.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            }
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === audioPlayerModal) {
                audioPlayerModal.style.display = 'none';
                if (appState.currentAudio) {
                    appState.currentAudio.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
                }
            }
        });
        
        // Audio player controls
        playPauseBtn.addEventListener('click', togglePlayPause);
        rewindBtn.addEventListener('click', () => seekAudio(-10));
        forwardBtn.addEventListener('click', () => seekAudio(10));
        progressBar.addEventListener('input', updateAudioProgress);
        deleteNoteBtn.addEventListener('click', deleteCurrentNote);
        downloadBtn.addEventListener('click', downloadCurrentAudio);
    }
    
    function setupVisualizerBars() {
        const bars = visualizer.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            appState.visualizerBars[index] = bar;
        });
    }
    
    function updateVisualizer() {
        if (!appState.isRecording) return;
        
        // Update each bar's height randomly for simulation
        appState.visualizerBars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 50) + 20;
            bar.style.height = `${randomHeight}px`;
            
            // Add color gradient based on height
            if (randomHeight > 60) {
                bar.style.background = '#ff6b6b';
            } else if (randomHeight > 40) {
                bar.style.background = '#ffa726';
            } else {
                bar.style.background = '#6a11cb';
            }
        });
        
        // Continue animation
        appState.animationId = requestAnimationFrame(updateVisualizer);
    }
    
    async function startRecording() {
        try {
            // Check if browser supports MediaRecorder
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('Your browser does not support audio recording. Please use Chrome, Firefox, or Edge.');
                return;
            }
            
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            
            // Create MediaRecorder instance
            const options = { mimeType: 'audio/webm' };
            appState.mediaRecorder = new MediaRecorder(stream, options);
            appState.audioChunks = [];
            
            // Collect audio data
            appState.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    appState.audioChunks.push(event.data);
                }
            };
            
            // Start recording
            appState.mediaRecorder.start(100); // Collect data every 100ms
            appState.isRecording = true;
            appState.recordingStartTime = Date.now();
            
            // Update UI
            recordBtn.disabled = true;
            stopBtn.disabled = false;
            saveBtn.disabled = true;
            recordingStatus.innerHTML = '<i class="fas fa-circle"></i> Recording...';
            recordingStatus.classList.add('recording');
            
            // Start timer
            startTimer();
            
            // Start visualizer
            updateVisualizer();
            
            // When recording stops
            appState.mediaRecorder.onstop = () => {
                // Stop visualizer
                if (appState.animationId) {
                    cancelAnimationFrame(appState.animationId);
                }
                
                // Reset bars to default
                appState.visualizerBars.forEach(bar => {
                    bar.style.height = '20px';
                    bar.style.background = '#6a11cb';
                });
                
                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
                
                // Update UI
                recordBtn.disabled = false;
                stopBtn.disabled = true;
                saveBtn.disabled = false;
                recordingStatus.innerHTML = '<i class="fas fa-circle"></i> Recording stopped';
                recordingStatus.classList.remove('recording');
            };
            
        } catch (error) {
            let errorMessage = 'Could not access microphone. ';
            
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorMessage += 'Please allow microphone access in your browser settings.';
            } else if (error.name === 'NotFoundError') {
                errorMessage += 'No microphone found. Please connect a microphone and try again.';
            } else if (error.name === 'NotReadableError') {
                errorMessage += 'Microphone is already in use by another application.';
            } else {
                errorMessage += 'Please check your permissions and try again.';
            }
            
            showNotification(errorMessage, 'error');
        }
    }
    
    function stopRecording() {
        if (appState.mediaRecorder && appState.isRecording) {
            appState.mediaRecorder.stop();
            appState.isRecording = false;
            stopTimer();
        }
    }
    
    function saveRecording() {
        if (appState.audioChunks.length === 0) {
            alert('No recording to save. Please record something first.');
            return;
        }
        
        const title = noteTitleInput.value.trim() || `Voice Note ${appState.notes.length + 1}`;
        
        // Create audio blob
        const audioBlob = new Blob(appState.audioChunks, { type: 'audio/webm' });
        
        // Create note object
        const note = {
            id: Date.now().toString(),
            title: title,
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            duration: formatTime(appState.recordingTime),
            audioUrl: URL.createObjectURL(audioBlob),
            timestamp: Date.now()
        };
        
        // Add to notes array
        appState.notes.unshift(note);
        
        // Save to localStorage
        saveNotesToStorage();
        
        // Update UI
        updateNotesList();
        noteTitleInput.value = '';
        
        // Reset recording state
        appState.audioChunks = [];
        saveBtn.disabled = true;
        appState.recordingTime = 0;
        timer.textContent = '00:00';
        
        // Show success message
        showNotification('Note saved successfully!');
    }
    
    function startTimer() {
        appState.recordingTime = 0;
        updateTimerDisplay();
        
        appState.timerInterval = setInterval(() => {
            appState.recordingTime++;
            updateTimerDisplay();
        }, 1000);
    }
    
    function stopTimer() {
        if (appState.timerInterval) {
            clearInterval(appState.timerInterval);
            appState.timerInterval = null;
        }
    }
    
    function updateTimerDisplay() {
        timer.textContent = formatTime(appState.recordingTime);
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }
    
    function updateNotesList() {
        // Update notes count
        notesCount.textContent = appState.notes.length;
        
        // Show/hide empty state
        if (appState.notes.length === 0) {
            emptyState.style.display = 'block';
            notesList.innerHTML = '';
            return;
        }
        
        emptyState.style.display = 'none';
        
        // Create note items
        notesList.innerHTML = '';
        appState.notes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.dataset.id = note.id;
            
            noteItem.innerHTML = `
                <div class="note-info">
                    <div class="note-title">${note.title}</div>
                    <div class="note-date">${note.date}</div>
                    <div class="note-duration">Duration: ${note.duration}</div>
                </div>
                <div class="note-actions">
                    <button class="note-action-btn play-note-btn">
                        <i class="fas fa-play"></i> Play
                    </button>
                    <button class="note-action-btn delete-note-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            notesList.appendChild(noteItem);
            
            // Add event listeners to note buttons
            const playBtn = noteItem.querySelector('.play-note-btn');
            const deleteBtn = noteItem.querySelector('.delete-note-btn');
            
            playBtn.addEventListener('click', () => playNote(note));
            deleteBtn.addEventListener('click', () => deleteNote(note.id));
        });
    }
    
    function playNote(note) {
        // Set current audio
        if (appState.currentAudio) {
            appState.currentAudio.pause();
            appState.currentAudio = null;
        }
        
        appState.currentAudio = new Audio(note.audioUrl);
        appState.currentNoteId = note.id;
        
        // Update modal with note info
        modalTitle.textContent = 'Playing Voice Note';
        audioTitle.textContent = note.title;
        audioDate.textContent = note.date;
        
        // Setup audio events
        appState.currentAudio.addEventListener('loadedmetadata', () => {
            if (!isNaN(appState.currentAudio.duration)) {
                duration.textContent = formatTime(appState.currentAudio.duration);
                progressBar.max = Math.floor(appState.currentAudio.duration);
            }
        });
        
        appState.currentAudio.addEventListener('timeupdate', () => {
            if (appState.currentAudio && !isNaN(appState.currentAudio.duration)) {
                const current = Math.floor(appState.currentAudio.currentTime);
                const total = Math.floor(appState.currentAudio.duration);
                
                currentTime.textContent = formatTime(current);
                progressBar.value = current;
                
                // Update progress bar max if needed
                if (progressBar.max !== total) {
                    progressBar.max = total;
                    duration.textContent = formatTime(total);
                }
            }
        });
        
        appState.currentAudio.addEventListener('ended', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            progressBar.value = 0;
            currentTime.textContent = '00:00';
        });
        
        // Show modal
        audioPlayerModal.style.display = 'flex';
        
        // Play audio
        appState.currentAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
    
    function togglePlayPause() {
        if (!appState.currentAudio) return;
        
        if (appState.currentAudio.paused) {
            appState.currentAudio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        } else {
            appState.currentAudio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        }
    }
    
    function seekAudio(seconds) {
        if (!appState.currentAudio) return;
        
        const newTime = appState.currentAudio.currentTime + seconds;
        appState.currentAudio.currentTime = Math.max(0, Math.min(newTime, appState.currentAudio.duration));
    }
    
    function updateAudioProgress() {
        if (!appState.currentAudio) return;
        
        appState.currentAudio.currentTime = progressBar.value;
    }
    
    function deleteCurrentNote() {
        if (!appState.currentNoteId) return;
        
        deleteNote(appState.currentNoteId);
        audioPlayerModal.style.display = 'none';
        
        if (appState.currentAudio) {
            appState.currentAudio.pause();
            appState.currentAudio = null;
        }
    }
    
    function deleteNote(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            // Remove note from array
            appState.notes = appState.notes.filter(note => note.id !== id);
            
            // Save to storage
            saveNotesToStorage();
            
            // Update UI
            updateNotesList();
            
            // Show notification
            showNotification('Note deleted successfully!');
        }
    }
    
    function downloadCurrentAudio() {
        if (!appState.currentNoteId || !appState.currentAudio) return;
        
        const note = appState.notes.find(n => n.id === appState.currentNoteId);
        if (!note) return;
        
        downloadAudio(note);
    }
    
    function downloadAudio(note) {
        const url = note.audioUrl;
        const a = document.createElement('a');
        a.href = url;
        a.download = `${note.title.replace(/\s+/g, '_')}_${note.date.replace(/,/g, '')}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        showNotification('Download started!');
    }
    
    function filterNotes() {
        const searchTerm = searchNotes.value.toLowerCase().trim();
        
        if (!searchTerm) {
            updateNotesList();
            return;
        }
        
        const filteredNotes = appState.notes.filter(note => 
            note.title.toLowerCase().includes(searchTerm) || 
            note.date.toLowerCase().includes(searchTerm)
        );
        
        // Update notes count for filtered results
        notesCount.textContent = `${filteredNotes.length} of ${appState.notes.length} notes`;
        
        // Show/hide empty state
        if (filteredNotes.length === 0) {
            emptyState.style.display = 'block';
            emptyState.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No notes found</h3>
                <p>Try a different search term</p>
            `;
            notesList.innerHTML = '';
            return;
        }
        
        emptyState.style.display = 'none';
        
        // Create filtered note items
        notesList.innerHTML = '';
        filteredNotes.forEach(note => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.dataset.id = note.id;
            
            noteItem.innerHTML = `
                <div class="note-info">
                    <div class="note-title">${note.title}</div>
                    <div class="note-date">${note.date}</div>
                    <div class="note-duration">Duration: ${note.duration}</div>
                </div>
                <div class="note-actions">
                    <button class="note-action-btn play-note-btn">
                        <i class="fas fa-play"></i> Play
                    </button>
                    <button class="note-action-btn delete-note-btn">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            
            notesList.appendChild(noteItem);
            
            // Add event listeners
            const playBtn = noteItem.querySelector('.play-note-btn');
            const deleteBtn = noteItem.querySelector('.delete-note-btn');
            
            playBtn.addEventListener('click', () => playNote(note));
            deleteBtn.addEventListener('click', () => deleteNote(note.id));
        });
    }
    
    function saveNotesToStorage() {
        try {
            // We can't store Blobs directly in localStorage, so we store metadata only
            const notesForStorage = appState.notes.map(note => {
                return {
                    id: note.id,
                    title: note.title,
                    date: note.date,
                    duration: note.duration,
                    timestamp: note.timestamp,
                    // Note: In a production app, you would use IndexedDB for storing audio files
                    // For this demo, we'll lose the audio when page refreshes but keep metadata
                };
            });
            
            localStorage.setItem('voiceNotes', JSON.stringify(notesForStorage));
        } catch (error) {
            showNotification('Failed to save notes. Storage may be full.', 'error');
        }
    }
    
    function loadNotesFromStorage() {
        try {
            const storedNotes = localStorage.getItem('voiceNotes');
            
            if (storedNotes) {
                const parsedNotes = JSON.parse(storedNotes);
                
                // Convert back to note objects
                // Note: Audio URLs will be lost on refresh in this demo version
                // In a real app, you would reconstruct Blobs from IndexedDB
                appState.notes = parsedNotes.map(note => ({
                    ...note,
                    audioUrl: `data:audio/webm;base64,placeholder_${note.id}` // Placeholder
                }));
                
                // Sort by timestamp (newest first)
                appState.notes.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
            }
        } catch (error) {
            showNotification('Failed to load saved notes.', 'error');
            appState.notes = [];
        }
    }
    
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        const bgColor = type === 'error' 
            ? 'linear-gradient(to right, #dc3545, #c82333)' 
            : 'linear-gradient(to right, #28a745, #20c997)';
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + R to start recording
        if ((e.ctrlKey || e.metaKey) && e.key === 'r' && !appState.isRecording) {
            e.preventDefault();
            startRecording();
        }
        
        // Ctrl/Cmd + S to stop recording
        if ((e.ctrlKey || e.metaKey) && e.key === 's' && appState.isRecording) {
            e.preventDefault();
            stopRecording();
        }
        
        // Escape to close modal
        if (e.key === 'Escape' && audioPlayerModal.style.display === 'flex') {
            audioPlayerModal.style.display = 'none';
            if (appState.currentAudio) {
                appState.currentAudio.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
            }
        }
    });
});