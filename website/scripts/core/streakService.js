/**
 * Streak Service
 * Handles streak calculation, activity tracking, and statistics
 * Supports localStorage fallback and cloud sync via Firestore
 */

import { db, auth } from '../firebase-config.js';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

class StreakService {
    constructor() {
        this.currentUser = null;
        this.activityData = {};
        this.streakStats = {
            currentStreak: 0,
            longestStreak: 0,
            longestStreakStart: null,
            longestStreakEnd: null,
            totalActiveDays: 0,
            lastActiveDate: null
        };
        this.streakFreezeUsed = false;
        this.streakFreezeDate = null;
        this.listeners = [];
        this.isOnline = navigator.onLine;
        
        // Listen to online/offline status
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }
    
    /**
     * Initialize streak service
     * @param {Object} user - Current user object
     */
    async initialize(user) {
        this.currentUser = user;
        
        await this.loadActivityData();
        this.calculateStreaks();
        
        return this.streakStats;
    }
    
    /**
     * Load activity data from storage
     */
    async loadActivityData() {
        if (this.currentUser && this.currentUser.uid && this.isOnline) {
            try {
                await this.loadFromFirestore(this.currentUser.uid);
            } catch (error) {
                console.warn('Failed to load from Firestore, using localStorage:', error);
                this.loadFromLocalStorage();
            }
        } else {
            this.loadFromLocalStorage();
        }
    }
    
    /**
     * Load activity data from Firestore
     * @param {string} userId - User ID
     */
    async loadFromFirestore(userId) {
        const activityRef = doc(db, 'userActivity', userId);
        const activitySnap = await getDoc(activityRef);
        
        if (activitySnap.exists()) {
            const data = activitySnap.data();
            this.activityData = data.activities || {};
            this.streakFreezeUsed = data.streakFreezeUsed || false;
            this.streakFreezeDate = data.streakFreezeDate || null;
            this.syncLocalStorage();
        } else {
            // Create new activity document
            await this.createActivityDocument(userId);
        }
    }
    
