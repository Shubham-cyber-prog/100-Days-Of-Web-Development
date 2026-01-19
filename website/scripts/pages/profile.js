/**
 * Profile Page Logic
 * Generates the 100-day mission log grid with interactivity.
 * Handles Edit Profile modal and Share Profile functionality.
 */

// Auth Guard (Simplified for static view)
const authToken = sessionStorage.getItem('authToken');
if (!authToken && window.location.hostname !== 'localhost' && !window.location.protocol.includes('file')) {
    // window.location.href = '../pages/login.html';
}

const gridContainer = document.getElementById('missionGrid');
const percentageDisplay = document.querySelector('.text-flame'); // The "45%" text

// ============================================================
// MISSION GRID FUNCTIONALITY
// ============================================================

// Initialize Progress
// Try to load from storage, otherwise default to 0 (all false)
const savedProgress = localStorage.getItem('zenith_mission_progress');
let progressData = savedProgress ? JSON.parse(savedProgress) : new Array(100).fill(false);

// Ensure data integrity (if resized or old format)
if (progressData.length !== 100) {
    progressData = new Array(100).fill(false);
}

function updateStats() {
    const completedCount = progressData.filter(Boolean).length;
    if (percentageDisplay) {
        percentageDisplay.textContent = `${completedCount}%`;
    }
}

function toggleDay(index) {
    progressData[index] = !progressData[index];
    saveProgress();
    renderGrid(); // Re-render to update state
    updateStats();
}

function saveProgress() {
    localStorage.setItem('zenith_mission_progress', JSON.stringify(progressData));
}

function renderGrid() {
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    progressData.forEach((isCompleted, index) => {
        const dayNumber = index + 1;
        const cell = document.createElement('div');

        // Base class + completed state
        cell.className = `mission-cell ${isCompleted ? 'completed' : ''}`;

        // Tooltip
        cell.title = `Day ${dayNumber}: ${isCompleted ? 'Mission Accomplished' : 'Pending Deployment'}`;

        // Interaction
        cell.style.cursor = 'pointer';
        cell.onclick = () => toggleDay(index);

        gridContainer.appendChild(cell);
    });

    updateStats();
}

// ============================================================
// PROFILE DATA MANAGEMENT
// ============================================================

// Load profile data from localStorage
function loadProfileData() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        return JSON.parse(savedProfile);
    }
    // Default profile data
    return {
    username: 'Shubham-cyber-prog',
    handle: '@ShubhamCyberProg',
    avatar: 'https://avatars.githubusercontent.com/Shubham-cyber-prog',
    rank: 'Developer',
    level: 2,
    bio: 'Frontend Developer | MERN Stack Learner | Open Source Contributor | Building real-world projects',
    location: 'India',
    website: 'https://tripolio.netlify.app/', 
    github: 'https://github.com/Shubham-cyber-prog'
};

}

// Save profile data to localStorage
function saveProfileData(profileData) {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
}

let userProfile = loadProfileData();

// ============================================================
// EDIT PROFILE MODAL
// ============================================================

