/**
 * Participant List Component
 * Real-time display of room participants with status indicators
 */

class ParticipantList {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            currentUserId: options.currentUserId,
            showStatus: options.showStatus !== false,
            showWorkingOn: options.showWorkingOn !== false,
            onUserClick: options.onUserClick || (() => {}),
            ...options
        };
        
        this.participants = [];
        
        this.init();
    }
    
    /**
     * Initialize the component
     */
    init() {
        if (!this.container) {
            console.error('ParticipantList: Container not found');
            return;
        }
        
        this.render();
    }
    
    /**
     * Update participants list
     * @param {Array} participants - Array of participant objects
     */
    updateParticipants(participants) {
        this.participants = this.sortParticipants(participants);
        this.render();
    }
    
    /**
     * Sort participants - current user first, then by status, then alphabetically
     */
    sortParticipants(participants) {
        return [...participants].sort((a, b) => {
            // Current user first
            if (a.id === this.options.currentUserId) return -1;
            if (b.id === this.options.currentUserId) return 1;
            
            // Online before offline
            if (a.status === 'online' && b.status !== 'online') return -1;
            if (b.status === 'online' && a.status !== 'online') return 1;
            
            // Alphabetically
            return (a.name || '').localeCompare(b.name || '');
        });
    }
    
    /**
     * Render the participant list
     */
    render() {
        if (!this.container) return;
        
        if (this.participants.length === 0) {
            this.container.innerHTML = `
                <div class="participants-empty">
                    <span class="empty-icon">👥</span>
                    <p>No participants yet</p>
                </div>
            `;
            return;
        }
        
        const online = this.participants.filter(p => p.status === 'online');
        const offline = this.participants.filter(p => p.status !== 'online');
        
        let html = `
            <div class="participants-header">
                <span class="participants-count">
                    <span class="online-dot"></span>
                    ${online.length} online
                </span>
            </div>
            <div class="participants-list">
        `;
        
        // Online participants
        online.forEach(participant => {
            html += this.renderParticipant(participant);
        });
        
        // Offline participants
        if (offline.length > 0) {
            html += `
                <div class="participants-divider">
                    <span>Offline (${offline.length})</span>
                </div>
            `;
            
            offline.forEach(participant => {
                html += this.renderParticipant(participant, true);
            });
        }
        
        html += '</div>';
        
        this.container.innerHTML = html;
        
        // Add click handlers
        this.container.querySelectorAll('.participant-item').forEach(item => {
            item.addEventListener('click', () => {
                const userId = item.dataset.userId;
                const participant = this.participants.find(p => p.id === userId);
                if (participant) {
                    this.options.onUserClick(participant);
                }
            });
        });
    }
    
    /**
     * Render single participant
     */
    renderParticipant(participant, isOffline = false) {
        const isCurrentUser = participant.id === this.options.currentUserId;
        const statusClass = this.getStatusClass(participant);
        const avatar = this.getAvatar(participant);
        
        return `
            <div class="participant-item ${isOffline ? 'offline' : ''} ${isCurrentUser ? 'current-user' : ''}" 
                 data-user-id="${participant.id}">
                <div class="participant-avatar ${statusClass}">
                    ${avatar}
                    <span class="presence-indicator ${participant.status || 'offline'}"></span>
                </div>
                <div class="participant-info">
                    <div class="participant-name">
                        ${this.escapeHtml(participant.name || 'Anonymous')}
                        ${isCurrentUser ? '<span class="you-badge">You</span>' : ''}
                        ${participant.isHost ? '<span class="host-badge">Host</span>' : ''}
                    </div>
                    ${this.options.showWorkingOn && participant.workingOn ? `
                        <div class="participant-working-on">
                            <span class="working-icon">📝</span>
                            ${this.escapeHtml(participant.workingOn)}
                        </div>
                    ` : ''}
                    ${this.options.showStatus && participant.pomodoroState ? `
                        <div class="participant-pomodoro ${participant.pomodoroState}">
                            ${this.getPomodoroIcon(participant.pomodoroState)}
                            ${this.formatPomodoroState(participant.pomodoroState, participant.pomodoroTime)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    /**
     * Get avatar HTML
     */
    getAvatar(participant) {
        if (participant.photoURL) {
            return `<img src="${participant.photoURL}" alt="${this.escapeHtml(participant.name)}" />`;
        }
        
        const initials = (participant.name || 'A')
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
        
        const color = this.getUserColor(participant.id);
        
        return `<span class="avatar-initials" style="background-color: ${color}">${initials}</span>`;
    }
    
    /**
     * Get status class for avatar ring
     */
    getStatusClass(participant) {
        if (participant.pomodoroState === 'focus') return 'focusing';
        if (participant.pomodoroState === 'break') return 'on-break';
        return '';
    }
    
    /**
     * Get Pomodoro state icon
     */
    getPomodoroIcon(state) {
        const icons = {
            focus: '🎯',
            break: '☕',
            idle: '⏸️'
        };
        return icons[state] || '';
    }
    
    /**
     * Format Pomodoro state text
     */
    formatPomodoroState(state, timeRemaining) {
        const stateText = {
            focus: 'Focusing',
            break: 'On break',
            idle: 'Idle'
        };
        
        let text = stateText[state] || state;
        
        if (timeRemaining && state !== 'idle') {
            text += ` (${this.formatTime(timeRemaining)})`;
        }
        
        return text;
    }
    
    /**
     * Format time in MM:SS
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    /**
     * Get consistent color for user
     */
    getUserColor(userId) {
        const colors = [
            '#f97316', '#84cc16', '#06b6d4', '#8b5cf6', 
            '#ec4899', '#14b8a6', '#f59e0b', '#6366f1'
        ];
        
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            hash = ((hash << 5) - hash) + userId.charCodeAt(i);
            hash = hash & hash;
        }
        
        return colors[Math.abs(hash) % colors.length];
    }
    
    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Get participant count
     */
    getCount() {
        return this.participants.length;
    }
    
    /**
     * Get online participant count
     */
    getOnlineCount() {
        return this.participants.filter(p => p.status === 'online').length;
    }
    
    /**
     * Destroy component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export { ParticipantList };
export default ParticipantList;
