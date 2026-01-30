/**
 * BiometricAuthModal - UI Component for WebAuthn Registration & Authentication
 * Handles biometric enrollment and login flows with TouchID, FaceID, YubiKey
 */

import { WebAuthnService } from '../core/webauthn.js';
import { SessionManager } from '../core/sessionManager.js';
import { auth } from '../core/firebase.js';

export class BiometricAuthModal {
  constructor() {
    this.webauthn = new WebAuthnService();
    this.sessionManager = new SessionManager();
    this.modal = null;
    this.currentMode = 'register'; // 'register' or 'authenticate'
  }

  /**
   * Show registration modal for enrolling biometric credentials
   */
  async showRegistrationModal(userId, username, email) {
    this.currentMode = 'register';
    
    // Check authenticator support
    const support = await this.webauthn.checkAuthenticatorSupport();
    
    this.modal = this.createModal({
      title: '🔐 Setup Biometric Login',
      subtitle: 'Secure your account with TouchID, FaceID, or Security Key',
      support,
      userId,
      username,
      email
    });

    document.body.appendChild(this.modal);
    this.modal.classList.add('show');
  }

  /**
   * Show authentication modal for logging in with biometrics
   */
  async showAuthenticationModal(email) {
    this.currentMode = 'authenticate';
    
    const support = await this.webauthn.checkAuthenticatorSupport();
    
    this.modal = this.createModal({
      title: '🔓 Biometric Login',
      subtitle: 'Use your registered device to sign in',
      support,
      email
    });

    document.body.appendChild(this.modal);
    this.modal.classList.add('show');
  }

  /**
   * Create modal DOM structure
   */
  createModal(config) {
    const modal = document.createElement('div');
    modal.className = 'biometric-modal-overlay';
    modal.innerHTML = `
      <div class="biometric-modal">
        <button class="biometric-close" onclick="this.closest('.biometric-modal-overlay').remove()">×</button>
        
        <div class="biometric-header">
          <h2>${config.title}</h2>
          <p>${config.subtitle}</p>
        </div>

        <div class="biometric-body">
          ${this.currentMode === 'register' ? this.getRegistrationContent(config) : this.getAuthenticationContent(config)}
        </div>

        <div class="biometric-status" id="biometric-status"></div>
      </div>
    `;

    // Setup event listeners
    this.setupEventListeners(modal, config);
    
    return modal;
  }

  /**
   * Registration mode content
   */
  getRegistrationContent(config) {
    const platformAvailable = config.support.platform;
    const crossPlatformAvailable = config.support.crossPlatform;

    return `
      <div class="biometric-options">
        ${platformAvailable ? `
          <button class="biometric-option" data-type="platform">
            <div class="biometric-icon">📱</div>
            <div class="biometric-info">
              <h3>This Device</h3>
              <p>Use TouchID, FaceID, or Windows Hello</p>
            </div>
          </button>
        ` : ''}
        
        ${crossPlatformAvailable ? `
          <button class="biometric-option" data-type="cross-platform">
            <div class="biometric-icon">🔑</div>
            <div class="biometric-info">
              <h3>Security Key</h3>
              <p>Use YubiKey or other hardware authenticator</p>
            </div>
          </button>
        ` : ''}

        ${!platformAvailable && !crossPlatformAvailable ? `
          <div class="biometric-error">
            <p>⚠️ Your browser doesn't support biometric authentication</p>
            <p class="biometric-error-sub">Please use a modern browser like Chrome, Safari, or Edge</p>
          </div>
        ` : ''}
      </div>

      <div class="biometric-footer">
        <p class="biometric-note">
          🛡️ Your biometric data never leaves your device
        </p>
      </div>
    `;
  }

