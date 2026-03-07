/**
 * AI Overlay Component - The Neural Nexus HUD
 * Floating interactive UI for AI insights and quests
 * Issue #1174
 */

class AIOverlay {
    constructor() {
        this.container = null;
        this.isOpen = false;
        this.activeTab = 'insights'; // insights, quests, stats
        this.isMinimized = localStorage.getItem('nexus_minimized') === 'true';

        this.init();
    }

    /**
     * Initialize the HUD
     */
    init() {
        this.createContainer();
        this.injectStyles();
        this.render();
        this.setupEventListeners();

        console.log('🧠 AI HUD: Initialized');
    }

    /**
     * Create the HUD container
     */
    createContainer() {
        if (document.getElementById('neural-nexus-hud')) return;

        this.container = document.createElement('div');
        this.container.id = 'neural-nexus-hud';
        this.container.className = `neural-nexus-hud ${this.isMinimized ? 'minimized' : ''}`;
        document.body.appendChild(this.container);
    }

    /**
     * Inject specific CSS for the HUD
     */
    injectStyles() {
        if (document.getElementById('neural-nexus-styles')) return;

        const style = document.createElement('style');
        style.id = 'neural-nexus-styles';
        style.textContent = `
            .neural-nexus-hud {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 380px;
                height: 520px;
                background: rgba(13, 17, 23, 0.85);
                backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid rgba(139, 92, 246, 0.3);
                border-radius: 24px;
                z-index: 10000;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 
                            0 0 20px rgba(139, 92, 246, 0.2);
                transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                font-family: 'Inter', sans-serif;
            }

            .neural-nexus-hud.minimized {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                bottom: 24px;
                right: 24px;
                cursor: pointer;
            }

            .neural-nexus-hud.minimized .hud-content {
                display: none;
            }

            .hud-header {
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                background: linear-gradient(to right, rgba(139, 92, 246, 0.1), transparent);
            }

            .hud-title {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 14px;
                font-weight: 700;
                color: var(--accent-core, #8b5cf6);
                text-transform: uppercase;
                letter-spacing: 1.5px;
            }

            .hud-status-dot {
                width: 8px;
                height: 8px;
                background: #10b981;
                border-radius: 50%;
                box-shadow: 0 0 10px #10b981;
                animation: pulse 2s infinite;
            }

            .hud-controls {
                display: flex;
                gap: 8px;
            }

            .hud-btn {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                padding: 4px;
                border-radius: 6px;
                transition: all 0.2s;
            }

            .hud-btn:hover {
                color: white;
                background: rgba(255, 255, 255, 0.1);
            }

            .hud-content {
                flex: 1;
                overflow-y: auto;
                padding: 12px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .hud-tabs {
                display: flex;
                padding: 4px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                margin: 0 8px;
            }

            .hud-tab-item {
                flex: 1;
                text-align: center;
                padding: 8px 0;
                font-size: 11px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.6);
                cursor: pointer;
                border-radius: 8px;
                transition: all 0.2s;
            }

            .hud-tab-item.active {
                background: rgba(139, 92, 246, 0.2);
                color: white;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }

            .nexus-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 16px;
                padding: 16px;
                transition: transform 0.2s;
            }

            .nexus-card:hover {
                background: rgba(255, 255, 255, 0.05);
                transform: translateY(-2px);
            }

            .card-title {
                font-size: 13px;
                font-weight: 700;
                margin-bottom: 8px;
                color: white;
            }

            .card-text {
                font-size: 12px;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.7);
            }

            .quest-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .quest-item {
                display: flex;
                flex-direction: column;
                gap: 6px;
                padding: 12px;
                background: rgba(139, 92, 246, 0.05);
                border: 1px dashed rgba(139, 92, 246, 0.3);
                border-radius: 12px;
            }

            .quest-tag {
                display: inline-block;
                padding: 2px 8px;
                background: rgba(139, 92, 246, 0.2);
                color: #a78bfa;
                border-radius: 4px;
                font-size: 9px;
                font-weight: 700;
                text-transform: uppercase;
            }

            .hud-minimized-icon {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
            }

            @keyframes pulse {
                0% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
                100% { opacity: 0.6; transform: scale(1); }
            }

            /* Scrollbar */
            .hud-content::-webkit-scrollbar {
                width: 4px;
            }
            .hud-content::-webkit-scrollbar-thumb {
                background: rgba(139, 92, 246, 0.3);
                border-radius: 10px;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Render the HUD content
     */
    render() {
        if (this.isMinimized) {
            this.container.innerHTML = `
                <div class="hud-minimized-icon">🧠</div>
            `;
            return;
        }

        this.container.innerHTML = `
            <div class="hud-header">
                <div class="hud-title">
                    <div class="hud-status-dot"></div>
                    <span>Neural Nexus HUD</span>
                </div>
                <div class="hud-controls">
                    <button class="hud-btn" id="hud-minimize-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            </div>
            
            <div class="hud-tabs">
                <div class="hud-tab-item ${this.activeTab === 'insights' ? 'active' : ''}" data-tab="insights">INSIGHTS</div>
                <div class="hud-tab-item ${this.activeTab === 'quests' ? 'active' : ''}" data-tab="quests">QUESTS</div>
                <div class="hud-tab-item ${this.activeTab === 'stats' ? 'active' : ''}" data-tab="stats">ANALYTICS</div>
            </div>

            <div class="hud-content" id="hud-tab-content">
                ${this.renderTabContent()}
            </div>
        `;
    }

    /**
     * Render content based on active tab
     */
    renderTabContent() {
        switch (this.activeTab) {
            case 'insights':
                return `
                    <div class="nexus-card">
                        <div class="card-title">💡 Neural Suggestions</div>
                        <p class="card-text" id="nexus-ai-tip">Analyzing your code patterns...</p>
                    </div>
                    <div class="nexus-card">
                        <div class="card-title">🚀 Path to Mastery</div>
                        <p class="card-text">Focus on CSS Grid and Modern Layouts today to bridge your design gap.</p>
                    </div>
                `;
            case 'quests':
                return `
                    <div class="quest-list" id="nexus-quest-list">
                        <div class="card-text">Loading active challenges...</div>
                    </div>
                `;
            case 'stats':
                return `
                    <div class="nexus-card">
                        <div class="card-title">📈 Learning Velocity</div>
                        <div class="card-text" style="font-size: 24px; font-weight: 800; color: #10b981;">1.2x Base</div>
                    </div>
                    <div class="nexus-card">
                        <div class="card-title">🎯 Efficiency Rating</div>
                        <div class="card-text">94% Project Completion Accuracy</div>
                    </div>
                `;
            default:
                return '';
        }
    }

    /**
     * Update AI Tip in real-time
     */
    updateAITip(text) {
        const tipEl = document.getElementById('nexus-ai-tip');
        if (tipEl) tipEl.textContent = text;
    }

    /**
     * Update Quest List in HUD
     */
    updateQuests(quests) {
        const listEl = document.getElementById('nexus-quest-list');
        if (!listEl) return;

        if (!quests || quests.length === 0) {
            listEl.innerHTML = '<div class="card-text">No active side quests. AI is generating new missions...</div>';
            return;
        }

        listEl.innerHTML = quests.map(q => `
            <div class="quest-item">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div class="quest-tag">${q.difficulty}</div>
                    <span style="font-size: 10px; color: rgba(255,255,255,0.4)">+${q.reward} pts</span>
                </div>
                <div class="card-title" style="font-size: 12px; margin: 4px 0;">${q.title}</div>
                <div class="card-text" style="font-size: 11px;">${q.description}</div>
            </div>
        `).join('');
    }

    /**
     * Setup event listeners for interaction
     */
    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            if (this.isMinimized) {
                this.toggleMinimize();
                return;
            }

            const tabItem = e.target.closest('.hud-tab-item');
            if (tabItem) {
                this.activeTab = tabItem.dataset.tab;
                this.render();
                // If it's the quests tab, trigger a quest update
                if (this.activeTab === 'quests' && window.Quests) {
                    this.updateQuests(window.Quests.getActiveQuests());
                }
            }

            if (e.target.closest('#hud-minimize-btn')) {
                this.toggleMinimize();
            }
        });
    }

    /**
     * Toggle between minimized and expanded states
     */
    toggleMinimize() {
        this.isMinimized = !this.isMinimized;
        localStorage.setItem('nexus_minimized', this.isMinimized);
        this.container.className = `neural-nexus-hud ${this.isMinimized ? 'minimized' : ''}`;
        this.render();
    }
}

// Singleton instance
const NexusHUD = new AIOverlay();

// Export for modules
export { NexusHUD, AIOverlay };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.NexusHUD = NexusHUD;
}