    /**
     * Create new activity document
     * @param {string} userId - User ID
     */
    async createActivityDocument(userId) {
        const activityRef = doc(db, 'userActivity', userId);
        
        await setDoc(activityRef, {
            userId,
            activities: {},
            streakFreezeUsed: false,
            streakFreezeDate: null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        this.activityData = {};
    }
    
    /**
     * Load activity data from localStorage
     */
    loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem('userActivityData');
            if (stored) {
                const data = JSON.parse(stored);
                this.activityData = data.activities || {};
                this.streakFreezeUsed = data.streakFreezeUsed || false;
                this.streakFreezeDate = data.streakFreezeDate || null;
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.activityData = {};
        }
    }
    
    /**
     * Sync to localStorage
     */
    syncLocalStorage() {
        try {
            localStorage.setItem('userActivityData', JSON.stringify({
                activities: this.activityData,
                streakFreezeUsed: this.streakFreezeUsed,
                streakFreezeDate: this.streakFreezeDate
            }));
        } catch (error) {
            console.error('Error syncing to localStorage:', error);
        }
    }
    
    /**
     * Record activity for a specific date
     * @param {string} date - Date in YYYY-MM-DD format
     * @param {number} count - Activity count (default: 1)
     */
    async recordActivity(date = null, count = 1) {
        const dateKey = date || this.formatDate(new Date());
        
        // Increment activity count for the date
        this.activityData[dateKey] = (this.activityData[dateKey] || 0) + count;
        
        this.syncLocalStorage();
        this.calculateStreaks();
        
        // Sync to Firestore if authenticated
        if (this.currentUser && this.currentUser.uid && this.isOnline) {
            await this.syncToFirestore();
        }
        
        // Dispatch update event
        this.notifyListeners();
        
        return this.streakStats;
    }
    
    /**
     * Remove activity for a specific date
     * @param {string} date - Date in YYYY-MM-DD format
     */
    async removeActivity(date) {
        if (this.activityData[date]) {
            delete this.activityData[date];
            
            this.syncLocalStorage();
            this.calculateStreaks();
            
            if (this.currentUser && this.currentUser.uid && this.isOnline) {
                await this.syncToFirestore();
            }
            
            this.notifyListeners();
        }
    }
    
    /**
     * Calculate all streak statistics
     */
    calculateStreaks() {
        const dates = Object.keys(this.activityData)
            .filter(d => this.activityData[d] > 0)
            .sort();
        
        if (dates.length === 0) {
            this.streakStats = {
                currentStreak: 0,
                longestStreak: 0,
                longestStreakStart: null,
                longestStreakEnd: null,
                totalActiveDays: 0,
                lastActiveDate: null
            };
            return;
        }
        
        this.streakStats.totalActiveDays = dates.length;
        this.streakStats.lastActiveDate = dates[dates.length - 1];
        
        // Calculate current streak
        this.streakStats.currentStreak = this.calculateCurrentStreak(dates);
        
        // Calculate longest streak
        const longestResult = this.calculateLongestStreak(dates);
        this.streakStats.longestStreak = longestResult.length;
        this.streakStats.longestStreakStart = longestResult.start;
        this.streakStats.longestStreakEnd = longestResult.end;
    }
    
    /**
     * Calculate current streak from today
     * @param {Array} sortedDates - Sorted array of active dates
     * @returns {number} Current streak count
     */
    calculateCurrentStreak(sortedDates) {
        const today = this.formatDate(new Date());
        const yesterday = this.formatDate(new Date(Date.now() - 86400000));
        
        // Check if streak freeze should be applied
        const canUseFreeze = this.canUseStreakFreeze();
        
        let currentStreak = 0;
        let checkDate = today;
        
        // Check if there's activity today or yesterday
        if (!sortedDates.includes(today) && !sortedDates.includes(yesterday)) {
            if (!canUseFreeze) {
                return 0; // Streak broken
            }
        }
        
        // Start from today or yesterday
        if (sortedDates.includes(today)) {
            checkDate = today;
        } else if (sortedDates.includes(yesterday)) {
            checkDate = yesterday;
        } else if (canUseFreeze) {
            // Use streak freeze - find last active date
            const lastActive = sortedDates[sortedDates.length - 1];
            const daysSinceLastActive = this.daysBetween(lastActive, today);
            
            if (daysSinceLastActive <= 2) {
                checkDate = lastActive;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
        
        // Count consecutive days going backwards
        const dateSet = new Set(sortedDates);
        let date = new Date(checkDate);
        
        while (true) {
            const dateStr = this.formatDate(date);
            
            if (dateSet.has(dateStr)) {
                currentStreak++;
                date.setDate(date.getDate() - 1);
            } else {
                break;
            }
        }
        
        return currentStreak;
    }
    
    /**
     * Calculate longest streak in activity history
     * @param {Array} sortedDates - Sorted array of active dates
     * @returns {Object} Longest streak info
     */
    calculateLongestStreak(sortedDates) {
        if (sortedDates.length === 0) {
            return { length: 0, start: null, end: null };
        }
        
        let longestStreak = 1;
        let longestStart = sortedDates[0];
        let longestEnd = sortedDates[0];
        
        let currentStreak = 1;
        let currentStart = sortedDates[0];
        
        for (let i = 1; i < sortedDates.length; i++) {
            const prevDate = new Date(sortedDates[i - 1]);
            const currDate = new Date(sortedDates[i]);
            const dayDiff = Math.round((currDate - prevDate) / 86400000);
            
            if (dayDiff === 1) {
                currentStreak++;
            } else {
                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                    longestStart = currentStart;
                    longestEnd = sortedDates[i - 1];
                }
                currentStreak = 1;
                currentStart = sortedDates[i];
            }
        }
        
        // Check final streak
        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
            longestStart = currentStart;
            longestEnd = sortedDates[sortedDates.length - 1];
        }
        
        return {
            length: longestStreak,
            start: longestStart,
            end: longestEnd
        };
    }
    
    /**
     * Get activity data for heatmap
     * @returns {Object} Activity data object
     */
    async getActivityData() {
        return this.activityData;
    }
    
    /**
     * Get streak statistics
     * @returns {Object} Streak stats object
     */
    async getStreakStats() {
        return this.streakStats;
    }
    
    /**
     * Get weekly breakdown
     * @param {number} weeks - Number of weeks to analyze
     * @returns {Array} Weekly activity breakdown
     */
    getWeeklyBreakdown(weeks = 12) {
        const breakdown = [];
        const today = new Date();
        
        for (let w = 0; w < weeks; w++) {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - (w * 7) - today.getDay());
            
            let weekTotal = 0;
            const weekDays = [];
            
            for (let d = 0; d < 7; d++) {
                const date = new Date(weekStart);
                date.setDate(weekStart.getDate() + d);
                const dateKey = this.formatDate(date);
                const count = this.activityData[dateKey] || 0;
                weekTotal += count;
                weekDays.push({ date: dateKey, count });
            }
            
            breakdown.unshift({
                weekStart: this.formatDate(weekStart),
                total: weekTotal,
                days: weekDays
            });
        }
        
        return breakdown;
    }
    
