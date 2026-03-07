/**
 * Security Service - Zero-Knowledge Encryption for Mission Logs
 * Uses Web Crypto API (AES-GCM) for client-side encryption
 * 
 * Key Features:
 * - AES-256-GCM encryption (authenticated encryption)
 * - PBKDF2 key derivation from user password
 * - Zero-knowledge: server only stores encrypted blobs
 * - Secure key management in browser memory
 */

class SecurityService {
    constructor() {
        this.encryptionKey = null;
        this.keyDerivationIterations = 100000; // PBKDF2 iterations
        this.algorithm = 'AES-GCM';
        this.keyLength = 256;
    }

    /**
     * Derive encryption key from user password using PBKDF2
     * @param {string} password - User's password
     * @param {Uint8Array} salt - Cryptographic salt (should be unique per user)
     * @returns {Promise<CryptoKey>} Derived encryption key
     */
    async deriveKey(password, salt) {
        try {
            // Convert password to key material
            const encoder = new TextEncoder();
            const passwordBuffer = encoder.encode(password);

            const keyMaterial = await crypto.subtle.importKey(
                'raw',
                passwordBuffer,
                'PBKDF2',
                false,
                ['deriveKey']
            );

            // Derive AES-GCM key
            const key = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: this.keyDerivationIterations,
                    hash: 'SHA-256'
                },
                keyMaterial,
                {
                    name: this.algorithm,
                    length: this.keyLength
                },
                false, // Not extractable (cannot be exported)
                ['encrypt', 'decrypt']
            );

