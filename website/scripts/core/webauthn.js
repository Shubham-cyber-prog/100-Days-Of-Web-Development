/**
 * WebAuthn Service - Zero-Knowledge Biometric Authentication
 * Handles WebAuthn credential creation, authentication challenges, and secure key management
 * 
 * Key Features:
 * - TouchID, FaceID, and hardware security key support (YubiKey)
 * - Challenge-response handshake with browser authenticator
 * - Public key stored in Firestore, private key never leaves device
 * - Multi-device credential management
 */

import { auth, db } from './firebase.js';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc,
  deleteDoc,
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

class WebAuthnService {
  constructor() {
    this.rpName = '100 Days Web Dev';
    this.rpId = window.location.hostname;
    this.credentialsCollection = 'webauthn_credentials';
    this.challengesCollection = 'webauthn_challenges';
  }

  /**
   * Check if WebAuthn is supported in the current browser
   */
  isSupported() {
    return window.PublicKeyCredential !== undefined && 
           navigator.credentials !== undefined;
  }

  /**
   * Check available authenticator types (platform or cross-platform)
   */
  async checkAuthenticatorSupport() {
    if (!this.isSupported()) {
      return { platform: false, crossPlatform: false };
    }

    try {
      const platform = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      // Cross-platform is generally supported if WebAuthn is available
      return { 
        platform, // TouchID, FaceID, Windows Hello
        crossPlatform: true // Hardware keys like YubiKey
      };
    } catch (error) {
      console.error('Error checking authenticator support:', error);
      return { platform: false, crossPlatform: false };
    }
  }