    /**
     * Get monthly breakdown
     * @param {number} months - Number of months to analyze
     * @returns {Array} Monthly activity breakdown
     */
    getMonthlyBreakdown(months = 12) {
        const breakdown = [];
        const today = new Date();
        
        for (let m = 0; m < months; m++) {
            const monthDate = new Date(today.getFullYear(), today.getMonth() - m, 1);
            const monthEnd = new Date(today.getFullYear(), today.getMonth() - m + 1, 0);
            
            let monthTotal = 0;
            let activeDays = 0;
            
            for (let d = 1; d <= monthEnd.getDate(); d++) {
                const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
                const dateKey = this.formatDate(date);
                const count = this.activityData[dateKey] || 0;
                monthTotal += count;
                if (count > 0) activeDays++;
            }
            
            breakdown.unshift({
                month: monthDate.toLocaleString('default', { month: 'short', year: 'numeric' }),
                total: monthTotal,
                activeDays,
                daysInMonth: monthEnd.getDate()
            });
        }
        
        return breakdown;
    }
    
    /**
     * Check if streak freeze can be used
     * @returns {boolean}
     */
    canUseStreakFreeze() {
        if (this.streakFreezeUsed && this.streakFreezeDate) {
            const freezeDate = new Date(this.streakFreezeDate);
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            
            // Reset if we're in a new week
            if (freezeDate < weekStart) {
                this.streakFreezeUsed = false;
                this.streakFreezeDate = null;
                this.syncLocalStorage();
                return true;
            }
            
            return false; // Already used this week
        }
        
        return true; // Haven't used yet
    }
    
    /**
     * Use streak freeze
     * @returns {boolean} Success
     */
    async useStreakFreeze() {
        if (!this.canUseStreakFreeze()) {
            return false;
        }
        
        this.streakFreezeUsed = true;
        this.streakFreezeDate = this.formatDate(new Date());
        
        this.syncLocalStorage();
        
        if (this.currentUser && this.currentUser.uid && this.isOnline) {
            await this.syncToFirestore();
        }
        
        this.notifyListeners();
        
        return true;
    }
    
    /**
     * Get streak freeze status
     * @returns {Object} Freeze status
     */
    getStreakFreezeStatus() {
        return {
            available: this.canUseStreakFreeze(),
            usedThisWeek: this.streakFreezeUsed,
            usedDate: this.streakFreezeDate
        };
    }
    
