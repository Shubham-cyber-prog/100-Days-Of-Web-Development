/**
 * Progress Service - Convenience Wrapper
 * Provides a simplified API for progress tracking
 * This is a convenience wrapper around the core progress service
 */

import { progressService } from '../core/progressService.js';
import { streakService } from '../core/streakService.js';
import { achievementService } from '../core/achievementService.js';

class ProgressServiceAPI {
    constructor() {
        this.progressService = progressService;
        this.streakService = streakService;
        this.achievementService = achievementService;
        this.isInitialized = false;
    }

    /**
     * Initialize the progress service with user
     * @param {Object} user - Current user object
     * @returns {Promise<Object>} Progress data
     */
    async initialize(user) {
        try {
            // Initialize core services
            const completedDays = await this.progressService.initialize(user);
            await this.streakService.initialize(user);
            
            this.isInitialized = true;
            
            // Return combined progress data
            return this.getProgressData();
        } catch (error) {
            console.error('Error initializing progress service:', error);
            return this.getLocalProgressData();
        }
    }

    /**
     * Get combined progress data from all services
     * @returns {Object} Combined progress data
     */
    getProgressData() {
        const completedDays = this.progressService.getCompletedDays();
        const streakStats = this.streakService.getStreakStats ?
            this.streakService.getStreakStats() : { currentStreak: 0, longestStreak: 0 };
        const achievements = this.achievementService.getAllAchievements ?
            this.achievementService.getAllAchievements() : [];

        return {
            completedDays,
            totalCompleted: completedDays.length,
            completionPercentage: this.progressService.getCompletionPercentage(),
            currentStreak: streakStats.currentStreak || 0,
            longestStreak: streakStats.longestStreak || 0,
            totalActiveDays: streakStats.totalActiveDays || 0,
            achievements,
            unlockedAchievements: achievements.filter(a => a.unlocked).length,
            totalPoints: this.achievementService.getTotalPoints ?
                this.achievementService.getTotalPoints() : 0
        };
    }

    /**
     * Get progress data from localStorage (for non-authenticated users)
     * @returns {Object} Local progress data
     */
    getLocalProgressData() {
        const completedDays = this.progressService.getCompletedDays();
        
        // Get streak data from localStorage
        let streakStats = { currentStreak: 0, longestStreak: 0, totalActiveDays: 0 };
        try {
            const streakData = localStorage.getItem('userActivityData');
            if (streakData) {
                const parsed = JSON.parse(streakData);
                // Calculate simple streak from activity data
                if (parsed.activities) {
                    const dates = Object.keys(parsed.activities).filter(d => parsed.activities[d] > 0);
                    streakStats.totalActiveDays = dates.length;
                }
            }
        } catch (e) {
            console.warn('Could not parse streak data:', e);
        }

        // Get achievements from localStorage
        let achievements = [];
        let unlockedCount = 0;
        let totalPoints = 0;
        try {
            const achData = localStorage.getItem('zenith_achievements');
            if (achData) {
                const parsed = JSON.parse(achData);
                achievements = Object.values(parsed);
                unlockedCount = achievements.length;
                totalPoints = achievements.reduce((sum, a) => sum + (a.points || 0), 0);
            }
        } catch (e) {
            console.warn('Could not parse achievements data:', e);
        }

        return {
            completedDays,
            totalCompleted: completedDays.length,
            completionPercentage: Math.round((completedDays.length / 100) * 100),
            currentStreak: streakStats.currentStreak,
            longestStreak: streakStats.longestStreak,
            totalActiveDays: streakStats.totalActiveDays,
            achievements,
            unlockedAchievements: unlockedCount,
            totalPoints
        };
    }

    /**
     * Toggle a day as completed/incomplete
     * @param {number} day - Day number (1-100)
     * @returns {Promise<boolean>} Success status
     */
    async toggleDay(day) {
        const result = await this.progressService.toggleDay(day);
        
        // Record activity for today
        if (result) {
            await this.streakService.recordActivity();
            
            // Check for new achievements
            const stats = this.getProgressData();
            this.achievementService.checkAchievements(stats);
        }
        
        return result;
    }

    /**
     * Mark a day as complete
     * @param {number} day - Day number (1-100)
     * @returns {Promise<boolean>} Success status
     */
    async completeDay(day) {
        const completedDays = this.progressService.getCompletedDays();
        
        if (!completedDays.includes(day)) {
            return this.toggleDay(day);
        }
        
        return true;
    }

    /**
     * Get completed days
     * @returns {Array} Array of completed day numbers
     */
    getCompletedDays() {
        return this.progressService.getCompletedDays();
    }

    /**
     * Get completion percentage
     * @returns {number} Percentage completed (0-100)
     */
    getCompletionPercentage() {
        return this.progressService.getCompletionPercentage();
    }

    /**
     * Get streak statistics
     * @returns {Object} Streak stats
     */
    getStreakStats() {
        return this.streakService.getStreakStats ?
            this.streakService.getStreakStats() :
            this.streakService.streakStats;
    }

    /**
     * Get all achievements
     * @returns {Array} Array of achievements
     */
    getAchievements() {
        return this.achievementService.getAllAchievements ?
            this.achievementService.getAllAchievements() : [];
    }

    /**
     * Get unlocked achievements
     * @returns {Array} Array of unlocked achievements
     */
    getUnlockedAchievements() {
        return this.getAchievements().filter(a => a.unlocked);
    }

    /**
     * Get total points earned
     * @returns {number} Total points
     */
    getTotalPoints() {
        return this.achievementService.getTotalPoints ?
            this.achievementService.getTotalPoints() : 0;
    }

    /**
     * Get user level info
     * @returns {Object} Level info
     */
    getLevelInfo() {
        return this.achievementService.getLevelInfo ?
            this.achievementService.getLevelInfo() :
            { level: 1, currentXP: 0, nextLevelXP: 1000, progressToNext: 0 };
    }

    /**
     * Check and unlock achievements based on current stats
     * @returns {Array} Newly unlocked achievements
     */
    checkAchievements() {
        const stats = this.getProgressData();
        return this.achievementService.checkAchievements(stats);
    }

    /**
     * Get activity data for heatmap
     * @returns {Object} Activity data
     */
    getActivityData() {
        return this.streakService.getActivityData ?
            this.streakService.getActivityData() : {};
    }

    /**
     * Listen to progress updates
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    onProgressUpdate(callback) {
        const handler = (event) => callback(event.detail);
        window.addEventListener('progressUpdated', handler);
        return () => window.removeEventListener('progressUpdated', handler);
    }

    /**
     * Listen to achievement updates
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    onAchievementUpdate(callback) {
        // Check achievements periodically or on specific events
        const handler = () => {
            const newAchievements = this.checkAchievements();
            if (newAchievements.length > 0) {
                callback(newAchievements);
            }
        };
        
        window.addEventListener('progressUpdated', handler);
        return () => window.removeEventListener('progressUpdated', handler);
    }

    /**
     * Reset all progress (use with caution)
     * @returns {Promise<boolean>} Success status
     */
    async resetAllProgress() {
        const result = await this.progressService.clearAllProgress();
        
        if (result && this.streakService.resetAllData) {
            await this.streakService.resetAllData();
        }
        
        return result;
    }
}

// Export singleton instance
export const progressServiceAPI = new ProgressServiceAPI();
export default progressServiceAPI;