function createEditProfileModal() {
    // Check if modal already exists
    if (document.getElementById('editProfileModal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'editProfileModal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            background: var(--bg-surface);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            backdrop-filter: blur(20px);
            animation: slideUp 0.3s ease-out;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
                <h2 style="margin: 0;">Edit Profile</h2>
                <button id="closeEditModal" style="
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>

            <form id="editProfileForm" style="display: flex; flex-direction: column; gap: var(--space-4);">
                <div>
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Username</label>
                    <input type="text" id="usernameInput" placeholder="Enter your username" style="
                        width: 100%;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid var(--glass-border);
                        border-radius: 6px;
                        color: var(--text-primary);
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>

                <div>
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Handle (@username)</label>
                    <input type="text" id="handleInput" placeholder="@handle" style="
                        width: 100%;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid var(--glass-border);
                        border-radius: 6px;
                        color: var(--text-primary);
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>

                <div>
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Bio</label>
                    <textarea id="bioInput" placeholder="Tell us about yourself" style="
                        width: 100%;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid var(--glass-border);
                        border-radius: 6px;
                        color: var(--text-primary);
                        font-size: 14px;
                        box-sizing: border-box;
                        resize: vertical;
                        min-height: 80px;
                        font-family: inherit;
                    "></textarea>
                </div>

                <div>
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Location</label>
                    <input type="text" id="locationInput" placeholder="Your location" style="
                        width: 100%;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid var(--glass-border);
                        border-radius: 6px;
                        color: var(--text-primary);
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>

                <div>
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Website</label>
                    <input type="url" id="websiteInput" placeholder="https://example.com" style="
                        width: 100%;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid var(--glass-border);
                        border-radius: 6px;
                        color: var(--text-primary);
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>

                <div>
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">GitHub Profile</label>
                    <input type="url" id="githubInput" placeholder="https://github.com/username" style="
                        width: 100%;
                        padding: 10px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid var(--glass-border);
                        border-radius: 6px;
                        color: var(--text-primary);
                        font-size: 14px;
                        box-sizing: border-box;
                    ">
                </div>

                <div style="display: flex; gap: var(--space-3); margin-top: var(--space-4);">
                    <button type="submit" class="btn btn-primary" style="flex: 1;">Save Changes</button>
                    <button type="button" id="cancelEditModal" class="btn btn-secondary" style="flex: 1;">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    document.getElementById('closeEditModal').addEventListener('click', closeEditModal);
    document.getElementById('cancelEditModal').addEventListener('click', closeEditModal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeEditModal();
    });

    // Form submission
    document.getElementById('editProfileForm').addEventListener('submit', handleEditProfileSubmit);
}

function openEditModal() {
    createEditProfileModal();
    const modal = document.getElementById('editProfileModal');
    modal.style.display = 'flex';

    // Populate form with current data
    document.getElementById('usernameInput').value = userProfile.username;
    document.getElementById('handleInput').value = userProfile.handle;
    document.getElementById('bioInput').value = userProfile.bio;
    document.getElementById('locationInput').value = userProfile.location;
    document.getElementById('websiteInput').value = userProfile.website;
    document.getElementById('githubInput').value = userProfile.github;
}

function closeEditModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleEditProfileSubmit(e) {
    e.preventDefault();

    // Collect form data
    userProfile.username = document.getElementById('usernameInput').value;
    userProfile.handle = document.getElementById('handleInput').value;
    userProfile.bio = document.getElementById('bioInput').value;
    userProfile.location = document.getElementById('locationInput').value;
    userProfile.website = document.getElementById('websiteInput').value;
    userProfile.github = document.getElementById('githubInput').value;

    // Save to localStorage
    saveProfileData(userProfile);

    // Update page display
    updateProfileDisplay();

    // Close modal
    closeEditModal();

    // Show success message
    showSuccessMessage('Profile updated successfully!');
}

function updateProfileDisplay() {
    // Update username
    const usernameEl = document.querySelector('h1');
    if (usernameEl) {
        usernameEl.textContent = userProfile.username;
    }

    // Update handle
    const handleEl = document.querySelector('.text-tertiary');
    if (handleEl) {
        handleEl.textContent = userProfile.handle;
    }
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================================
// SHARE PROFILE FUNCTIONALITY
// ============================================================

function createShareModal() {
    // Check if modal already exists
    if (document.getElementById('shareProfileModal')) {
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'shareProfileModal';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    `;

    const profileUrl = `${window.location.origin}${window.location.pathname}?user=${userProfile.handle.replace('@', '')}`;

    modal.innerHTML = `
        <div class="modal-content" style="
            background: var(--bg-surface);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            max-width: 450px;
            width: 90%;
            backdrop-filter: blur(20px);
            animation: slideUp 0.3s ease-out;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
                <h2 style="margin: 0;">Share Profile</h2>
                <button id="closeShareModal" style="
                    background: none;
                    border: none;
                    color: var(--text-primary);
                    font-size: 24px;
                    cursor: pointer;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>

            <div style="display: flex; flex-direction: column; gap: var(--space-4);">
                <div>
                    <label style="display: block; margin-bottom: var(--space-2); font-weight: 600;">Profile Link</label>
                    <div style="display: flex; gap: var(--space-2);">
                        <input type="text" id="profileLinkInput" value="${profileUrl}" readonly style="
                            flex: 1;
                            padding: 10px;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid var(--glass-border);
                            border-radius: 6px;
                            color: var(--text-primary);
                            font-size: 12px;
                            box-sizing: border-box;
                        ">
                        <button id="copyLinkBtn" class="btn btn-primary" style="padding: 10px 16px; white-space: nowrap;">Copy Link</button>
                    </div>
                </div>

                <div>
                    <p style="color: var(--text-secondary); font-size: 14px; margin: 0 0 var(--space-3) 0; font-weight: 600;">Share on Social</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2);">
                        <button id="shareTwitter" style="
                            padding: 12px;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid var(--glass-border);
                            border-radius: 6px;
                            color: var(--text-primary);
                            cursor: pointer;
                            transition: all 0.2s;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                        ">
                            <svg class="icon icon-sm" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                                <path fill="currentColor" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                            </svg>
                            Twitter
                        </button>
                        <button id="shareLinkedin" style="
                            padding: 12px;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid var(--glass-border);
                            border-radius: 6px;
                            color: var(--text-primary);
                            cursor: pointer;
                            transition: all 0.2s;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                        ">
                            <svg class="icon icon-sm" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                                <path fill="currentColor" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                            </svg>
                            LinkedIn
                        </button>
                        <button id="shareWhatsapp" style="
                            padding: 12px;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid var(--glass-border);
                            border-radius: 6px;
                            color: var(--text-primary);
                            cursor: pointer;
                            transition: all 0.2s;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                        ">
                            <svg class="icon icon-sm" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                                <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.781 1.227l-.384.214-.397-.013c-5.741-.559-10.514-5.376-10.514-11.112 0-.342.027-.681.08-1.018C1.912.988 6.685.139 11.8.139c5.487 0 9.933 3.007 12.334 7.41 1.946-1.277 4.04-2.036 6.3-2.036 3.395 0 6.26 1.813 7.81 4.453.333.635.55 1.328.55 2.062 0 5.736-4.773 10.553-10.514 11.112l-.397.013-.384-.214a9.87 9.87 0 00-4.781-1.227z"/>
                            </svg>
                            WhatsApp
                        </button>
                        <button id="shareFacebook" style="
                            padding: 12px;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid var(--glass-border);
                            border-radius: 6px;
                            color: var(--text-primary);
                            cursor: pointer;
                            transition: all 0.2s;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                        ">
                            <svg class="icon icon-sm" viewBox="0 0 24 24" style="width: 16px; height: 16px;">
                                <path fill="currentColor" d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3z"/>
                            </svg>
                            Facebook
                        </button>
                    </div>
                </div>

                <button id="closeShareModalBtn" class="btn btn-secondary" style="width: 100%;">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    document.getElementById('closeShareModal').addEventListener('click', closeShareModal);
    document.getElementById('closeShareModalBtn').addEventListener('click', closeShareModal);

    document.getElementById('copyLinkBtn').addEventListener('click', copyProfileLink);
    document.getElementById('shareTwitter').addEventListener('click', () => shareToTwitter(profileUrl));
    document.getElementById('shareLinkedin').addEventListener('click', () => shareToLinkedin(profileUrl));
    document.getElementById('shareWhatsapp').addEventListener('click', () => shareToWhatsapp(profileUrl));
    document.getElementById('shareFacebook').addEventListener('click', () => shareToFacebook(profileUrl));

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeShareModal();
    });
}