    /**
     * Sync to Firestore
     */
    async syncToFirestore() {
        if (!this.currentUser || !this.currentUser.uid) {
            return false;
        }
        
        try {
            const activityRef = doc(db, 'userActivity', this.currentUser.uid);
            await updateDoc(activityRef, {
                activities: this.activityData,
                streakFreezeUsed: this.streakFreezeUsed,
                streakFreezeDate: this.streakFreezeDate,
                updatedAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error('Error syncing to Firestore:', error);
            return false;
        }
    }
    
    /**
     * Set up daily reminder notification
     * @param {string} time - Time in HH:MM format
     */
    async setupDailyReminder(time) {
        if (!('Notification' in window)) {
            console.warn('Notifications not supported');
            return false;
        }
        
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            return false;
        }
        
        // Store reminder settings
        const reminderSettings = {
            enabled: true,
            time,
            lastNotified: null
        };
        
        localStorage.setItem('streakReminder', JSON.stringify(reminderSettings));
        
        // Schedule check
        this.scheduleReminderCheck(time);
        
        return true;
    }
    
    /**
     * Schedule reminder check
     * @param {string} time - Time in HH:MM format
     */
    scheduleReminderCheck(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        const scheduledTime = new Date(now);
        scheduledTime.setHours(hours, minutes, 0, 0);
        
        if (scheduledTime <= now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }
        
        const delay = scheduledTime - now;
        
        setTimeout(() => {
            this.showReminderNotification();
            // Reschedule for next day
            this.scheduleReminderCheck(time);
        }, delay);
    }
    
    /**
     * Show reminder notification
     */
    showReminderNotification() {
        const today = this.formatDate(new Date());
        
        if (!this.activityData[today]) {
            new Notification('🔥 Keep Your Streak Alive!', {
                body: `You haven't logged any activity today. Don't break your ${this.streakStats.currentStreak}-day streak!`,
                icon: '/assets/icons/fire.png',
                badge: '/assets/icons/badge.png',
                tag: 'streak-reminder',
                requireInteraction: true
            });
        }
    }
    
    /**
     * Disable daily reminder
     */
    disableDailyReminder() {
        localStorage.removeItem('streakReminder');
    }
    
    /**
     * Format date as YYYY-MM-DD
     * @param {Date} date - Date object
     * @returns {string} Formatted date
     */
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    /**
     * Calculate days between two dates
     * @param {string} date1 - First date (YYYY-MM-DD)
     * @param {string} date2 - Second date (YYYY-MM-DD)
     * @returns {number} Number of days
     */
    daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return Math.round(Math.abs((d2 - d1) / 86400000));
    }
    
    /**
     * Notify listeners of updates
     */
    notifyListeners() {
        const event = new CustomEvent('activityUpdated', {
            detail: { stats: this.streakStats, data: this.activityData }
        });
        window.dispatchEvent(event);
    }
    
    /**
     * Handle going online
     */
    async handleOnline() {
        this.isOnline = true;
        
        if (this.currentUser && this.currentUser.uid) {
            await this.syncToFirestore();
        }
    }
    
    /**
     * Handle going offline
     */
    handleOffline() {
        this.isOnline = false;
    }
    
    /**
     * Add listener
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    addListener(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }
    
    /**
     * Import activity data (for migration)
     * @param {Object} data - Activity data to import
     */
    async importActivityData(data) {
        this.activityData = { ...this.activityData, ...data };
        this.syncLocalStorage();
        this.calculateStreaks();
        
        if (this.currentUser && this.currentUser.uid && this.isOnline) {
            await this.syncToFirestore();
        }
        
        this.notifyListeners();
    }
    
    /**
     * Export activity data
     * @returns {Object} Activity data
     */
    exportActivityData() {
        return {
            activities: this.activityData,
            stats: this.streakStats,
            exportDate: new Date().toISOString()
        };
    }
    
    /**
     * Reset all activity data
     */
    async resetAllData() {
        this.activityData = {};
        this.streakFreezeUsed = false;
        this.streakFreezeDate = null;
        
        this.syncLocalStorage();
        this.calculateStreaks();
        
        if (this.currentUser && this.currentUser.uid && this.isOnline) {
            await this.syncToFirestore();
        }
        
        this.notifyListeners();
    }
}

// Export singleton instance
export const streakService = new StreakService();
export default streakService;
