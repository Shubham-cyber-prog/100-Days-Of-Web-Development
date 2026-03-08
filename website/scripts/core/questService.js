/**
 * Quest Service - Dynamic "Side Quest" Engine
 * Manages bonus challenges, reward logic, and quest state
 * Issue #1174
 */

class QuestService {
    constructor() {
        this.activeQuests = [];
        this.completedQuests = [];
        this.questPool = [];
        this.storageKey = 'neural_nexus_quests';

        // Quest types and point values
        this.rewardConfig = {
            'bronze': 5,
            'silver': 15,
            'gold': 30,
            'legendary': 100
        };

        this.init();
    }

    /**
     * Initialize Quest Service
     */
    async init() {
        this.loadState();
        this.initializeQuestPool();
        console.log('⚔️ Quest Service: Initialized');
    }

    /**
     * Load quest state from local storage
     */
    loadState() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            const data = JSON.parse(saved);
            this.activeQuests = data.activeQuests || [];
            this.completedQuests = data.completedQuests || [];
        }
    }

    /**
     * Save quest state to local storage
     */
    saveState() {
        localStorage.setItem(this.storageKey, JSON.stringify({
            activeQuests: this.activeQuests,
            completedQuests: this.completedQuests
        }));
    }

    /**
     * Initialize the base quest pool for fallback
     */
    initializeQuestPool() {
        this.questPool = [
            {
                id: 'performance_master',
                title: 'Performance Architect',
                description: 'Optimize your project to score 95+ on Lighthouse Performance.',
                difficulty: 'silver',
                tech: ['Performance', 'PWA'],
                requirements: { lighthouseScore: 95 }
            },
            {
                id: 'a11y_guardian',
                title: 'Accessibility Guardian',
                description: 'Ensure 100% accessibility score on your next mission.',
                difficulty: 'bronze',
                tech: ['HTML', 'A11y'],
                requirements: { a11yScore: 100 }
            },
            {
                id: 'dark_mode_elite',
                title: 'Void Weaver',
                description: 'Implement a flawless dark/light mode toggle with CSS Variables.',
                difficulty: 'bronze',
                tech: ['CSS', 'UX'],
                requirements: { features: ['dark-mode'] }
            },
            {
                id: 'api_nexus',
                title: 'Data Alchemist',
                description: 'Integrate more than 3 external APIs into a single dashboard.',
                difficulty: 'gold',
                tech: ['API', 'Integration'],
                requirements: { apiCount: 3 }
            },
            {
                id: 'anim_maestro',
                title: 'Stardust Motion',
                description: 'Create a complex SVG animation using only CSS keyframes.',
                difficulty: 'silver',
                tech: ['SVG', 'Animation'],
                requirements: { features: ['svg-animation'] }
            }
        ];
    }

    /**
     * Generate dynamic quests based on AI analysis
     * @param {Array} aiSuggestions - Suggestions from AI Service
     */
    generateDynamicQuests(aiSuggestions) {
        if (!aiSuggestions || aiSuggestions.length === 0) return;

        aiSuggestions.forEach(suggestion => {
            const questId = `ai_quest_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
            const newQuest = {
                id: questId,
                title: suggestion.title || 'Neural Challenge',
                description: suggestion.description,
                difficulty: suggestion.difficulty || 'silver',
                reward: this.rewardConfig[suggestion.difficulty || 'silver'],
                tech: suggestion.tech || [],
                isAI: true,
                createdAt: Date.now()
            };

            // Limit to 3 active quests
            if (this.activeQuests.length < 3) {
                this.activeQuests.push(newQuest);
                this.notifyNewQuest(newQuest);
            }
        });

        this.saveState();
    }

    /**
     * Get active quests for the HUD
     */
    getActiveQuests() {
        return this.activeQuests;
    }

    /**
     * Track and complete a quest
     * @param {string} questId - ID of the quest to complete
     */
    async completeQuest(questId) {
        const questIdx = this.activeQuests.findIndex(q => q.id === questId);
        if (questIdx === -1) return null;

        const quest = this.activeQuests.splice(questIdx, 1)[0];
        quest.completedAt = Date.now();
        this.completedQuests.push(quest);

        this.saveState();

        // Award points via Progress Service if available
        if (window.App && window.App.services && window.App.services.progress) {
            await window.App.services.progress.awardQuestPoints(quest.reward || 15);
        } else if (window.progressService) {
            await window.progressService.awardQuestPoints(quest.reward || 15);
        }

        // Notify of completion and rewards
        if (window.Notify) {
            window.Notify.show({
                title: 'QUEST COMPLETE!',
                message: `You earned ${quest.reward || 15} points for completing: ${quest.title}`,
                type: 'success',
                icon: '🏆'
            });
        }

        return quest;
    }

    /**
     * Notify UI about new quest
     */
    notifyNewQuest(quest) {
        if (window.Notify) {
            window.Notify.show({
                title: 'NEW NEURAL QUEST',
                message: quest.title,
                type: 'info',
                icon: '⚡',
                duration: 6000
            });
        }
    }

    /**
     * Sync quests with cloud storage
     */
    async syncWithCloud(progressService) {
        if (!progressService || !progressService.currentUser) return;

        try {
            // This would normally call a firestore updateDoc
            // For now we assume local storage is enough but prepared for cloud
            console.log('☁️ Quest Service: Cloud sync requested');
        } catch (error) {
            console.error('Quest sync failed:', error);
        }
    }
}

// Singleton instance
const Quests = new QuestService();

// Export for modules
export { Quests, QuestService };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.Quests = Quests;
}
