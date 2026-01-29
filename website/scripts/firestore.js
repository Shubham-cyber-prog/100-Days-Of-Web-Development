import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase configuration - should match the one in login.js
const firebaseConfig = (() => {
    const defaultConfig = {
        apiKey: "YOUR_API_KEY_HERE",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    if (typeof __firebase_config === 'object' && __firebase_config !== null) {
        return __firebase_config;
    } else if (typeof __firebase_config === 'string' && __firebase_config.trim()) {
        try {
            return JSON.parse(__firebase_config);
        } catch (e) {
            return defaultConfig;
        }
    } else {
        return defaultConfig;
    }
})();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore Service Class
class FirestoreService {
    constructor() {
        this.db = db;
    }

    // User Profile Operations
    async createUserProfile(userId, userData) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const defaultProfile = {
                username: userData.displayName || userData.email.split('@')[0],
                email: userData.email,
                handle: `@${userData.email.split('@')[0]}`,
                avatar: userData.photoURL || '',
                rank: 'Developer',
                level: 1,
                bio: 'Web Developer | Building amazing projects',
                location: '',
                website: '',
                github: '',
                createdAt: new Date(),
                lastLogin: new Date()
            };

            await setDoc(userRef, defaultProfile);
            return defaultProfile;
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    }

    async getUserProfile(userId) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                // Update last login
                await updateDoc(userRef, { lastLogin: new Date() });
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting user profile:', error);
            throw error;
        }
    }

    async updateUserProfile(userId, profileData) {
        try {
            const userRef = doc(this.db, 'users', userId);
            await updateDoc(userRef, {
                ...profileData,
                updatedAt: new Date()
            });
            return true;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    // Progress Operations
    async getUserProgress(userId) {
        try {
            const progressRef = doc(this.db, 'progress', userId);
            const progressSnap = await getDoc(progressRef);

            if (progressSnap.exists()) {
                return progressSnap.data();
            } else {
                // Return default progress
                return {
                    completedDays: [],
                    totalProjects: 100,
                    currentStreak: 0,
                    longestStreak: 0,
                    lastCompletedDate: null,
                    createdAt: new Date()
                };
            }
        } catch (error) {
            console.error('Error getting user progress:', error);
            throw error;
        }
    }

    async updateUserProgress(userId, progressData) {
        try {
            const progressRef = doc(this.db, 'progress', userId);
            await setDoc(progressRef, {
                ...progressData,
                updatedAt: new Date()
            }, { merge: true });
            return true;
        } catch (error) {
            console.error('Error updating user progress:', error);
            throw error;
        }
    }

    async updateCompletedDays(userId, completedDays) {
        try {
            const progressRef = doc(this.db, 'progress', userId);
            const currentProgress = await this.getUserProgress(userId);

            // Calculate streaks
            const sortedDays = [...completedDays].sort((a, b) => a - b);
            let currentStreak = 0;
            let longestStreak = currentProgress.longestStreak || 0;

            if (sortedDays.length > 0) {
                const today = new Date();
                const todayDay = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

                // Calculate current streak
                for (let i = sortedDays.length - 1; i >= 0; i--) {
                    if (sortedDays[i] === todayDay - (sortedDays.length - 1 - i)) {
                        currentStreak++;
                    } else {
                        break;
                    }
                }

                // Update longest streak
                longestStreak = Math.max(longestStreak, currentStreak);
            }

            await updateDoc(progressRef, {
                completedDays: completedDays,
                currentStreak: currentStreak,
                longestStreak: longestStreak,
                lastCompletedDate: new Date(),
                updatedAt: new Date()
            });

            return {
                completedDays,
                currentStreak,
                longestStreak
            };
        } catch (error) {
            console.error('Error updating completed days:', error);
            throw error;
        }
    }

    // Real-time listeners
    listenToUserProgress(userId, callback) {
        const progressRef = doc(this.db, 'progress', userId);
        return onSnapshot(progressRef, (doc) => {
            if (doc.exists()) {
                callback(doc.data());
            }
        });
    }

    listenToUserProfile(userId, callback) {
        const userRef = doc(this.db, 'users', userId);
        return onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                callback(doc.data());
            }
        });
    }

    // Utility methods
    async initializeUserData(userId, userData) {
        try {
            // Create profile if it doesn't exist
            const existingProfile = await this.getUserProfile(userId);
            if (!existingProfile) {
                await this.createUserProfile(userId, userData);
            }

            // Create progress if it doesn't exist
            const existingProgress = await this.getUserProgress(userId);
            if (!existingProgress.completedDays) {
                await this.updateUserProgress(userId, {
                    completedDays: [],
                    totalProjects: 100,
                    currentStreak: 0,
                    longestStreak: 0,
                    lastCompletedDate: null,
                    createdAt: new Date()
                });
            }

            return true;
        } catch (error) {
            console.error('Error initializing user data:', error);
            throw error;
        }
    }

    // Migration from localStorage
    async migrateLocalStorageData(userId) {
        try {
            // Migrate completed days
            const localCompletedDays = localStorage.getItem('completedDays');
            if (localCompletedDays) {
                const completedDays = JSON.parse(localCompletedDays);
                await this.updateCompletedDays(userId, completedDays);
            }

            // Migrate profile data
            const localProfile = localStorage.getItem('userProfile');
            if (localProfile) {
                const profileData = JSON.parse(localProfile);
                await this.updateUserProfile(userId, profileData);
            }

            // Migrate zenith mission progress
            const zenithProgress = localStorage.getItem('zenith_mission_progress');
            if (zenithProgress) {
                const progressArray = JSON.parse(zenithProgress);
                const completedDays = progressArray.map((completed, index) => completed ? index + 1 : null).filter(day => day !== null);
                await this.updateCompletedDays(userId, completedDays);
            }

            return true;
        } catch (error) {
            console.error('Error migrating localStorage data:', error);
            return false;
        }
    }
}

// Export singleton instance
export const firestoreService = new FirestoreService();
export { db };