function openShareModal() {
    createShareModal();
    const modal = document.getElementById('shareProfileModal');
    modal.style.display = 'flex';
}

function closeShareModal() {
    const modal = document.getElementById('shareProfileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function copyProfileLink() {
    const linkInput = document.getElementById('profileLinkInput');
    linkInput.select();
    document.execCommand('copy');
    showSuccessMessage('Profile link copied to clipboard!');
}

function shareToTwitter(url) {
    const text = `Check out my 100 Days of Web Dev profile! I'm learning by building daily. ${userProfile.handle}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareToLinkedin(url) {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
}

function shareToWhatsapp(url) {
    const text = `Check out my 100 Days of Web Dev profile!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
}

function shareToFacebook(url) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
}

// ============================================================
// BUTTON EVENT HANDLERS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Find and attach handlers to Edit Profile and Share Profile buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn) => {
        if (btn.textContent.includes('Edit Profile')) {
            btn.addEventListener('click', openEditModal);
        }
        if (btn.textContent.includes('Share')) {
            btn.addEventListener('click', openShareModal);
        }
    });
});

// ============================================================
// GRID INITIALIZATION
// ============================================================

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGrid);
} else {
    renderGrid();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid var(--glass-border) !important;
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15) !important;
    }
`;
document.head.appendChild(style);
