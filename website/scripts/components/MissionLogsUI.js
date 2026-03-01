/**
 * Mission Logs UI Component
 * User interface for encrypted private notes
 * 
 * Features:
 * - Create/Edit/Delete encrypted logs
 * - Search and filter logs
 * - Export functionality
 * - Statistics dashboard
 */

import missionLogsManager from '../managers/MissionLogsManager.js';
import authProvider from '../core/authProvider.js';

class MissionLogsUI {
    constructor() {
        this.currentLog = null;
        this.allLogs = [];
        this.filteredLogs = [];
    }

    /**
     * Initialize the Mission Logs UI
     */
    async initialize(containerId) {
        this.container = document.getElementById(containerId);

        if (!this.container) {
            console.error('Mission Logs container not found');
            return;
        }

        // Check if user is authenticated and encryption is ready
        const user = authProvider.getCurrentUser();
        if (!user) {
            this.showLoginPrompt();
            return;
        }

        if (!authProvider.isEncryptionInitialized()) {
            this.showEncryptionNotReady();
            return;
        }

        // Initialize manager
        missionLogsManager.initialize(user.uid);

        // Render UI
        await this.render();

        // Load logs
        await this.loadLogs();

        // Bind events
        this.bindEvents();
    }

    /**
     * Render the main UI
     */
    async render() {
        this.container.innerHTML = `
      <div class="mission-logs-wrapper">
        <!-- Header -->
        <div class="mission-logs-header">
          <div class="header-title">
            <i class="fas fa-lock"></i>
            <h2>🔐 Mission Logs</h2>
            <span class="encrypted-badge">Zero-Knowledge Encrypted</span>
          </div>
          <div class="header-actions">
            <button class="btn-icon" id="refreshLogsBtn" title="Refresh">
              <i class="fas fa-sync-alt"></i>
            </button>
            <button class="btn-icon" id="exportLogsBtn" title="Export Logs">
              <i class="fas fa-download"></i>
            </button>
            <button class="btn-primary" id="newLogBtn">
              <i class="fas fa-plus"></i>
              New Log
            </button>
          </div>
        </div>

        <!-- Search and Filter -->
        <div class="mission-logs-toolbar">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchLogsInput" placeholder="Search logs..." />
          </div>
          <div class="filter-tags" id="filterTags">
            <!-- Tags will be populated dynamically -->
          </div>
        </div>

        <!-- Stats Dashboard -->
        <div class="logs-stats" id="logsStats">
          <div class="stat-item">
            <span class="stat-value" id="totalLogsCount">0</span>
            <span class="stat-label">Total Logs</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" id="daysWithLogsCount">0</span>
            <span class="stat-label">Days Logged</span>
          </div>
          <div class="stat-item">
            <span class="stat-value" id="totalWordsCount">0</span>
            <span class="stat-label">Words Written</span>
          </div>
        </div>

        <!-- Logs List -->
        <div class="logs-list" id="logsList">
          <div class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Decrypting logs...</p>
          </div>
        </div>

        <!-- Log Editor Modal -->
        <div class="modal" id="logEditorModal">
          <div class="modal-overlay" id="modalOverlay"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="modalTitle">New Mission Log</h3>
              <button class="modal-close" id="modalCloseBtn">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="logDayNumber">Day Number</label>
                <input type="number" id="logDayNumber" min="1" max="100" placeholder="1-100" required />
              </div>
              <div class="form-group">
                <label for="logTitle">Title</label>
                <input type="text" id="logTitle" placeholder="What did you work on?" required />
              </div>
              <div class="form-group">
                <label for="logContent">Private Notes</label>
                <textarea id="logContent" rows="8" placeholder="Your thoughts, challenges, learnings... (encrypted)"></textarea>
              </div>
              <div class="form-group">
                <label for="logMood">Mood</label>
                <select id="logMood">
                  <option value="excited">😄 Excited</option>
                  <option value="productive">💪 Productive</option>
                  <option value="neutral" selected>😐 Neutral</option>
                  <option value="challenged">🤔 Challenged</option>
                  <option value="frustrated">😤 Frustrated</option>
                </select>
              </div>
              <div class="form-group">
                <label for="logTags">Tags (comma-separated)</label>
                <input type="text" id="logTags" placeholder="HTML, CSS, JavaScript" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-secondary" id="cancelLogBtn">Cancel</button>
              <button class="btn-primary" id="saveLogBtn">
                <i class="fas fa-save"></i>
                Save Log
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    /**
     * Load and decrypt all logs
     */
    async loadLogs() {
        const logsList = document.getElementById('logsList');

        try {
            // Show loading
            logsList.innerHTML = `
        <div class="loading-state">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Decrypting logs...</p>
        </div>
      `;

            // Load logs
            this.allLogs = await missionLogsManager.getAllLogs();
            this.filteredLogs = [...this.allLogs];

            // Update stats
            await this.updateStats();

            // Render logs
            this.renderLogs();
        } catch (error) {
            console.error('Error loading logs:', error);
            logsList.innerHTML = `
        <div class="error-state">
          <i class="fas fa-exclamation-triangle"></i>
          <p>Failed to load logs: ${error.message}</p>
          <button class="btn-primary" onclick="window.location.reload()">Retry</button>
        </div>
      `;
        }
    }

    /**
     * Render logs list
     */
    renderLogs() {
        const logsList = document.getElementById('logsList');

        if (this.filteredLogs.length === 0) {
            logsList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-book-open"></i>
          <h3>No Mission Logs Yet</h3>
          <p>Start documenting your learning journey with encrypted private notes</p>
          <button class="btn-primary" id="createFirstLogBtn">
            <i class="fas fa-plus"></i>
            Create First Log
          </button>
        </div>
      `;

            document.getElementById('createFirstLogBtn')?.addEventListener('click', () => {
                this.showLogEditor();
            });

            return;
        }

