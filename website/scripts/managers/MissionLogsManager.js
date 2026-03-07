/**
 * Mission Logs Manager - Encrypted Private Notes System
 * Zero-knowledge encrypted notes for daily learning reflections
 * 
 * Features:
 * - Client-side AES-GCM encryption
 * - Firestore storage of encrypted blobs only
 * - Real-time sync across devices
 * - Search within decrypted logs
 */

import securityService from '../core/securityService.js';
import { db } from '../core/firebase.js';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    deleteDoc,
    updateDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

class MissionLogsManager {
    constructor() {
        this.logsCollection = 'mission_logs';
        this.currentUserId = null;
        this.decryptedCache = new Map(); // Cache decrypted logs for performance
    }

    /**
     * Initialize for current user
     */
    initialize(userId) {
        this.currentUserId = userId;
        this.decryptedCache.clear();
        console.log('📝 Mission Logs initialized for user:', userId);
    }

    /**
     * Create a new encrypted mission log
     * @param {Object} logData - Log data (dayNumber, title, content, tags)
     * @returns {Promise<Object>} Created log info
     */
    async createLog(logData) {
        if (!this.currentUserId) {
            throw new Error('User not initialized');
        }

        try {
            // Prepare log object
            const log = {
                id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                dayNumber: logData.dayNumber,
                title: logData.title,
                content: logData.content,
                tags: logData.tags || [],
                mood: logData.mood || 'neutral',
                createdAt: Date.now(),
                updatedAt: Date.now()
            };

            // Encrypt the log
            const encryptedData = await securityService.encrypt(JSON.stringify(log));

            // Store encrypted log in Firestore
            await setDoc(doc(db, this.logsCollection, log.id), {
                userId: this.currentUserId,
                dayNumber: log.dayNumber,
                encrypted: encryptedData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                // Store metadata unencrypted for querying
                metadata: {
                    hasContent: !!log.content,
                    tagCount: log.tags.length,
                    mood: log.mood
                }
            });

            // Cache decrypted version
            this.decryptedCache.set(log.id, log);

            console.log('✅ Mission log created and encrypted:', log.id);
            return {
                success: true,
                logId: log.id,
                dayNumber: log.dayNumber
            };
        } catch (error) {
            console.error('Error creating mission log:', error);
            throw new Error('Failed to create mission log: ' + error.message);
        }
    }

    /**
     * Get all logs for current user (encrypted)
     * @returns {Promise<Array>} Array of encrypted logs
     */
    async getEncryptedLogs() {
        if (!this.currentUserId) {
            throw new Error('User not initialized');
        }

        try {
            const logsQuery = query(
                collection(db, this.logsCollection),
                where('userId', '==', this.currentUserId),
                orderBy('createdAt', 'desc')
            );

            const snapshot = await getDocs(logsQuery);

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching logs:', error);
            throw error;
        }
    }

    /**
     * Get and decrypt all logs for current user
     * @returns {Promise<Array>} Array of decrypted logs
     */
    async getAllLogs() {
        try {
            const encryptedLogs = await this.getEncryptedLogs();
            const decryptedLogs = [];

            for (const encLog of encryptedLogs) {
                try {
                    // Check cache first
                    if (this.decryptedCache.has(encLog.id)) {
                        decryptedLogs.push(this.decryptedCache.get(encLog.id));
                        continue;
                    }

                    // Decrypt log
                    const decrypted = await securityService.decrypt(encLog.encrypted);
                    const log = JSON.parse(decrypted);

                    // Cache it
                    this.decryptedCache.set(encLog.id, log);
                    decryptedLogs.push(log);
                } catch (error) {
                    console.error(`Failed to decrypt log ${encLog.id}:`, error);
                    // Add placeholder for failed decryption
                    decryptedLogs.push({
                        id: encLog.id,
                        error: 'Decryption failed',
                        dayNumber: encLog.dayNumber,
                        createdAt: encLog.createdAt
                    });
                }
            }

            return decryptedLogs;
        } catch (error) {
            console.error('Error getting logs:', error);
            throw error;
        }
    }

    /**
     * Get log by ID and decrypt
     * @param {string} logId - Log ID
     * @returns {Promise<Object>} Decrypted log
     */
    async getLog(logId) {
        try {
            // Check cache
            if (this.decryptedCache.has(logId)) {
                return this.decryptedCache.get(logId);
            }

            // Fetch from Firestore
            const logDoc = await getDoc(doc(db, this.logsCollection, logId));

            if (!logDoc.exists()) {
                throw new Error('Log not found');
            }

            const encLog = logDoc.data();

            // Verify ownership
            if (encLog.userId !== this.currentUserId) {
                throw new Error('Unauthorized access');
            }

            // Decrypt
            const decrypted = await securityService.decrypt(encLog.encrypted);
            const log = JSON.parse(decrypted);

            // Cache it
            this.decryptedCache.set(logId, log);

            return log;
        } catch (error) {
            console.error('Error getting log:', error);
            throw error;
        }
    }

