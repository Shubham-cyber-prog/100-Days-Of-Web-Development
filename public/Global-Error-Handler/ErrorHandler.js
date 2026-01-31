/**
 * Global Error Handler
 * Provides centralized error handling for web applications
 * Handles API failures, network issues, and JavaScript exceptions
 */

class ErrorHandler {
    constructor(options = {}) {
        this.options = {
            enableLogging: options.enableLogging !== false,
            logEndpoint: options.logEndpoint || null,
            redirectToErrorPage: options.redirectToErrorPage !== false,
            errorPageUrl: options.errorPageUrl || '../Global-Error-Handler/error.html',
            ...options
        };

        this.errorHistory = [];
        this.maxHistorySize = 50;
        this.isOnline = navigator.onLine;

        this.init();
    }

    /**
     * Initialize error handler and event listeners
     */
    init() {
        // Handle uncaught JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'RUNTIME_ERROR',
                message: event.message,
                source: event.filename,
                line: event.lineno,
                column: event.colno,
                error: event.error,
                timestamp: new Date().toISOString()
            });
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'PROMISE_REJECTION',
                message: event.reason?.message || event.reason,
                error: event.reason,
                timestamp: new Date().toISOString()
            });
        });

        // Monitor network connectivity
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showToast('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.handleError({
                type: 'NETWORK_ERROR',
                message: 'No internet connection',
                timestamp: new Date().toISOString()
            });
        });

        // Intercept fetch API for automatic error handling
        this.interceptFetch();
    }

    /**
     * Intercept fetch requests to handle API errors automatically
     */
    interceptFetch() {
        const originalFetch = window.fetch;
        const self = this;

        window.fetch = async function(...args) {
            try {
                // Check if offline before making request
                if (!navigator.onLine) {
                    throw new Error('No internet connection');
                }

                const response = await originalFetch.apply(this, args);

                // Handle HTTP errors
                if (!response.ok) {
                    const error = {
                        type: 'API_ERROR',
                        status: response.status,
                        statusText: response.statusText,
                        url: args[0],
                        timestamp: new Date().toISOString()
                    };

                    // Try to get error message from response
                    try {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const data = await response.clone().json();
                            error.message = data.message || data.error || response.statusText;
                        } else {
                            error.message = await response.clone().text() || response.statusText;
                        }
                    } catch (e) {
                        error.message = response.statusText;
                    }

                    self.handleError(error, false);
                }

                return response;
            } catch (error) {
                // Handle network errors
                self.handleError({
                    type: 'NETWORK_ERROR',
                    message: error.message,
                    url: args[0],
                    error: error,
                    timestamp: new Date().toISOString()
                });
                throw error;
            }
        };
    }

    /**
     * Main error handling method
     */
    handleError(error, redirect = true) {
        // Add to error history
        this.addToHistory(error);

        // Log error
        if (this.options.enableLogging) {
            this.logError(error);
        }

        // Store error details for error page
        this.storeErrorDetails(error);

        // Redirect to error page if configured
        if (redirect && this.options.redirectToErrorPage) {
            this.redirectToErrorPage();
        }

        // Emit custom event for app-level handling
        window.dispatchEvent(new CustomEvent('globalError', { detail: error }));
    }

    /**
     * Handle API errors with automatic retry
     */
    async handleAPIError(url, options = {}, retryCount = 0) {
        const maxRetries = options.maxRetries || 3;
        const retryDelay = options.retryDelay || 1000;

        try {
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
        } catch (error) {
            if (retryCount < maxRetries) {
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)));
                return this.handleAPIError(url, options, retryCount + 1);
            }

            // Max retries reached
            this.handleError({
                type: 'API_ERROR',
                message: `Failed after ${maxRetries} retries: ${error.message}`,
                url: url,
                error: error,
                timestamp: new Date().toISOString()
            });

            throw error;
        }
    }

    /**
     * Store error details in sessionStorage for error page
     */
    storeErrorDetails(error) {
        try {
            const errorData = {
                ...error,
                userAgent: navigator.userAgent,
                url: window.location.href,
                isOnline: this.isOnline
            };
            sessionStorage.setItem('lastError', JSON.stringify(errorData));
        } catch (e) {
            console.error('Failed to store error details:', e);
        }
    }

    /**
     * Add error to history
     */
    addToHistory(error) {
        this.errorHistory.unshift(error);
        if (this.errorHistory.length > this.maxHistorySize) {
            this.errorHistory.pop();
        }
    }

    /**
     * Log error to console and optionally to server
     */
    logError(error) {
        // Console logging
        console.group(`🔴 ${error.type || 'ERROR'}`);
        console.error('Message:', error.message);
        console.error('Time:', error.timestamp);
        if (error.url) console.error('URL:', error.url);
        if (error.status) console.error('Status:', error.status);
        if (error.source) console.error('Source:', `${error.source}:${error.line}:${error.column}`);
        if (error.error) console.error('Stack:', error.error.stack);
        console.groupEnd();

        // Send to logging endpoint if configured
        if (this.options.logEndpoint) {
            this.sendErrorLog(error);
        }
    }

    /**
     * Send error log to server
     */
    async sendErrorLog(error) {
        try {
            await fetch(this.options.logEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...error,
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (e) {
            console.error('Failed to send error log:', e);
        }
    }

    /**
     * Redirect to error page
     */
    redirectToErrorPage() {
        const currentPath = window.location.pathname;
        const errorPagePath = this.options.errorPageUrl;
        
        // Avoid infinite redirect loop
        if (!currentPath.includes('error.html')) {
            window.location.href = errorPagePath;
        }
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'error') {
        // Check if toast container exists, create if not
        let toastContainer = document.getElementById('error-toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'error-toast-container';
            toastContainer.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 999999;
            `;
            document.body.appendChild(toastContainer);
        }

        const toast = document.createElement('div');
        toast.className = `error-toast error-toast-${type}`;
        toast.style.cssText = `
            background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            margin-bottom: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
            max-width: 350px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;
        toast.textContent = message;

        toastContainer.appendChild(toast);

        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        if (!document.getElementById('toast-animations')) {
            style.id = 'toast-animations';
            document.head.appendChild(style);
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    /**
     * Get error history
     */
    getErrorHistory() {
        return this.errorHistory;
    }

    /**
     * Clear error history
     */
    clearErrorHistory() {
        this.errorHistory = [];
    }

    /**
     * Check if online
     */
    checkOnlineStatus() {
        return this.isOnline;
    }

    /**
     * Create error boundary for React-like component wrapping
     */
    createErrorBoundary(element, fallbackContent) {
        try {
            return element;
        } catch (error) {
            this.handleError({
                type: 'COMPONENT_ERROR',
                message: error.message,
                error: error,
                timestamp: new Date().toISOString()
            });
            return fallbackContent;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorHandler;
}

// Make available globally
window.ErrorHandler = ErrorHandler;