        const logsHTML = this.filteredLogs.map(log => this.renderLogCard(log)).join('');
        logsList.innerHTML = logsHTML;

        // Bind log card events
        this.bindLogCardEvents();
    }

    /**
     * Render a single log card
     */
    renderLogCard(log) {
        if (log.error) {
            return `
        <div class="log-card error">
          <div class="log-header">
            <span class="log-day">Day ${log.dayNumber}</span>
            <span class="log-error">⚠️ Decryption Failed</span>
          </div>
          <p class="log-error-message">${log.error}</p>
        </div>
      `;
        }

        const moodEmoji = {
            'excited': '😄',
            'productive': '💪',
            'neutral': '😐',
            'challenged': '🤔',
            'frustrated': '😤'
        }[log.mood] || '😐';

        const date = new Date(log.createdAt).toLocaleDateString();
        const preview = log.content ? log.content.substring(0, 150) + '...' : 'No content';

        return `
      <div class="log-card" data-log-id="${log.id}">
        <div class="log-header">
          <div class="log-meta">
            <span class="log-day">Day ${log.dayNumber}</span>
            <span class="log-mood">${moodEmoji}</span>
            <span class="log-date">${date}</span>
          </div>
          <div class="log-actions">
            <button class="btn-icon edit-log-btn" data-log-id="${log.id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon delete-log-btn" data-log-id="${log.id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <h3 class="log-title">${this.escapeHtml(log.title)}</h3>
        <p class="log-preview">${this.escapeHtml(preview)}</p>
        ${log.tags && log.tags.length > 0 ? `
          <div class="log-tags">
            ${log.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
    }

    /**
     * Update statistics
     */
    async updateStats() {
        try {
            const stats = await missionLogsManager.getStats();

            document.getElementById('totalLogsCount').textContent = stats.totalLogs;
            document.getElementById('daysWithLogsCount').textContent = stats.daysWithLogs;
            document.getElementById('totalWordsCount').textContent = stats.totalWords.toLocaleString();
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    /**
     * Show log editor modal
     */
    showLogEditor(log = null) {
        this.currentLog = log;
        const modal = document.getElementById('logEditorModal');
        const modalTitle = document.getElementById('modalTitle');

        if (log) {
            // Edit mode
            modalTitle.textContent = 'Edit Mission Log';
            document.getElementById('logDayNumber').value = log.dayNumber;
            document.getElementById('logTitle').value = log.title;
            document.getElementById('logContent').value = log.content || '';
            document.getElementById('logMood').value = log.mood || 'neutral';
            document.getElementById('logTags').value = log.tags ? log.tags.join(', ') : '';
        } else {
            // Create mode
            modalTitle.textContent = 'New Mission Log';
            document.getElementById('logDayNumber').value = '';
            document.getElementById('logTitle').value = '';
            document.getElementById('logContent').value = '';
            document.getElementById('logMood').value = 'neutral';
            document.getElementById('logTags').value = '';
        }

        modal.classList.add('active');
    }

    /**
     * Hide log editor modal
     */
    hideLogEditor() {
        const modal = document.getElementById('logEditorModal');
        modal.classList.remove('active');
        this.currentLog = null;
    }

    /**
     * Save log (create or update)
     */
    async saveLog() {
        const dayNumber = parseInt(document.getElementById('logDayNumber').value);
        const title = document.getElementById('logTitle').value.trim();
        const content = document.getElementById('logContent').value.trim();
        const mood = document.getElementById('logMood').value;
        const tagsInput = document.getElementById('logTags').value.trim();
        const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(t => t) : [];

        if (!dayNumber || dayNumber < 1 || dayNumber > 100) {
            alert('Please enter a valid day number (1-100)');
            return;
        }

        if (!title) {
            alert('Please enter a title');
            return;
        }

        try {
            const logData = { dayNumber, title, content, mood, tags };

            if (this.currentLog) {
                // Update existing log
                await missionLogsManager.updateLog(this.currentLog.id, logData);
            } else {
                // Create new log
                await missionLogsManager.createLog(logData);
            }

            // Reload logs
            await this.loadLogs();

            // Close modal
            this.hideLogEditor();

            // Show success message
            this.showToast('✅ Log saved successfully');
        } catch (error) {
            console.error('Error saving log:', error);
            alert('Failed to save log: ' + error.message);
        }
    }

    /**
     * Delete log
     */
    async deleteLog(logId) {
        if (!confirm('Are you sure you want to delete this log? This cannot be undone.')) {
            return;
        }

        try {
            await missionLogsManager.deleteLog(logId);
            await this.loadLogs();
            this.showToast('🗑️ Log deleted');
        } catch (error) {
            console.error('Error deleting log:', error);
            alert('Failed to delete log: ' + error.message);
        }
    }

    /**
     * Export logs
     */
    async exportLogs() {
        try {
            const jsonData = await missionLogsManager.exportLogs();
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mission-logs-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);

            this.showToast('📥 Logs exported successfully');
        } catch (error) {
            console.error('Error exporting logs:', error);
            alert('Failed to export logs: ' + error.message);
        }
    }

    /**
     * Search logs
     */
    async searchLogs(keyword) {
        if (!keyword.trim()) {
            this.filteredLogs = [...this.allLogs];
        } else {
            this.filteredLogs = await missionLogsManager.searchLogs(keyword);
        }
        this.renderLogs();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // New log button
        document.getElementById('newLogBtn')?.addEventListener('click', () => {
            this.showLogEditor();
        });

        // Refresh button
        document.getElementById('refreshLogsBtn')?.addEventListener('click', () => {
            this.loadLogs();
        });

        // Export button
        document.getElementById('exportLogsBtn')?.addEventListener('click', () => {
            this.exportLogs();
        });

        // Modal close
        document.getElementById('modalCloseBtn')?.addEventListener('click', () => {
            this.hideLogEditor();
        });

        document.getElementById('modalOverlay')?.addEventListener('click', () => {
            this.hideLogEditor();
        });

        // Cancel button
        document.getElementById('cancelLogBtn')?.addEventListener('click', () => {
            this.hideLogEditor();
        });

        // Save button
        document.getElementById('saveLogBtn')?.addEventListener('click', () => {
            this.saveLog();
        });

        // Search input
        document.getElementById('searchLogsInput')?.addEventListener('input', (e) => {
            this.searchLogs(e.target.value);
        });
    }

    /**
     * Bind log card events
     */
    bindLogCardEvents() {
        // Edit buttons
        document.querySelectorAll('.edit-log-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const logId = btn.dataset.logId;
                const log = this.allLogs.find(l => l.id === logId);
                if (log) {
                    this.showLogEditor(log);
                }
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-log-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const logId = btn.dataset.logId;
                await this.deleteLog(logId);
            });
        });
    }

    /**
     * Show login prompt
     */
    showLoginPrompt() {
        this.container.innerHTML = `
      <div class="auth-prompt">
        <i class="fas fa-lock"></i>
        <h3>Authentication Required</h3>
        <p>Please log in to access your encrypted mission logs</p>
        <a href="./login.html" class="btn-primary">Go to Login</a>
      </div>
    `;
    }

    /**
     * Show encryption not ready message
     */
    showEncryptionNotReady() {
        this.container.innerHTML = `
      <div class="auth-prompt">
        <i class="fas fa-key"></i>
        <h3>Encryption Not Initialized</h3>
        <p>Please log in with your password to initialize encryption</p>
        <button class="btn-primary" onclick="window.location.reload()">Retry</button>
      </div>
    `;
    }

    /**
     * Show toast notification
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Inject component styles
     */
    injectStyles() {
        if (document.getElementById('mission-logs-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'mission-logs-styles';
        styles.textContent = `
      .mission-logs-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .mission-logs-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .header-title {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .header-title h2 {
        margin: 0;
        font-size: 1.8rem;
        color: var(--text-primary, #e6edf3);
      }

      .encrypted-badge {
        background: rgba(88, 166, 255, 0.2);
        color: #58a6ff;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .header-actions {
        display: flex;
        gap: 0.5rem;
      }

      .btn-icon {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text-secondary, #8b949e);
        padding: 0.5rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-icon:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary, #e6edf3);
      }

      .btn-primary {
        background: #58a6ff;
        color: #000;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s;
      }

      .btn-primary:hover {
        background: #79c0ff;
        transform: translateY(-1px);
      }

      .mission-logs-toolbar {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .search-box {
        flex: 1;
        position: relative;
      }

      .search-box i {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-secondary, #8b949e);
      }

      .search-box input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: var(--text-primary, #e6edf3);
        font-size: 0.9rem;
      }

      .search-box input:focus {
        outline: none;
        border-color: #58a6ff;
        background: rgba(255, 255, 255, 0.08);
      }

      .logs-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .stat-item {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 1.5rem;
        text-align: center;
      }

      .stat-value {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #58a6ff;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        color: var(--text-secondary, #8b949e);
        font-size: 0.85rem;
      }

      .logs-list {
        display: grid;
        gap: 1rem;
      }

      .log-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.2s;
        cursor: pointer;
      }

      .log-card:hover {
        border-color: #58a6ff;
        transform: translateY(-2px);
      }

      .log-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .log-meta {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .log-day {
        background: rgba(88, 166, 255, 0.2);
        color: #58a6ff;
        padding: 0.25rem 0.75rem;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 600;
      }

      .log-mood {
        font-size: 1.2rem;
      }

      .log-date {
        color: var(--text-secondary, #8b949e);
        font-size: 0.85rem;
      }

      .log-actions {
        display: flex;
        gap: 0.5rem;
      }

      .log-title {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        color: var(--text-primary, #e6edf3);
      }

      .log-preview {
        color: var(--text-secondary, #8b949e);
        margin: 0 0 1rem 0;
        line-height: 1.6;
      }

      .log-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .tag {
        background: rgba(139, 92, 246, 0.2);
        color: #a78bfa;
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
      }

      .loading-state, .empty-state, .error-state, .auth-prompt {
        text-align: center;
        padding: 4rem 2rem;
      }

      .loading-state i, .empty-state i, .error-state i, .auth-prompt i {
        font-size: 3rem;
        color: #58a6ff;
        margin-bottom: 1rem;
      }

      .empty-state h3, .error-state h3, .auth-prompt h3 {
        margin: 1rem 0 0.5rem 0;
        color: var(--text-primary, #e6edf3);
      }

      .empty-state p, .error-state p, .auth-prompt p {
        color: var(--text-secondary, #8b949e);
        margin-bottom: 2rem;
      }

      /* Modal Styles */
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
      }

      .modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }

      .modal-content {
        position: relative;
        background: #161b22;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        z-index: 10001;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .modal-header h3 {
        margin: 0;
        color: var(--text-primary, #e6edf3);
      }

      .modal-close {
        background: none;
        border: none;
        color: var(--text-secondary, #8b949e);
        cursor: pointer;
        font-size: 1.5rem;
      }

      .modal-body {
        padding: 1.5rem;
      }

      .form-group {
        margin-bottom: 1.5rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-primary, #e6edf3);
        font-weight: 600;
      }

      .form-group input,
      .form-group textarea,
      .form-group select {
        width: 100%;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: var(--text-primary, #e6edf3);
        font-family: inherit;
        font-size: 0.9rem;
      }

      .form-group input:focus,
      .form-group textarea:focus,
      .form-group select:focus {
        outline: none;
        border-color: #58a6ff;
        background: rgba(255, 255, 255, 0.08);
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .btn-secondary {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text-secondary, #8b949e);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
      }

      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary, #e6edf3);
      }

      /* Toast Notification */
      .toast-notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #161b22;
        border: 1px solid #58a6ff;
        color: var(--text-primary, #e6edf3);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s;
        z-index: 10002;
      }

      .toast-notification.show {
        opacity: 1;
        transform: translateY(0);
      }
    `;

        document.head.appendChild(styles);
    }
}

// Export singleton instance
const missionLogsUI = new MissionLogsUI();
export default missionLogsUI;

// Global export for non-module scripts
if (typeof window !== 'undefined') {
    window.MissionLogsUI = missionLogsUI;
}
