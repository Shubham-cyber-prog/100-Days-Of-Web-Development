/**
 * Browser Fingerprinting Utility
 * Generates unique device fingerprints for session validation
 * @module browserFingerprint
 */

class BrowserFingerprint {
    constructor() {
        this.components = {};
    }

    /**
     * Generates a comprehensive browser fingerprint
     */
    async generate() {
        const components = {
            // Basic browser info
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages?.join(',') || '',
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency || 0,
            deviceMemory: navigator.deviceMemory || 0,
            maxTouchPoints: navigator.maxTouchPoints || 0,
            
            // Screen info
            screenResolution: `${screen.width}x${screen.height}`,
            screenColorDepth: screen.colorDepth,
            screenPixelDepth: screen.pixelDepth,
            availableScreenResolution: `${screen.availWidth}x${screen.availHeight}`,
            
            // Timezone
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            
            // Canvas fingerprint
            canvas: await this.getCanvasFingerprint(),
            
            // WebGL fingerprint
            webgl: this.getWebGLFingerprint(),
            
            // Audio fingerprint
            audio: await this.getAudioFingerprint(),
            
            // Fonts
            fonts: await this.getFonts(),
            
            // Browser features
            features: this.getBrowserFeatures(),
            
            // Storage info
            storage: await this.getStorageInfo(),
            
            // Connection info
            connection: this.getConnectionInfo()
        };

        this.components = components;
        
        // Generate hash
        const fingerprintHash = await this.hashComponents(components);
        
        return {
            hash: fingerprintHash,
            components,
            timestamp: Date.now()
        };
    }

    /**
     * Canvas fingerprinting
     */
    async getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 200;
            canvas.height = 50;
            
            // Draw complex pattern
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(0, 0, 200, 50);
            ctx.fillStyle = '#069';
            ctx.fillText('Browser Fingerprint 🔒', 2, 2);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('WebAuthn Security', 4, 20);
            
            // Get data URL
            const dataUrl = canvas.toDataURL();
            return this.simpleHash(dataUrl);
            
        } catch (error) {
            return 'canvas_unavailable';
        }
    }

    /**
     * WebGL fingerprinting
     */
    getWebGLFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) {
                return 'webgl_unavailable';
            }

            const data = {
                vendor: gl.getParameter(gl.VENDOR),
                renderer: gl.getParameter(gl.RENDERER),
                version: gl.getParameter(gl.VERSION),
                shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
                maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
                maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS)?.join('x') || '',
                maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
            };

            return this.simpleHash(JSON.stringify(data));
            
        } catch (error) {
            return 'webgl_unavailable';
        }
    }

    /**
     * Audio fingerprinting
     */
    async getAudioFingerprint() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) {
                return 'audio_unavailable';
            }

            const context = new AudioContext();
            const oscillator = context.createOscillator();
            const analyser = context.createAnalyser();
            const gainNode = context.createGain();
            const scriptProcessor = context.createScriptProcessor(4096, 1, 1);

            gainNode.gain.value = 0; // Mute
            oscillator.connect(analyser);
            analyser.connect(scriptProcessor);
            scriptProcessor.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.start(0);

            return new Promise((resolve) => {
                scriptProcessor.onaudioprocess = (event) => {
                    const output = event.outputBuffer.getChannelData(0);
                    const sum = Array.from(output).reduce((a, b) => a + Math.abs(b), 0);
                    oscillator.stop();
                    context.close();
                    resolve(this.simpleHash(sum.toString()));
                };
            });

        } catch (error) {
            return 'audio_unavailable';
        }
    }

    /**
     * Font detection
     */
    async getFonts() {
        const baseFonts = ['monospace', 'sans-serif', 'serif'];
        const testFonts = [
            'Arial', 'Verdana', 'Times New Roman', 'Courier New',
            'Georgia', 'Palatino', 'Garamond', 'Bookman',
            'Comic Sans MS', 'Trebuchet MS', 'Impact'
        ];

        const detectedFonts = [];
        
        for (const font of testFonts) {
            if (this.isFontAvailable(font, baseFonts)) {
                detectedFonts.push(font);
            }
        }

        return detectedFonts.join(',');
    }

    isFontAvailable(font, baseFonts) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const text = 'mmmmmmmmmmlli';
        
        ctx.font = `72px ${baseFonts[0]}`;
        const baseWidth = ctx.measureText(text).width;
        
        ctx.font = `72px ${font}, ${baseFonts[0]}`;
        const testWidth = ctx.measureText(text).width;
        
        return baseWidth !== testWidth;
    }

    /**
     * Browser features detection
     */
    getBrowserFeatures() {
        return {
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            localStorage: this.isStorageAvailable('localStorage'),
            sessionStorage: this.isStorageAvailable('sessionStorage'),
            indexedDB: !!window.indexedDB,
            webWorkers: !!window.Worker,
            serviceWorker: 'serviceWorker' in navigator,
            webRTC: !!(window.RTCPeerConnection || window.webkitRTCPeerConnection),
            webGL: this.hasWebGL(),
            webAssembly: typeof WebAssembly !== 'undefined',
            touchSupport: 'ontouchstart' in window,
            audioContext: !!(window.AudioContext || window.webkitAudioContext),
            geolocation: 'geolocation' in navigator,
            notifications: 'Notification' in window,
            vibration: 'vibrate' in navigator
        };
    }

    /**
     * Storage info
     */
    async getStorageInfo() {
        try {
            if (navigator.storage && navigator.storage.estimate) {
                const estimate = await navigator.storage.estimate();
                return {
                    quota: estimate.quota,
                    usage: estimate.usage,
                    percentage: ((estimate.usage / estimate.quota) * 100).toFixed(2)
                };
            }
        } catch (error) {
            // Ignore
        }
        return { quota: 0, usage: 0, percentage: 0 };
    }

    /**
     * Connection info
     */
    getConnectionInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
        return null;
    }

    // Helper methods
    isStorageAvailable(type) {
        try {
            const storage = window[type];
            const test = '__storage_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    hasWebGL() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    async hashComponents(components) {
        const str = JSON.stringify(components);
        
        // Use SubtleCrypto if available
        if (crypto.subtle) {
            const encoder = new TextEncoder();
            const data = encoder.encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        
        // Fallback to simple hash
        return this.simpleHash(str);
    }

    /**
     * Compares two fingerprints and returns similarity score (0-1)
     */
    compare(fingerprint1, fingerprint2) {
        if (!fingerprint1 || !fingerprint2) {
            return 0;
        }

        // Direct hash comparison
        if (fingerprint1.hash === fingerprint2.hash) {
            return 1;
        }

        // Compare components
        const components1 = fingerprint1.components || {};
        const components2 = fingerprint2.components || {};

        let matches = 0;
        let total = 0;

        const keys = new Set([
            ...Object.keys(components1),
            ...Object.keys(components2)
        ]);

        for (const key of keys) {
            if (typeof components1[key] === 'object' && typeof components2[key] === 'object') {
                const subScore = this.compareObjects(components1[key], components2[key]);
                matches += subScore;
            } else if (components1[key] === components2[key]) {
                matches++;
            }
            total++;
        }

        return matches / total;
    }

    compareObjects(obj1, obj2) {
        const keys1 = Object.keys(obj1 || {});
        const keys2 = Object.keys(obj2 || {});
        const allKeys = new Set([...keys1, ...keys2]);

        let matches = 0;
        for (const key of allKeys) {
            if (obj1[key] === obj2[key]) {
                matches++;
            }
        }

        return matches / allKeys.size;
    }
}

export const browserFingerprint = new BrowserFingerprint();