            return key;
        } catch (error) {
            console.error('Key derivation error:', error);
            throw new Error('Failed to derive encryption key');
        }
    }

    /**
     * Generate a cryptographically secure salt
     * @returns {Uint8Array} Random salt
     */
    generateSalt() {
        return crypto.getRandomValues(new Uint8Array(16));
    }

    /**
     * Generate a random initialization vector (IV)
     * @returns {Uint8Array} Random IV
     */
    generateIV() {
        return crypto.getRandomValues(new Uint8Array(12)); // 96 bits for GCM
    }

    /**
     * Initialize encryption key for current session
     * @param {string} userId - User ID
     * @param {string} password - User's password
     */
    async initializeKey(userId, password) {
        try {
            // Get or create user salt
            let salt = this.getUserSalt(userId);
            if (!salt) {
                salt = this.generateSalt();
                this.storeUserSalt(userId, salt);
            }

            // Derive and store key in memory
            this.encryptionKey = await this.deriveKey(password, salt);
            console.log('🔐 Encryption key initialized for session');

            return true;
        } catch (error) {
            console.error('Key initialization error:', error);
            throw new Error('Failed to initialize encryption');
        }
    }

    /**
     * Encrypt mission log data
     * @param {string} plaintext - Data to encrypt
     * @returns {Promise<Object>} Encrypted data with IV
     */
    async encrypt(plaintext) {
        if (!this.encryptionKey) {
            throw new Error('Encryption key not initialized. Call initializeKey() first.');
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(plaintext);
            const iv = this.generateIV();

            const encryptedData = await crypto.subtle.encrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                this.encryptionKey,
                data
            );

            // Return encrypted data and IV (both needed for decryption)
            return {
                ciphertext: this.bufferToBase64(encryptedData),
                iv: this.bufferToBase64(iv),
                algorithm: this.algorithm,
                timestamp: Date.now()
            };
        } catch (error) {
            console.error('Encryption error:', error);
            throw new Error('Failed to encrypt data');
        }
    }

    /**
     * Decrypt mission log data
     * @param {Object} encryptedData - Encrypted data object with IV
     * @returns {Promise<string>} Decrypted plaintext
     */
    async decrypt(encryptedData) {
        if (!this.encryptionKey) {
            throw new Error('Encryption key not initialized. Call initializeKey() first.');
        }

        try {
            const ciphertext = this.base64ToBuffer(encryptedData.ciphertext);
            const iv = this.base64ToBuffer(encryptedData.iv);

            const decryptedData = await crypto.subtle.decrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                this.encryptionKey,
                ciphertext
            );

            const decoder = new TextDecoder();
            return decoder.decode(decryptedData);
        } catch (error) {
            console.error('Decryption error:', error);
            throw new Error('Failed to decrypt data. Key may be incorrect.');
        }
    }

    /**
     * Encrypt multiple mission logs
     * @param {Array} logs - Array of mission log objects
     * @returns {Promise<Array>} Array of encrypted logs
     */
    async encryptLogs(logs) {
        const encryptedLogs = [];

        for (const log of logs) {
            try {
                const encrypted = await this.encrypt(JSON.stringify(log));
                encryptedLogs.push({
                    id: log.id,
                    encrypted: encrypted,
                    createdAt: log.createdAt
                });
            } catch (error) {
                console.error(`Failed to encrypt log ${log.id}:`, error);
            }
        }

        return encryptedLogs;
    }

    /**
     * Decrypt multiple mission logs
     * @param {Array} encryptedLogs - Array of encrypted log objects
     * @returns {Promise<Array>} Array of decrypted logs
     */
    async decryptLogs(encryptedLogs) {
        const decryptedLogs = [];

        for (const encLog of encryptedLogs) {
            try {
                const decrypted = await this.decrypt(encLog.encrypted);
                const log = JSON.parse(decrypted);
                decryptedLogs.push(log);
            } catch (error) {
                console.error(`Failed to decrypt log ${encLog.id}:`, error);
                // Add placeholder for failed decryption
                decryptedLogs.push({
                    id: encLog.id,
                    error: 'Decryption failed',
                    createdAt: encLog.createdAt
                });
            }
        }

        return decryptedLogs;
    }

    /**
     * Store user salt in localStorage (salt is not secret)
     * @param {string} userId - User ID
     * @param {Uint8Array} salt - Salt to store
     */
    storeUserSalt(userId, salt) {
        const saltBase64 = this.bufferToBase64(salt);
        localStorage.setItem(`salt_${userId}`, saltBase64);
    }

    /**
     * Retrieve user salt from localStorage
     * @param {string} userId - User ID
     * @returns {Uint8Array|null} Salt or null if not found
     */
    getUserSalt(userId) {
        const saltBase64 = localStorage.getItem(`salt_${userId}`);
        if (!saltBase64) return null;
        return this.base64ToBuffer(saltBase64);
    }

    /**
     * Clear encryption key from memory (call on logout)
     */
    clearKey() {
        this.encryptionKey = null;
        console.log('🔐 Encryption key cleared from memory');
    }

    /**
     * Convert ArrayBuffer to Base64 string
     * @param {ArrayBuffer} buffer - Buffer to convert
     * @returns {string} Base64 string
     */
    bufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    /**
     * Convert Base64 string to ArrayBuffer
     * @param {string} base64 - Base64 string
     * @returns {ArrayBuffer} Buffer
     */
    base64ToBuffer(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }

    /**
     * Generate a secure random recovery key
     * @returns {string} Recovery key (24 characters)
     */
    generateRecoveryKey() {
        const array = new Uint8Array(18); // 18 bytes = 24 base64 chars
        crypto.getRandomValues(array);
        return this.bufferToBase64(array).substring(0, 24);
    }

    /**
     * Hash data using SHA-256
     * @param {string} data - Data to hash
     * @returns {Promise<string>} Hex hash
     */
    async hash(data) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Verify data integrity using hash
     * @param {string} data - Original data
     * @param {string} expectedHash - Expected hash
     * @returns {Promise<boolean>} True if hash matches
     */
    async verifyHash(data, expectedHash) {
        const actualHash = await this.hash(data);
        return actualHash === expectedHash;
    }
}

// Export singleton instance
const securityService = new SecurityService();
export default securityService;

// Global export for non-module scripts
if (typeof window !== 'undefined') {
    window.SecurityService = securityService;
}
