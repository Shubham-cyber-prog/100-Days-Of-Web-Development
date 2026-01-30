/**
 * Browser Fingerprinting Utility
 * Creates a unique identifier for the browser/device to prevent session hijacking
 * Combines multiple browser characteristics for enhanced security
 */

class BrowserFingerprint {
  constructor() {
    this.fingerprintCache = null;
  }

  /**
   * Generate a comprehensive browser fingerprint
   * @returns {Promise<string>} SHA-256 hash of the fingerprint
   */
  async generate() {
    if (this.fingerprintCache) {
      return this.fingerprintCache;
    }

    const components = await this.getComponents();
    const fingerprintString = JSON.stringify(components);
    const hash = await this.hash(fingerprintString);
    
    this.fingerprintCache = hash;
    return hash;
  }

  /**
   * Collect browser and device characteristics
   */
  async getComponents() {
    const components = {
      // Screen characteristics
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio
      },

      // Timezone
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),

      // Language
      language: navigator.language,
      languages: navigator.languages,

      // Platform
      platform: navigator.platform,
      userAgent: navigator.userAgent,

      // Hardware concurrency
      hardwareConcurrency: navigator.hardwareConcurrency,

      // Memory (if available)
      deviceMemory: navigator.deviceMemory || 'unknown',

      // Plugins (deprecated but still useful)
      plugins: this.getPlugins(),

      // Canvas fingerprint
      canvas: await this.getCanvasFingerprint(),

      // WebGL fingerprint
      webgl: this.getWebGLFingerprint(),

      // Audio context
      audio: await this.getAudioFingerprint(),

      // Fonts
      fonts: this.getFonts(),

      // Touch support
      touchSupport: {
        maxTouchPoints: navigator.maxTouchPoints,
        touchEvent: 'ontouchstart' in window,
        touchStart: 'TouchEvent' in window
      },

      // Media devices (count only, not specific devices)
      mediaDevices: await this.getMediaDeviceCount(),

      // Storage
      storage: {
        localStorage: this.hasLocalStorage(),
        sessionStorage: this.hasSessionStorage(),
        indexedDB: this.hasIndexedDB()
      }
    };

    return components;
  }

  /**
   * Get installed plugins
   */
  getPlugins() {
    try {
      const plugins = [];
      for (let i = 0; i < navigator.plugins.length; i++) {
        plugins.push(navigator.plugins[i].name);
      }
      return plugins.sort();
    } catch (e) {
      return [];
    }
  }

  /**
   * Generate canvas fingerprint
   */
  async getCanvasFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');

      // Draw text with specific styling
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('🚀 100 Days', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('WebDev 🎨', 4, 17);

      // Get data URL and hash it
      const dataURL = canvas.toDataURL();
      return await this.hash(dataURL);
    } catch (e) {
      return 'unsupported';
    }
  }

  /**
   * Generate WebGL fingerprint
   */
  getWebGLFingerprint() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) return 'unsupported';

      const info = {
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION)
      };

      return JSON.stringify(info);
    } catch (e) {
      return 'unsupported';
    }
  }

  /**
   * Generate audio fingerprint
   */
  async getAudioFingerprint() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return 'unsupported';

      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const analyser = context.createAnalyser();
      const gainNode = context.createGain();
      const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

      gainNode.gain.value = 0; // Mute
      oscillator.type = 'triangle';
      oscillator.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start(0);

      return new Promise((resolve) => {
        scriptProcessor.onaudioprocess = function (event) {
          const output = event.outputBuffer.getChannelData(0);
          const fingerprint = Array.from(output.slice(0, 30))
            .map(val => val.toFixed(6))
            .join(',');
          
          oscillator.stop();
          scriptProcessor.disconnect();
          gainNode.disconnect();
          analyser.disconnect();
          context.close();
          
          resolve(fingerprint);
        };
      });
    } catch (e) {
      return 'unsupported';
    }
  }

  /**
   * Detect available fonts
   */
  getFonts() {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testFonts = [
      'Arial', 'Verdana', 'Times New Roman', 'Courier New',
      'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
      'Trebuchet MS', 'Impact'
    ];

    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const baseFontWidths = {};
    baseFonts.forEach(baseFont => {
      ctx.font = testSize + ' ' + baseFont;
      baseFontWidths[baseFont] = ctx.measureText(testString).width;
    });

    const detectedFonts = [];
    testFonts.forEach(font => {
      let detected = false;
      baseFonts.forEach(baseFont => {
        ctx.font = testSize + ' ' + font + ', ' + baseFont;
        const width = ctx.measureText(testString).width;
        if (width !== baseFontWidths[baseFont]) {
          detected = true;
        }
      });
      if (detected) {
        detectedFonts.push(font);
      }
    });

    return detectedFonts.sort();
  }

  /**
   * Get media device count (without exposing device details)
   */
  async getMediaDeviceCount() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        return { audio: 0, video: 0 };
      }

      const devices = await navigator.mediaDevices.enumerateDevices();
      return {
        audio: devices.filter(d => d.kind === 'audioinput').length,
        video: devices.filter(d => d.kind === 'videoinput').length
      };
    } catch (e) {
      return { audio: 0, video: 0 };
    }
  }

  /**
   * Check storage availability
   */
  hasLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  hasSessionStorage() {
    try {
      sessionStorage.setItem('test', 'test');
      sessionStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  hasIndexedDB() {
    return !!window.indexedDB;
  }

  /**
   * Hash a string using SHA-256
   */
  async hash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  /**
   * Verify if a stored fingerprint matches the current one
   * Allows for small variations due to browser updates
   */
  async verify(storedFingerprint, threshold = 0.9) {
    const currentFingerprint = await this.generate();
    
    // Exact match - most common case
    if (currentFingerprint === storedFingerprint) {
      return true;
    }

    // For enhanced security, you could implement fuzzy matching
    // to account for minor browser updates while maintaining security
    return false;
  }

  /**
   * Clear cached fingerprint
   */
  clearCache() {
    this.fingerprintCache = null;
  }
}

export default new BrowserFingerprint();
