/**
 * RecoveryKeyManager - Secure Recovery Flow for Lost Biometric Devices
 * Generates cryptographic recovery keys instead of traditional password resets
 * Follows Zero-Trust principles with offline key generation
 */

import { db } from './firebase.js';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

export class RecoveryKeyManager {
  constructor() {
    this.recoveryCollection = 'recovery_keys';
    this.keyLength = 32; // 256-bit recovery key
    this.codeWords = 8; // Split into 8 word groups
  }

  /**
   * Generate a secure recovery key for user
   * @param {string} userId - Firebase user ID
   * @returns {Promise<{recoveryKey: string, codeWords: string[]}>}
   */
  async generateRecoveryKey(userId) {
    // Generate cryptographically secure random bytes
    const randomBytes = new Uint8Array(this.keyLength);
    crypto.getRandomValues(randomBytes);

    // Convert to base32 for human readability (no ambiguous characters)
    const recoveryKey = this.bytesToBase32(randomBytes);
    
    // Split into word groups for easier manual entry
    const codeWords = this.splitIntoWords(recoveryKey);

    // Hash the key for storage (never store plain recovery key)
    const keyHash = await this.hashKey(recoveryKey);

    // Store hashed recovery key in Firestore
    await setDoc(doc(db, this.recoveryCollection, userId), {
      keyHash,
      createdAt: serverTimestamp(),
      used: false,
      usageCount: 0,
      lastUsed: null
    });

    return { recoveryKey, codeWords };
  }

  /**
   * Verify recovery key matches stored hash
   * @param {string} userId - Firebase user ID
   * @param {string} recoveryKey - User-provided recovery key
   * @returns {Promise<boolean>}
   */
  async verifyRecoveryKey(userId, recoveryKey) {
    try {
      const docRef = doc(db, this.recoveryCollection, userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return false;
      }

      const data = docSnap.data();
      const providedHash = await this.hashKey(recoveryKey);

      // Check if hashes match
      const isValid = providedHash === data.keyHash;

      if (isValid) {
        // Update usage tracking
        await updateDoc(docRef, {
          used: true,
          usageCount: (data.usageCount || 0) + 1,
          lastUsed: serverTimestamp()
        });
      }

      return isValid;

    } catch (error) {
      console.error('Recovery key verification failed:', error);
      return false;
    }
  }

  /**
   * Regenerate recovery key (invalidates old one)
   * @param {string} userId - Firebase user ID
   * @returns {Promise<{recoveryKey: string, codeWords: string[]}>}
   */
  async regenerateRecoveryKey(userId) {
    // Generate new key (this automatically overwrites old one)
    return await this.generateRecoveryKey(userId);
  }

