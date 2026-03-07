/**
 * Secure Session Manager with Rotating Refresh Tokens
 * Implements zero-trust session management to prevent hijacking in public environments
 * 
 * Key Features:
 * - Rotating refresh tokens (token changes after each use)
 * - Browser fingerprinting validation
 * - Session timeout and idle detection
 * - Multi-device session management
 * - Suspicious activity detection
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
import fingerprint from '../utils/fingerprint.js';

class SessionManager {
  constructor() {
    this.sessionsCollection = 'secure_sessions';
    this.refreshTokensCollection = 'refresh_tokens';
    this.activityLogsCollection = 'session_activity';
    
    this.accessTokenExpiry = 15 * 60 * 1000; // 15 minutes
    this.refreshTokenExpiry = 30 * 24 * 60 * 60 * 1000; // 30 days
    this.idleTimeout = 30 * 60 * 1000; // 30 minutes
    
    this.currentSession = null;
    this.idleTimer = null;
    this.tokenRefreshTimer = null;
    
    this.initializeIdleDetection();
  }

  /**
   * Create a new secure session after successful authentication
   */
  async createSession(userId, authMethod = 'webauthn') {
    try {
      const sessionId = crypto.randomUUID();
      const browserFingerprint = await fingerprint.generate();
      
      const sessionData = {
        sessionId,
        userId,
        fingerprint: browserFingerprint,
        authMethod,
        createdAt: serverTimestamp(),
        lastActivityAt: serverTimestamp(),
        expiresAt: Date.now() + this.refreshTokenExpiry,
        ipAddress: await this.getClientIP(),
        userAgent: navigator.userAgent,
        deviceInfo: await this.getDeviceInfo(),
        isActive: true
      };

      // Store session in Firestore
      await setDoc(doc(db, this.sessionsCollection, sessionId), sessionData);

      // Generate initial tokens
      const { accessToken, refreshToken } = await this.generateTokens(sessionId, userId);

      // Store refresh token securely
      await this.storeRefreshToken(refreshToken, sessionId, userId, browserFingerprint);

      // Store in memory
      this.currentSession = {
        ...sessionData,
        accessToken,
        refreshToken
      };

      // Store tokens securely in sessionStorage (not localStorage for security)
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('refresh_token', refreshToken);
      sessionStorage.setItem('session_id', sessionId);

      // Start token refresh cycle
      this.scheduleTokenRefresh();

      // Log successful session creation
      await this.logActivity(userId, sessionId, 'session_created', {
        authMethod,
        deviceInfo: sessionData.deviceInfo
      });

      return {
        success: true,
        sessionId,
        accessToken,
        expiresIn: this.accessTokenExpiry
      };

    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  /**
   * Generate access and refresh tokens
   */
  async generateTokens(sessionId, userId) {
    const tokenData = {
      sessionId,
      userId,
      timestamp: Date.now()
    };

    // Generate cryptographically secure tokens
    const accessToken = await this.generateSecureToken({ ...tokenData, type: 'access' });
    const refreshToken = await this.generateSecureToken({ ...tokenData, type: 'refresh' });

    return { accessToken, refreshToken };
  }

  /**
   * Generate a cryptographically secure token
   */
  async generateSecureToken(data) {
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    
    const tokenString = JSON.stringify(data) + Array.from(randomBytes).join('');
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(tokenString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Store refresh token in Firestore
   */
  async storeRefreshToken(token, sessionId, userId, browserFingerprint) {
    const tokenData = {
      token,
      sessionId,
      userId,
      fingerprint: browserFingerprint,
      createdAt: serverTimestamp(),
      expiresAt: Date.now() + this.refreshTokenExpiry,
      usedAt: null,
      rotatedAt: null,
      isValid: true
    };

    await setDoc(doc(db, this.refreshTokensCollection, token), tokenData);
  }

  /**
   * Refresh access token using refresh token (with rotation)
   */
  async refreshAccessToken() {
    try {
      const refreshToken = sessionStorage.getItem('refresh_token');
      const sessionId = sessionStorage.getItem('session_id');

      if (!refreshToken || !sessionId) {
        throw new Error('No refresh token found');
      }

      // Get refresh token from Firestore
      const tokenDoc = await getDoc(doc(db, this.refreshTokensCollection, refreshToken));

      if (!tokenDoc.exists() || !tokenDoc.data().isValid) {
        throw new Error('Invalid refresh token');
      }

      const tokenData = tokenDoc.data();

      // Validate session
      const sessionDoc = await getDoc(doc(db, this.sessionsCollection, sessionId));
      if (!sessionDoc.exists() || !sessionDoc.data().isActive) {
        throw new Error('Invalid session');
      }

      // Verify fingerprint
      const currentFingerprint = await fingerprint.generate();
      if (tokenData.fingerprint !== currentFingerprint) {
        // Suspicious activity - fingerprint mismatch
        await this.handleSuspiciousActivity(tokenData.userId, sessionId, 'fingerprint_mismatch');
        throw new Error('Fingerprint verification failed');
      }

      // Check expiration
      if (tokenData.expiresAt < Date.now()) {
        throw new Error('Refresh token expired');
      }

      // Generate new tokens (token rotation)
      const { accessToken, refreshToken: newRefreshToken } = await this.generateTokens(
        sessionId,
        tokenData.userId
      );

      // Invalidate old refresh token
      await updateDoc(doc(db, this.refreshTokensCollection, refreshToken), {
        isValid: false,
        usedAt: serverTimestamp(),
        rotatedAt: serverTimestamp()
      });

      // Store new refresh token
      await this.storeRefreshToken(newRefreshToken, sessionId, tokenData.userId, currentFingerprint);

      // Update session activity
      await updateDoc(doc(db, this.sessionsCollection, sessionId), {
        lastActivityAt: serverTimestamp()
      });

      // Update stored tokens
      sessionStorage.setItem('access_token', accessToken);
      sessionStorage.setItem('refresh_token', newRefreshToken);

      // Update current session
      if (this.currentSession) {
        this.currentSession.accessToken = accessToken;
        this.currentSession.refreshToken = newRefreshToken;
      }

      // Log token refresh
      await this.logActivity(tokenData.userId, sessionId, 'token_refreshed');

      return {
        success: true,
        accessToken,
        expiresIn: this.accessTokenExpiry
      };

    } catch (error) {
      console.error('Error refreshing token:', error);
      // If refresh fails, terminate session
      await this.terminateSession();
      throw error;
    }
  }

  /**
   * Validate current access token
   */
  async validateAccessToken() {
    const accessToken = sessionStorage.getItem('access_token');
    const sessionId = sessionStorage.getItem('session_id');

    if (!accessToken || !sessionId) {
      return false;
    }

    // Check if session is still active
    const sessionDoc = await getDoc(doc(db, this.sessionsCollection, sessionId));
    
    if (!sessionDoc.exists() || !sessionDoc.data().isActive) {
      return false;
    }

    // Verify fingerprint
    const currentFingerprint = await fingerprint.generate();
    if (sessionDoc.data().fingerprint !== currentFingerprint) {
      await this.handleSuspiciousActivity(sessionDoc.data().userId, sessionId, 'fingerprint_mismatch');
      return false;
    }

    return true;
  }

  /**
   * Terminate current session
   */
  async terminateSession(sessionId = null) {
    try {
      const targetSessionId = sessionId || sessionStorage.getItem('session_id');
      
      if (!targetSessionId) return;

      // Get session data for logging
      const sessionDoc = await getDoc(doc(db, this.sessionsCollection, targetSessionId));
      
      if (sessionDoc.exists()) {
        const sessionData = sessionDoc.data();
        
        // Invalidate all refresh tokens for this session
        const tokensQuery = query(
          collection(db, this.refreshTokensCollection),
          where('sessionId', '==', targetSessionId)
        );
        const tokensSnapshot = await getDocs(tokensQuery);
        
        for (const tokenDoc of tokensSnapshot.docs) {
          await updateDoc(tokenDoc.ref, { isValid: false });
        }

        // Mark session as inactive
        await updateDoc(doc(db, this.sessionsCollection, targetSessionId), {
          isActive: false,
          terminatedAt: serverTimestamp()
        });

        // Log session termination
        await this.logActivity(sessionData.userId, targetSessionId, 'session_terminated');
      }

      // Clear local session data
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('session_id');
      
      this.currentSession = null;
      this.clearTimers();

    } catch (error) {
      console.error('Error terminating session:', error);
    }
  }

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId) {
    try {
      const sessionsQuery = query(
        collection(db, this.sessionsCollection),
        where('userId', '==', userId),
        where('isActive', '==', true)
      );
      
      const snapshot = await getDocs(sessionsQuery);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastActivityAt: doc.data().lastActivityAt?.toDate(),
        isCurrent: doc.id === sessionStorage.getItem('session_id')
      }));
    } catch (error) {
      console.error('Error getting user sessions:', error);
      return [];
    }
  }

  /**
   * Terminate a specific session (for multi-device management)
   */
  async terminateSpecificSession(sessionId) {
    await this.terminateSession(sessionId);
  }

  /**
   * Terminate all other sessions except current
   */
  async terminateOtherSessions(userId) {
    const currentSessionId = sessionStorage.getItem('session_id');
    const sessions = await this.getUserSessions(userId);
    
    for (const session of sessions) {
      if (session.id !== currentSessionId) {
        await this.terminateSession(session.id);
      }
    }
  }

  /**
   * Initialize idle detection
   */
  initializeIdleDetection() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const resetIdleTimer = () => {
      if (this.idleTimer) {
        clearTimeout(this.idleTimer);
      }
      
      this.idleTimer = setTimeout(() => {
        this.handleIdleTimeout();
      }, this.idleTimeout);
    };

    events.forEach(event => {
      document.addEventListener(event, resetIdleTimer, true);
    });

    resetIdleTimer();
  }

  /**
   * Handle idle timeout
   */
  async handleIdleTimeout() {
    console.log('Session idle timeout reached');
    await this.terminateSession();
    // Redirect to home page instead of login
    const homePath = window.location.pathname.includes('/pages/')
        ? '../index.html'
        : 'index.html';
    window.location.href = homePath + '?reason=idle';
  }

  /**
   * Schedule automatic token refresh
   */
  scheduleTokenRefresh() {
    if (this.tokenRefreshTimer) {
      clearInterval(this.tokenRefreshTimer);
    }

    // Refresh token 2 minutes before expiry
    const refreshInterval = this.accessTokenExpiry - (2 * 60 * 1000);
    
    this.tokenRefreshTimer = setInterval(async () => {
      try {
        await this.refreshAccessToken();
      } catch (error) {
        console.error('Automatic token refresh failed:', error);
        await this.terminateSession();
      }
    }, refreshInterval);
  }

  /**
   * Clear all timers
   */
  clearTimers() {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.tokenRefreshTimer) {
      clearInterval(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }
  }

  /**
   * Handle suspicious activity
   */
  async handleSuspiciousActivity(userId, sessionId, reason) {
    console.warn('Suspicious activity detected:', reason);
    
    await this.logActivity(userId, sessionId, 'suspicious_activity', { reason });
    
    // Terminate the session immediately
    await this.terminateSession(sessionId);
  }

  /**
   * Log session activity
   */
  async logActivity(userId, sessionId, action, metadata = {}) {
    try {
      const logData = {
        userId,
        sessionId,
        action,
        metadata,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        fingerprint: await fingerprint.generate()
      };

      await setDoc(
        doc(collection(db, this.activityLogsCollection)),
        logData
      );
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  /**
   * Get client IP (requires external service or server-side implementation)
   */
  async getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  }

  /**
   * Get device information
   */
  async getDeviceInfo() {
    const ua = navigator.userAgent;
    let device = 'Unknown';
    let os = 'Unknown';
    let browser = 'Unknown';

    // Detect OS
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    // Detect device type
    if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) device = 'Mobile';
    else if (ua.includes('Tablet') || ua.includes('iPad')) device = 'Tablet';
    else device = 'Desktop';

    // Detect browser
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edg')) browser = 'Edge';

    return { device, os, browser };
  }
}

export default new SessionManager();
