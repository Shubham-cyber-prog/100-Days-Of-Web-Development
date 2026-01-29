/**
 * Progress Service
 * Handles progress tracking with both localStorage fallback and Firestore cloud sync
 * Provides real-time synchronization and leaderboard data
 */

import { db, auth } from '../firebase-config.js';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    onSnapshot,
    writeBatch,
    increment,
    serverTimestamp,
    arrayUnion,
    arrayRemove
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { offlineService } from './offlineService.js';

class ProgressService {
    constructor() {
        this.currentUser = null;
        this.completedDays = [];
        this.listeners = [];
        this.isOnline = navigator.onLine;
        this.syncQueue = [];

        // Listen to online/offline status
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    /**
     * Initialize progress service
     * @param {Object} user - Current user object
     * @returns {Promise<Array>} Completed days
     */
    async initialize(user) {
        this.currentUser = user;

        if (!user || !user.uid) {
            // Use localStorage for anonymous/guest users
            return this.loadFromLocalStorage();
        }

        try {
            // Try to load from Firestore
            const firestoreData = await this.loadFromFirestore(user.uid);
            return firestoreData;
        } catch (error) {
            console.warn('Failed to load from Firestore, falling back to localStorage:', error);
            return this.loadFromLocalStorage();
        }
    }

    /**
     * Load progress from Firestore
     * @param {string} userId - User ID
     * @returns {Promise<Array>} Completed days array
     */
    async loadFromFirestore(userId) {
        try {
            const userRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                this.completedDays = data.completedDays || [];
                this.syncLocalStorage();
                return this.completedDays;
            } else {
                // Create new user document
                await this.createUserDocument(userId);
                return [];
            }
        } catch (error) {
            console.error('Error loading from Firestore:', error);
            throw error;
        }
    }

    /**
     * Create a new user document in Firestore
     * @param {string} userId - User ID
     */
    async createUserDocument(userId) {
        try {
            const user = auth.currentUser;
            const userRef = doc(db, 'users', userId);

            await setDoc(userRef, {
                userId: userId,
                email: user?.email || 'anonymous@example.com',
                displayName: user?.displayName || 'Anonymous User',
                completedDays: [],
                totalCompleted: 0,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastSyncedAt: serverTimestamp()
            });
        } catch (error) {
            console.error('Error creating user document:', error);
        }
    }