  /**
   * Hash recovery key using SHA-256
   * @param {string} key - Recovery key to hash
   * @returns {Promise<string>}
   */
  async hashKey(key) {
    const encoder = new TextEncoder();
    const data = encoder.encode(key);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Convert bytes to base32 (no ambiguous characters)
   * @param {Uint8Array} bytes - Random bytes
   * @returns {string}
   */
  bytesToBase32(bytes) {
    const base32Chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1
    let result = '';
    
    for (let i = 0; i < bytes.length; i += 5) {
      // Process 5 bytes at a time (40 bits = 8 base32 chars)
      let buffer = 0;
      let bitsInBuffer = 0;

      for (let j = 0; j < 5 && i + j < bytes.length; j++) {
        buffer = (buffer << 8) | bytes[i + j];
        bitsInBuffer += 8;
      }

      // Extract 5-bit chunks
      while (bitsInBuffer >= 5) {
        bitsInBuffer -= 5;
        const index = (buffer >> bitsInBuffer) & 0x1F;
        result += base32Chars[index];
      }
    }

    return result;
  }

  /**
   * Split recovery key into readable word groups
   * @param {string} key - Full recovery key
   * @returns {string[]}
   */
  splitIntoWords(key) {
    const words = [];
    const charsPerWord = Math.ceil(key.length / this.codeWords);
    
    for (let i = 0; i < key.length; i += charsPerWord) {
      words.push(key.substring(i, i + charsPerWord));
    }
    
    return words;
  }

  /**
   * Show recovery key modal with download/print options
   * @param {string} userId - Firebase user ID
   */
  async showRecoveryKeyModal(userId) {
    // Generate recovery key
    const { recoveryKey, codeWords } = await this.generateRecoveryKey(userId);

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'recovery-modal-overlay';
    modal.innerHTML = `
      <div class="recovery-modal">
        <div class="recovery-header">
          <h2>🔑 Your Recovery Key</h2>
          <p>Save this key securely - you'll need it if you lose access to your biometric device</p>
        </div>

        <div class="recovery-body">
          <div class="recovery-key-display">
            ${codeWords.map((word, i) => `
              <div class="recovery-word">
                <span class="recovery-word-number">${i + 1}</span>
                <span class="recovery-word-text">${word}</span>
              </div>
            `).join('')}
          </div>

          <div class="recovery-full-key">
            <input type="text" value="${recoveryKey}" readonly id="recovery-key-input" />
            <button onclick="navigator.clipboard.writeText('${recoveryKey}'); this.textContent = '✓ Copied'">
              Copy
            </button>
          </div>

          <div class="recovery-warning">
            ⚠️ <strong>Important:</strong> Store this key offline in a secure location. 
            Anyone with this key can access your account.
          </div>

          <div class="recovery-actions">
            <button class="recovery-download" onclick="window.recoveryKeyManager.downloadRecoveryKey('${recoveryKey}')">
              📥 Download as File
            </button>
            <button class="recovery-print" onclick="window.print()">
              🖨️ Print
            </button>
          </div>
        </div>

        <div class="recovery-footer">
          <label>
            <input type="checkbox" id="recovery-confirm" />
            I have securely saved my recovery key
          </label>
          <button class="recovery-done" disabled onclick="this.closest('.recovery-modal-overlay').remove()">
            Done
          </button>
        </div>
      </div>
    `;

    // Enable done button only after confirmation
    const checkbox = modal.querySelector('#recovery-confirm');
    const doneBtn = modal.querySelector('.recovery-done');
    checkbox.addEventListener('change', () => {
      doneBtn.disabled = !checkbox.checked;
    });

    document.body.appendChild(modal);
    return modal;
  }

  /**
   * Download recovery key as encrypted text file
   * @param {string} recoveryKey - Recovery key to download
   */
  downloadRecoveryKey(recoveryKey) {
    const content = `
═══════════════════════════════════════
  100 Days Web Dev - Recovery Key
═══════════════════════════════════════

Recovery Key:
${recoveryKey}

Generated: ${new Date().toISOString()}

⚠️ SECURITY WARNING ⚠️
- Keep this file in a secure offline location
- Do not share this key with anyone
- Do not store in cloud services
- Use this key only if you lose your biometric device

═══════════════════════════════════════
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recovery-key-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Show recovery key input modal for account recovery
   * @returns {Promise<string|null>} User-entered recovery key or null if cancelled
   */
  async showRecoveryKeyInputModal() {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'recovery-modal-overlay';
      modal.innerHTML = `
        <div class="recovery-modal recovery-input-modal">
          <button class="recovery-close" onclick="this.closest('.recovery-modal-overlay').remove()">×</button>
          
          <div class="recovery-header">
            <h2>🔓 Account Recovery</h2>
            <p>Enter your recovery key to regain access</p>
          </div>

          <div class="recovery-body">
            <div class="recovery-input-group">
              <label>Recovery Key</label>
              <input 
                type="text" 
                id="recovery-key-input-field" 
                placeholder="Paste your recovery key here..."
                autocomplete="off"
                spellcheck="false"
              />
            </div>

            <p class="recovery-hint">
              💡 Your recovery key is a long string of letters and numbers you saved when setting up biometric login
            </p>

            <div class="recovery-error" id="recovery-error" style="display: none;"></div>
          </div>

          <div class="recovery-footer">
            <button class="recovery-cancel" onclick="this.closest('.recovery-modal-overlay').remove()">
              Cancel
            </button>
            <button class="recovery-verify" id="recovery-verify-btn">
              Verify Key
            </button>
          </div>
        </div>
      `;

      const input = modal.querySelector('#recovery-key-input-field');
      const verifyBtn = modal.querySelector('#recovery-verify-btn');
      const errorEl = modal.querySelector('#recovery-error');

      verifyBtn.addEventListener('click', () => {
        const key = input.value.trim().toUpperCase();
        if (key.length === 0) {
          errorEl.textContent = 'Please enter your recovery key';
          errorEl.style.display = 'block';
          return;
        }
        
        modal.remove();
        resolve(key);
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('recovery-close') || e.target.classList.contains('recovery-cancel')) {
          modal.remove();
          resolve(null);
        }
      });

      document.body.appendChild(modal);
    });
  }
}

// Export singleton instance
export const recoveryKeyManager = new RecoveryKeyManager();

// Make available globally for inline event handlers
window.recoveryKeyManager = recoveryKeyManager;