  /**
   * Generate a cryptographically secure challenge
   */
  generateChallenge() {
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);
    return challenge;
  }

  /**
   * Convert ArrayBuffer to Base64URL string
   */
  bufferToBase64URL(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  /**
   * Convert Base64URL string to ArrayBuffer
   */
  base64URLToBuffer(base64url) {
    const base64 = base64url
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Register a new biometric credential
   * @param {string} userId - Firebase user ID
   * @param {string} username - User's display name
   * @param {string} email - User's email
   * @param {string} authenticatorType - 'platform' or 'cross-platform'
   */
  async registerCredential(userId, username, email, authenticatorType = 'platform') {
    if (!this.isSupported()) {
      throw new Error('WebAuthn is not supported in this browser');
    }

    try {
      // Generate challenge and store it temporarily
      const challenge = this.generateChallenge();
      const challengeId = crypto.randomUUID();
      
      await setDoc(doc(db, this.challengesCollection, challengeId), {
        challenge: this.bufferToBase64URL(challenge),
        userId,
        type: 'registration',
        createdAt: serverTimestamp(),
        expiresAt: Date.now() + 300000 // 5 minutes
      });

      // Create credential creation options
      const publicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: this.rpName,
          id: this.rpId
        },
        user: {
          id: new TextEncoder().encode(userId),
          name: email,
          displayName: username
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' },  // ES256
          { alg: -257, type: 'public-key' } // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: authenticatorType === 'platform' ? 'platform' : 'cross-platform',
          userVerification: 'required',
          requireResidentKey: false
        },
        timeout: 60000,
        attestation: 'direct'
      };

      // Create the credential
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      });

      if (!credential) {
        throw new Error('Failed to create credential');
      }

      // Store the public key credential in Firestore
      const credentialData = {
        credentialId: this.bufferToBase64URL(credential.rawId),
        publicKey: this.bufferToBase64URL(
          credential.response.getPublicKey()
        ),
        counter: credential.response.getAuthenticatorData 
          ? new DataView(credential.response.getAuthenticatorData()).getUint32(33, false)
          : 0,
        userId,
        username,
        email,
        authenticatorType,
        deviceName: await this.getDeviceName(),
        createdAt: serverTimestamp(),
        lastUsedAt: serverTimestamp(),
        aaguid: this.extractAAGUID(credential.response.getAuthenticatorData())
      };

      await setDoc(
        doc(db, this.credentialsCollection, credentialData.credentialId),
        credentialData
      );

      // Clean up challenge
      await deleteDoc(doc(db, this.challengesCollection, challengeId));

      return {
        success: true,
        credentialId: credentialData.credentialId,
        deviceName: credentialData.deviceName
      };

    } catch (error) {
      console.error('WebAuthn registration error:', error);
      throw this.handleWebAuthnError(error);
    }
  }

  /**
   * Authenticate using a biometric credential
   * @param {string} email - User's email
   */
  async authenticate(email) {
    if (!this.isSupported()) {
      throw new Error('WebAuthn is not supported in this browser');
    }

    try {
      // Get user's credentials from Firestore
      const credentialsQuery = query(
        collection(db, this.credentialsCollection),
        where('email', '==', email)
      );
      const credentialsSnapshot = await getDocs(credentialsQuery);

      if (credentialsSnapshot.empty) {
        throw new Error('No biometric credentials found for this email');
      }

      // Generate challenge
      const challenge = this.generateChallenge();
      const challengeId = crypto.randomUUID();
      
      await setDoc(doc(db, this.challengesCollection, challengeId), {
        challenge: this.bufferToBase64URL(challenge),
        email,
        type: 'authentication',
        createdAt: serverTimestamp(),
        expiresAt: Date.now() + 300000 // 5 minutes
      });

      // Get allowed credentials
      const allowCredentials = credentialsSnapshot.docs.map(doc => ({
        id: this.base64URLToBuffer(doc.id),
        type: 'public-key',
        transports: ['internal', 'usb', 'nfc', 'ble']
      }));

      // Create authentication options
      const publicKeyCredentialRequestOptions = {
        challenge,
        allowCredentials,
        timeout: 60000,
        userVerification: 'required',
        rpId: this.rpId
      };

      // Get the credential
      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });

      if (!credential) {
        throw new Error('Authentication failed');
      }

      const credentialId = this.bufferToBase64URL(credential.rawId);

      // Verify the credential (in production, this should be done server-side)
      const credentialDoc = await getDoc(
        doc(db, this.credentialsCollection, credentialId)
      );

      if (!credentialDoc.exists()) {
        throw new Error('Credential not found');
      }

      // Update last used timestamp and counter
      await updateDoc(doc(db, this.credentialsCollection, credentialId), {
        lastUsedAt: serverTimestamp(),
        counter: new DataView(credential.response.authenticatorData).getUint32(33, false)
      });

      // Clean up challenge
      await deleteDoc(doc(db, this.challengesCollection, challengeId));

      return {
        success: true,
        userId: credentialDoc.data().userId,
        credentialId,
        email: credentialDoc.data().email,
        username: credentialDoc.data().username
      };

    } catch (error) {
      console.error('WebAuthn authentication error:', error);
      throw this.handleWebAuthnError(error);
    }
  }

  /**
   * Get all credentials for a user
   */
  async getUserCredentials(userId) {
    try {
      const credentialsQuery = query(
        collection(db, this.credentialsCollection),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(credentialsQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastUsedAt: doc.data().lastUsedAt?.toDate()
      }));
    } catch (error) {
      console.error('Error getting user credentials:', error);
      throw error;
    }
  }

  /**
   * Delete a credential
   */
  async deleteCredential(credentialId) {
    try {
      await deleteDoc(doc(db, this.credentialsCollection, credentialId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting credential:', error);
      throw error;
    }
  }

  /**
   * Extract AAGUID from authenticator data
   */
  extractAAGUID(authenticatorData) {
    if (!authenticatorData) return null;
    const dataView = new DataView(authenticatorData);
    const aaguidBytes = new Uint8Array(authenticatorData.slice(37, 53));
    return Array.from(aaguidBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  /**
   * Get device name based on user agent
   */
  async getDeviceName() {
    const ua = navigator.userAgent;
    let deviceName = 'Unknown Device';

    if (ua.includes('Mac')) {
      deviceName = 'Mac';
      if (ua.includes('iPhone')) deviceName = 'iPhone';
      else if (ua.includes('iPad')) deviceName = 'iPad';
    } else if (ua.includes('Windows')) {
      deviceName = 'Windows PC';
    } else if (ua.includes('Android')) {
      deviceName = 'Android Device';
    } else if (ua.includes('Linux')) {
      deviceName = 'Linux PC';
    }

    return deviceName;
  }

  /**
   * Handle WebAuthn errors
   */
  handleWebAuthnError(error) {
    if (error.name === 'NotAllowedError') {
      return new Error('Authentication was cancelled or timed out');
    } else if (error.name === 'InvalidStateError') {
      return new Error('Authenticator already registered');
    } else if (error.name === 'NotSupportedError') {
      return new Error('Authenticator not supported');
    } else if (error.name === 'SecurityError') {
      return new Error('Security error - ensure site is using HTTPS');
    } else if (error.name === 'AbortError') {
      return new Error('Authentication request was aborted');
    }
    return error;
  }

  /**
   * Clean up expired challenges (should be run periodically)
   */
  async cleanupExpiredChallenges() {
    try {
      const snapshot = await getDocs(collection(db, this.challengesCollection));
      const now = Date.now();
      
      for (const doc of snapshot.docs) {
        if (doc.data().expiresAt < now) {
          await deleteDoc(doc.ref);
        }
      }
    } catch (error) {
      console.error('Error cleaning up challenges:', error);
    }
  }
}

export default new WebAuthnService();