    /**
     * Load progress from localStorage
     * @returns {Array} Completed days array
     */
    loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem('completedDays');
            this.completedDays = stored ? JSON.parse(stored) : [];
            return this.completedDays;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    }

    /**
     * Sync local storage with in-memory data
     */
    syncLocalStorage() {
        try {
            localStorage.setItem('completedDays', JSON.stringify(this.completedDays));
        } catch (error) {
            console.error('Error syncing to localStorage:', error);
        }
    }

    /**
     * Toggle a day as completed/incomplete
     * @param {number} day - Day number (1-100)
     * @returns {Promise<boolean>} Success status
     */
    async toggleDay(day) {
        try {
            const index = this.completedDays.indexOf(day);

            if (index > -1) {
                this.completedDays.splice(index, 1);
            } else {
                this.completedDays.push(day);
            }

            this.syncLocalStorage();

            // Sync to Firestore if user is authenticated
            if (this.currentUser && this.currentUser.uid && this.isOnline) {
                await this.syncToFirestore();
            } else if (this.currentUser && this.currentUser.uid) {
                // Queue for sync when back online (PERSISTENT)
                if (offlineService) {
                    await offlineService.queueSyncAction({
                        type: 'toggleDay',
                        day,
                        userId: this.currentUser.uid
                    });
                }
                this.syncQueue.push({ action: 'toggle', day });
            }

            // Update local cache
            if (this.currentUser && this.currentUser.uid && offlineService) {
                await offlineService.cacheProgress(this.currentUser.uid, this.completedDays);
            }

            // Notify listeners
            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Error toggling day:', error);
            return false;
        }
    }

    /**
     * Mark multiple days as completed
     * @param {Array<number>} days - Array of day numbers
     * @returns {Promise<boolean>} Success status
     */
    async completeDays(days) {
        try {
            days.forEach(day => {
                if (!this.completedDays.includes(day)) {
                    this.completedDays.push(day);
                }
            });

            this.syncLocalStorage();

            if (this.currentUser && this.currentUser.uid && this.isOnline) {
                await this.syncToFirestore();
            } else if (this.currentUser && this.currentUser.uid) {
                this.syncQueue.push({ action: 'complete', days });
            }

            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Error completing days:', error);
            return false;
        }
    }

    /**
     * Get completed days
     * @returns {Array} Array of completed day numbers
     */
    getCompletedDays() {
        return [...this.completedDays];
    }

    /**
     * Get completion percentage
     * @returns {number} Percentage completed (0-100)
     */
    getCompletionPercentage() {
        return Math.round((this.completedDays.length / 100) * 100);
    }

    /**
     * Sync progress to Firestore
     * @returns {Promise<boolean>} Success status
     */
    async syncToFirestore() {
        if (!this.currentUser || !this.currentUser.uid) {
            return false;
        }

        try {
            const userRef = doc(db, 'users', this.currentUser.uid);
            await updateDoc(userRef, {
                completedDays: this.completedDays,
                totalCompleted: this.completedDays.length,
                updatedAt: serverTimestamp(),
                lastSyncedAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error('Error syncing to Firestore:', error);
            return false;
        }
    }

    /**
     * Listen to real-time Firestore updates
     * @param {Function} callback - Callback function when data changes
     * @returns {Function} Unsubscribe function
     */
    listenToUpdates(callback) {
        if (!this.currentUser || !this.currentUser.uid) {
            return () => { }; // No-op for non-authenticated users
        }

        try {
            const userRef = doc(db, 'users', this.currentUser.uid);
            const unsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    this.completedDays = data.completedDays || [];
                    this.syncLocalStorage();
                    callback(this.completedDays);
                }
            }, (error) => {
                console.error('Error listening to updates:', error);
            });

            this.listeners.push(unsubscribe);
            return unsubscribe;
        } catch (error) {
            console.error('Error setting up listener:', error);
            return () => { };
        }
    }

    /**
     * Notify all listeners of changes
     */
    notifyListeners() {
        // This would be called by listeners if needed
        const event = new CustomEvent('progressUpdated', { detail: this.completedDays });
        window.dispatchEvent(event);
    }

    /**
     * Get top users for leaderboard
     * @param {number} limitCount - Number of top users to fetch (default: 10)
     * @returns {Promise<Array>} Array of top users
     */
    async getTopUsers(limitCount = 10) {
        try {
            const q = query(
                collection(db, 'users'),
                orderBy('totalCompleted', 'desc'),
                limit(limitCount)
            );

            const querySnapshot = await getDocs(q);
            const users = [];

            querySnapshot.forEach((doc) => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return users;
        } catch (error) {
            console.error('Error fetching top users:', error);
            return [];
        }
    }

    /**
     * Get user's rank on the leaderboard
     * @param {string} userId - User ID
     * @returns {Promise<number>} User's rank (1-based)
     */
    async getUserRank(userId) {
        try {
            const q = query(
                collection(db, 'users'),
                orderBy('totalCompleted', 'desc')
            );

            const querySnapshot = await getDocs(q);
            let rank = 1;

            querySnapshot.forEach((doc) => {
                if (doc.id !== userId) {
                    rank++;
                } else {
                    return;
                }
            });

            return rank;
        } catch (error) {
            console.error('Error fetching user rank:', error);
            return -1;
        }
    }

    /**
     * Search users by display name
     * @param {string} searchTerm - Search term
     * @param {number} limitCount - Number of results to return
     * @returns {Promise<Array>} Array of matching users
     */
    async searchUsers(searchTerm, limitCount = 5) {
        try {
            const q = query(
                collection(db, 'users'),
                orderBy('totalCompleted', 'desc'),
                limit(limitCount * 2)
            );

            const querySnapshot = await getDocs(q);
            const users = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    data.email?.toLowerCase().includes(searchTerm.toLowerCase())) {
                    users.push({
                        id: doc.id,
                        ...data
                    });
                }
            });

            return users.slice(0, limitCount);
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    }

    /**
     * Handle going online
     */
    async handleOnline() {
        this.isOnline = true;
        console.log('🟢 Back online - syncing data');

        // 1. Process memory queue
        this.syncQueue = [];

        // 2. Process persistent IndexedDB queue
        if (typeof offlineService !== 'undefined') {
            const persistentQueue = await offlineService.getSyncQueue();
            if (persistentQueue && persistentQueue.length > 0) {
                console.log(`Processing ${persistentQueue.length} persistent sync actions...`);
                await this.syncToFirestore();
                await offlineService.clearSyncQueue();
            }
        }

        // 3. Sync all current data
        if (this.currentUser && this.currentUser.uid) {
            await this.syncToFirestore();
        }
    }

    /**
     * Handle going offline
     */
    handleOffline() {
        this.isOnline = false;
        console.log('🔴 Went offline - changes will sync when back online');
    }

    /**
     * Clear all progress data (use with caution)
     * @returns {Promise<boolean>} Success status
     */
    async clearAllProgress() {
        try {
            this.completedDays = [];
            this.syncLocalStorage();

            if (this.currentUser && this.currentUser.uid && this.isOnline) {
                await this.syncToFirestore();
            }

            this.notifyListeners();
            return true;
        } catch (error) {
            console.error('Error clearing progress:', error);
            return false;
        }
    }

    /**
     * Cleanup listeners
     */
    cleanup() {
        this.listeners.forEach(unsubscribe => unsubscribe());
        this.listeners = [];
    }
}

// Export singleton instance
export const progressService = new ProgressService();
export default progressService;
