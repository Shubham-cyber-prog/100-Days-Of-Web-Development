/**
 * Achievement Service
 * Handles badge unlocking, progress tracking, and gamification logic
 */

import { Notify } from './Notify.js';

class AchievementService {
    constructor() {
        this.achievements = [
            {
                id: 'day_1',
                title: 'First Orbit',
                description: 'Complete your first day of code',
                icon: '🚀',
                category: 'milestone',
                requirement: (stats) => stats.totalCompleted >= 1
            },
            {
                id: 'day_10',
                title: 'Decade of Code',
                description: 'Complete 10 projects',
                icon: '🎫',
                category: 'milestone',
                requirement: (stats) => stats.totalCompleted >= 10
            },
            {
                id: 'day_25',
                title: 'Quarter Century',
                description: 'Complete 25 projects',
                icon: '🎖️',
                category: 'milestone',
                requirement: (stats) => stats.totalCompleted >= 25
            },
            {
                id: 'day_50',
                title: 'Halfway Hero',
                description: 'Complete 50 projects',
                icon: '🏆',
                category: 'milestone',
                requirement: (stats) => stats.totalCompleted >= 50
            },
            {
                id: 'day_100',
                title: 'Zenith Master',
                description: 'Complete the full 100 days',
                icon: '👑',
                category: 'milestone',
                requirement: (stats) => stats.totalCompleted >= 100
            },
            {
                id: 'streak_7',
                title: 'Week Warrior',
                description: 'Maintain a 7-day streak',
                icon: '🔥',
                category: 'streak',
                requirement: (stats) => stats.currentStreak >= 7
            },
            {
                id: 'explorer',
                title: 'Tech Explorer',
                description: 'Try 5 different technologies',
                icon: '🌍',
                category: 'explorer',
                requirement: (stats) => stats.techCount >= 5
            }
        ];

        this.unlockedAchievements = this.loadUnlocked();
    }

    /**
     * Load unlocked achievements from localStorage
     */
    loadUnlocked() {
        const stored = localStorage.getItem('zenith_achievements');
        return stored ? JSON.parse(stored) : {};
    }

    /**
     * Save unlocked achievements to localStorage
     */
    saveUnlocked() {
        localStorage.setItem('zenith_achievements', JSON.stringify(this.unlockedAchievements));
    }

    /**
     * Check and unlock achievements based on current user stats
     * @param {Object} stats - { totalCompleted, currentStreak, techCount }
     */
    checkAchievements(stats) {
        let newlyUnlocked = [];

        this.achievements.forEach(achievement => {
            if (!this.unlockedAchievements[achievement.id] && achievement.requirement(stats)) {
                this.unlockedAchievements[achievement.id] = {
                    unlockedAt: new Date().toISOString(),
                    ...achievement
                };
                newlyUnlocked.push(achievement);
            }
        });

        if (newlyUnlocked.length > 0) {
            this.saveUnlocked();
            newlyUnlocked.forEach(achievement => this.showUnlockNotification(achievement));
        }

        return newlyUnlocked;
    }

    /**
     * Show a premium notification for achievement unlock
     */
    showUnlockNotification(achievement) {
        if (window.Notify) {
            window.Notify.success(`Achievement Unlocked: ${achievement.title}`, {
                icon: achievement.icon,
                duration: 6000,
                title: 'New Badge Earned!'
            });
        }

        // Trigger confetti effect if available
        if (window.confetti) {
            window.confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff7a18', '#af002d', '#ffffff']
            });
        }
    }

    /**
     * Get all achievements with unlock status
     */
    getAllAchievements() {
        return this.achievements.map(a => ({
            ...a,
            unlocked: !!this.unlockedAchievements[a.id],
            unlockedAt: this.unlockedAchievements[a.id]?.unlockedAt || null
        }));
    }

    /**
     * Get next achievement in a category
     */
    getNextAchievement(category = 'milestone', totalCompleted) {
        return this.achievements
            .filter(a => a.category === category && !this.unlockedAchievements[a.id])
            .sort((a, b) => {
                // This is a simplified sort, ideally we'd have a numerical goal field
                const goals = { day_1: 1, day_10: 10, day_25: 25, day_50: 50, day_100: 100 };
                return (goals[a.id] || 0) - (goals[b.id] || 0);
            })[0];
    }
}

export const achievementService = new AchievementService();
window.achievementService = achievementService;