    /**
     * Get logs for a specific day
     * @param {number} dayNumber - Day number (1-100)
     * @returns {Promise<Array>} Decrypted logs for that day
     */
    async getLogsByDay(dayNumber) {
        try {
            const logsQuery = query(
                collection(db, this.logsCollection),
                where('userId', '==', this.currentUserId),
                where('dayNumber', '==', dayNumber)
            );

            const snapshot = await getDocs(logsQuery);
            const decryptedLogs = [];

            for (const doc of snapshot.docs) {
                try {
                    const encLog = doc.data();
                    const decrypted = await securityService.decrypt(encLog.encrypted);
                    const log = JSON.parse(decrypted);
                    decryptedLogs.push(log);
                } catch (error) {
                    console.error(`Failed to decrypt log ${doc.id}:`, error);
                }
            }

            return decryptedLogs;
        } catch (error) {
            console.error('Error getting logs by day:', error);
            throw error;
        }
    }

    /**
     * Update an existing log
     * @param {string} logId - Log ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Update result
     */
    async updateLog(logId, updates) {
        try {
            // Get current log
            const currentLog = await this.getLog(logId);

            // Merge updates
            const updatedLog = {
                ...currentLog,
                ...updates,
                updatedAt: Date.now()
            };

            // Re-encrypt
            const encryptedData = await securityService.encrypt(JSON.stringify(updatedLog));

            // Update in Firestore
            await updateDoc(doc(db, this.logsCollection, logId), {
                encrypted: encryptedData,
                updatedAt: serverTimestamp(),
                metadata: {
                    hasContent: !!updatedLog.content,
                    tagCount: updatedLog.tags?.length || 0,
                    mood: updatedLog.mood || 'neutral'
                }
            });

            // Update cache
            this.decryptedCache.set(logId, updatedLog);

            console.log('✅ Mission log updated:', logId);
            return {
                success: true,
                logId
            };
        } catch (error) {
            console.error('Error updating log:', error);
            throw error;
        }
    }

    /**
     * Delete a log
     * @param {string} logId - Log ID
     * @returns {Promise<Object>} Delete result
     */
    async deleteLog(logId) {
        try {
            // Verify ownership
            const logDoc = await getDoc(doc(db, this.logsCollection, logId));

            if (!logDoc.exists()) {
                throw new Error('Log not found');
            }

            if (logDoc.data().userId !== this.currentUserId) {
                throw new Error('Unauthorized');
            }

            // Delete from Firestore
            await deleteDoc(doc(db, this.logsCollection, logId));

            // Remove from cache
            this.decryptedCache.delete(logId);

            console.log('✅ Mission log deleted:', logId);
            return {
                success: true,
                logId
            };
        } catch (error) {
            console.error('Error deleting log:', error);
            throw error;
        }
    }

    /**
     * Search logs by keyword (searches decrypted content)
     * @param {string} keyword - Search term
     * @returns {Promise<Array>} Matching logs
     */
    async searchLogs(keyword) {
        try {
            const allLogs = await this.getAllLogs();
            const lowerKeyword = keyword.toLowerCase();

            return allLogs.filter(log => {
                if (log.error) return false;

                return (
                    log.title?.toLowerCase().includes(lowerKeyword) ||
                    log.content?.toLowerCase().includes(lowerKeyword) ||
                    log.tags?.some(tag => tag.toLowerCase().includes(lowerKeyword))
                );
            });
        } catch (error) {
            console.error('Error searching logs:', error);
            throw error;
        }
    }

    /**
     * Get logs statistics
     * @returns {Promise<Object>} Stats object
     */
    async getStats() {
        try {
            const logs = await this.getAllLogs();
            const validLogs = logs.filter(log => !log.error);

            const stats = {
                totalLogs: validLogs.length,
                daysWithLogs: new Set(validLogs.map(log => log.dayNumber)).size,
                totalWords: validLogs.reduce((sum, log) => {
                    return sum + (log.content?.split(/\s+/).length || 0);
                }, 0),
                moodDistribution: {},
                tagFrequency: {}
            };

            // Calculate mood distribution
            validLogs.forEach(log => {
                const mood = log.mood || 'neutral';
                stats.moodDistribution[mood] = (stats.moodDistribution[mood] || 0) + 1;
            });

            // Calculate tag frequency
            validLogs.forEach(log => {
                log.tags?.forEach(tag => {
                    stats.tagFrequency[tag] = (stats.tagFrequency[tag] || 0) + 1;
                });
            });

            return stats;
        } catch (error) {
            console.error('Error getting stats:', error);
            throw error;
        }
    }

    /**
     * Export all logs (decrypted) as JSON
     * @returns {Promise<string>} JSON string of all logs
     */
    async exportLogs() {
        try {
            const logs = await this.getAllLogs();
            const validLogs = logs.filter(log => !log.error);

            return JSON.stringify({
                exportDate: new Date().toISOString(),
                userId: this.currentUserId,
                logsCount: validLogs.length,
                logs: validLogs
            }, null, 2);
        } catch (error) {
            console.error('Error exporting logs:', error);
            throw error;
        }
    }

    /**
     * Clear decryption cache
     */
    clearCache() {
        this.decryptedCache.clear();
        console.log('🗑️ Mission logs cache cleared');
    }
}

// Export singleton instance
const missionLogsManager = new MissionLogsManager();
export default missionLogsManager;

// Global export for non-module scripts
if (typeof window !== 'undefined') {
    window.MissionLogsManager = missionLogsManager;
}
