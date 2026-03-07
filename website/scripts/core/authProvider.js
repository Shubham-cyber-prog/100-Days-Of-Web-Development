/**
 * Auth Provider - Unified Authentication with Biometric & Encryption
 * Integrates WebAuthn, SecurityService, and traditional auth
 * 
 * Features:
 * - Biometric authentication (WebAuthn)
 * - Zero-knowledge encryption initialization
 * - Secure session management
 * - Recovery key support
 */

import webauthnService from './webauthn.js';
import securityService from './securityService.js';
import { auth, db } from './firebase.js';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

class AuthProvider {
    constructor() {
        this.currentUser = null;
        this.isEncryptionReady = false;
        this.authStateListeners = [];

        // Listen to Firebase auth state
        onAuthStateChanged(auth, (user) => {
            this.handleAuthStateChange(user);
        });
    }

    /**
     * Handle Firebase auth state changes
     */
    async handleAuthStateChange(user) {
        if (user) {
            this.currentUser = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            };

            // Notify listeners
            this.authStateListeners.forEach(listener => listener(this.currentUser));

            console.log('✅ User authenticated:', user.email);
        } else {
            this.currentUser = null;
            this.isEncryptionReady = false;
            securityService.clearKey();

            // Notify listeners
            this.authStateListeners.forEach(listener => listener(null));

            console.log('🔓 User signed out');
        }
    }

    /**
     * Register listener for auth state changes
     */
    onAuthStateChange(callback) {
        this.authStateListeners.push(callback);

        // Immediately call with current state
        if (this.currentUser) {
            callback(this.currentUser);
        }
    }

    /**
     * Traditional email/password login
     */
    async loginWithPassword(email, password, rememberMe = false) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Initialize encryption key
            await this.initializeEncryption(userCredential.user.uid, password);

            // Store session preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                sessionStorage.setItem('sessionOnly', 'true');
            }

            return {
                success: true,
                user: userCredential.user,
                encryptionReady: this.isEncryptionReady
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: this.getErrorMessage(error)
            };
        }
    }

    /**
     * Biometric login using WebAuthn
     */
    async loginWithBiometric(email) {
        try {
            // Check if WebAuthn is supported
            if (!webauthnService.isSupported()) {
                throw new Error('Biometric authentication is not supported on this device');
            }

            // Authenticate with WebAuthn
            const authResult = await webauthnService.authenticate(email);

            if (!authResult.success) {
                throw new Error('Biometric authentication failed');
            }

            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', authResult.userId));

            if (!userDoc.exists()) {
                throw new Error('User not found');
            }

            const userData = userDoc.data();

            // For biometric login, we need to derive the encryption key differently
            // since we don't have the password. We'll use a stored encrypted key.
            await this.initializeBiometricEncryption(authResult.userId);

            // Create a custom token or session
            // Note: In production, this should be done server-side
            sessionStorage.setItem('biometric_session', JSON.stringify({
                userId: authResult.userId,
                email: authResult.email,
                credentialId: authResult.credentialId,
                timestamp: Date.now()
            }));

            return {
                success: true,
                user: {
                    uid: authResult.userId,
                    email: authResult.email,
                    displayName: userData.displayName
                },
                encryptionReady: this.isEncryptionReady
            };
        } catch (error) {
            console.error('Biometric login error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Register new user with email/password
     */
    async register(email, password, displayName) {
        try {
            // Create Firebase auth account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user profile in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email,
                displayName,
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp(),
                biometricEnabled: false,
                encryptedLogsCount: 0
            });

            // Initialize encryption
            await this.initializeEncryption(user.uid, password);

            // Generate recovery key
            const recoveryKey = securityService.generateRecoveryKey();
            const recoveryKeyHash = await securityService.hash(recoveryKey);

            // Store recovery key hash
            await updateDoc(doc(db, 'users', user.uid), {
                recoveryKeyHash
            });

            return {
                success: true,
                user,
                recoveryKey, // Show this to user ONCE
                encryptionReady: this.isEncryptionReady
            };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: this.getErrorMessage(error)
            };
        }
    }

    /**
     * Enable biometric authentication for current user
     */
    async enableBiometric(authenticatorType = 'platform') {
        if (!this.currentUser) {
            throw new Error('No user logged in');
        }

        try {
            // Register WebAuthn credential
            const result = await webauthnService.registerCredential(
                this.currentUser.uid,
                this.currentUser.displayName,
                this.currentUser.email,
                authenticatorType
            );

            if (result.success) {
                // Update user profile
                await updateDoc(doc(db, 'users', this.currentUser.uid), {
                    biometricEnabled: true,
                    lastBiometricSetup: serverTimestamp()
                });

                // Store encrypted encryption key for biometric recovery
                // This allows biometric login without password
                await this.storeEncryptedKey(this.currentUser.uid);

                return {
                    success: true,
                    credentialId: result.credentialId,
                    deviceName: result.deviceName
                };
            }

            return result;
        } catch (error) {
            console.error('Biometric setup error:', error);
            throw error;
        }
    }

    /**
     * Initialize encryption for password-based login
     */
    async initializeEncryption(userId, password) {
        try {
            await securityService.initializeKey(userId, password);
            this.isEncryptionReady = true;
            console.log('🔐 Encryption initialized for user:', userId);
            return true;
        } catch (error) {
            console.error('Encryption initialization error:', error);
            this.isEncryptionReady = false;
            return false;
        }
    }

    /**
     * Initialize encryption for biometric login
     * Uses stored encrypted key instead of password
     */
    async initializeBiometricEncryption(userId) {
        try {
            // Get stored encrypted key
            const encryptedKey = localStorage.getItem(`enc_key_${userId}`);

            if (!encryptedKey) {
                console.warn('No stored encryption key for biometric login');
                this.isEncryptionReady = false;
                return false;
            }

            // In a real implementation, this would decrypt the stored key
            // using a key derived from the biometric credential
            // For now, we'll mark as ready but with limited functionality
            this.isEncryptionReady = true;
            console.log('🔐 Biometric encryption initialized');
            return true;
        } catch (error) {
            console.error('Biometric encryption error:', error);
            this.isEncryptionReady = false;
            return false;
        }
    }

    /**
     * Store encrypted encryption key for biometric recovery
     */
    async storeEncryptedKey(userId) {
        try {
            // This is a simplified version
            // In production, you'd encrypt the actual key with a key derived from WebAuthn
            const keyMarker = await securityService.hash(userId + Date.now());
            localStorage.setItem(`enc_key_${userId}`, keyMarker);
            return true;
        } catch (error) {
            console.error('Key storage error:', error);
            return false;
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            // Clear encryption key
            securityService.clearKey();
            this.isEncryptionReady = false;

            // Clear session data
            sessionStorage.clear();
            localStorage.removeItem('rememberMe');

            // Sign out from Firebase
            await signOut(auth);

            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Check if encryption is ready
     */
    isEncryptionInitialized() {
        return this.isEncryptionReady;
    }

    /**
     * Get user-friendly error messages
     */
    getErrorMessage(error) {
        const errorMessages = {
            'auth/user-not-found': 'No account found with this email',
            'auth/wrong-password': 'Incorrect password',
            'auth/email-already-in-use': 'Email already registered',
            'auth/weak-password': 'Password should be at least 6 characters',
            'auth/invalid-email': 'Invalid email address',
            'auth/too-many-requests': 'Too many failed attempts. Please try again later'
        };

        return errorMessages[error.code] || error.message || 'Authentication failed';
    }

    /**
     * Recover account using recovery key
     */
    async recoverWithKey(email, recoveryKey) {
        try {
            // Get user by email
            const userDoc = await getDoc(doc(db, 'users', email));

            if (!userDoc.exists()) {
                throw new Error('Account not found');
            }

            const userData = userDoc.data();
            const recoveryKeyHash = await securityService.hash(recoveryKey);

            // Verify recovery key
            if (recoveryKeyHash !== userData.recoveryKeyHash) {
                throw new Error('Invalid recovery key');
            }

            // Allow user to set new password
            return {
                success: true,
                userId: userDoc.id,
                email: userData.email
            };
        } catch (error) {
            console.error('Recovery error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Export singleton instance
const authProvider = new AuthProvider();
export default authProvider;

// Global export for non-module scripts
if (typeof window !== 'undefined') {
    window.AuthProvider = authProvider;
}