  /**
   * Authentication mode content
   */
  getAuthenticationContent(config) {
    return `
      <div class="biometric-auth-prompt">
        <div class="biometric-fingerprint-icon">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 10v4m0-8a6 6 0 0 1 6 6v1m-6-7a6 6 0 0 0-6 6v1m6-7c.34 0 .68.02 1.01.07M18 13a6 6 0 0 1-6 6 6 6 0 0 1-6-6m6 6v2"/>
          </svg>
        </div>
        <button class="biometric-auth-btn" data-action="authenticate">
          Authenticate Now
        </button>
        <p class="biometric-auth-hint">
          Touch your device's sensor or insert your security key
        </p>
      </div>
    `;
  }

  /**
   * Setup event listeners for modal interactions
   */
  setupEventListeners(modal, config) {
    // Registration buttons
    const options = modal.querySelectorAll('.biometric-option');
    options.forEach(option => {
      option.addEventListener('click', async () => {
        const type = option.dataset.type;
        await this.handleRegistration(type, config);
      });
    });

    // Authentication button
    const authBtn = modal.querySelector('[data-action="authenticate"]');
    if (authBtn) {
      authBtn.addEventListener('click', async () => {
        await this.handleAuthentication(config.email);
      });
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  /**
   * Handle biometric registration
   */
  async handleRegistration(authenticatorType, config) {
    const statusEl = this.modal.querySelector('#biometric-status');
    
    try {
      statusEl.innerHTML = `
        <div class="biometric-loading">
          <div class="spinner"></div>
          <p>Please authenticate on your device...</p>
        </div>
      `;

      // Register credential
      const credential = await this.webauthn.registerCredential(
        config.userId,
        config.username,
        config.email,
        authenticatorType
      );

      statusEl.innerHTML = `
        <div class="biometric-success">
          <span style="font-size: 48px;">✅</span>
          <h3>Biometric Login Enabled!</h3>
          <p>You can now sign in with ${authenticatorType === 'platform' ? 'TouchID/FaceID' : 'your security key'}</p>
        </div>
      `;

      // Close modal after 2 seconds
      setTimeout(() => {
        this.modal.remove();
        
        // Dispatch success event
        window.dispatchEvent(new CustomEvent('biometric-registered', {
          detail: { credential, authenticatorType }
        }));
      }, 2000);

    } catch (error) {
      console.error('Registration failed:', error);
      statusEl.innerHTML = `
        <div class="biometric-error">
          <span style="font-size: 36px;">❌</span>
          <h3>Registration Failed</h3>
          <p>${error.message}</p>
          <button onclick="this.closest('#biometric-status').innerHTML = ''">Try Again</button>
        </div>
      `;
    }
  }

  /**
   * Handle biometric authentication
   */
  async handleAuthentication(email) {
    const statusEl = this.modal.querySelector('#biometric-status');
    
    try {
      statusEl.innerHTML = `
        <div class="biometric-loading">
          <div class="spinner"></div>
          <p>Authenticating...</p>
        </div>
      `;

      // Authenticate with WebAuthn
      const result = await this.webauthn.authenticateCredential(email);

      // Create secure session
      const user = auth.currentUser || { uid: result.userId };
      const session = await this.sessionManager.createSession(user.uid, {
        biometric: true,
        credentialId: result.credentialId
      });

      statusEl.innerHTML = `
        <div class="biometric-success">
          <span style="font-size: 48px;">✅</span>
          <h3>Authentication Successful!</h3>
          <p>Redirecting to dashboard...</p>
        </div>
      `;

      // Redirect after 1 second
      setTimeout(() => {
        window.location.href = '/website/pages/dashboard.html';
      }, 1000);

    } catch (error) {
      console.error('Authentication failed:', error);
      statusEl.innerHTML = `
        <div class="biometric-error">
          <span style="font-size: 36px;">❌</span>
          <h3>Authentication Failed</h3>
          <p>${error.message}</p>
          <button onclick="this.closest('#biometric-status').innerHTML = ''">Try Again</button>
        </div>
      `;
    }
  }

  /**
   * Close and cleanup modal
   */
  close() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }
  }
}

// Export singleton instance
export const biometricModal = new BiometricAuthModal();
