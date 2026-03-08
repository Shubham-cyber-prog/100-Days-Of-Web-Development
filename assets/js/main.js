/**
 * Global Error Handler - main.js
 * 
 * Catches unhandled JavaScript errors and Promise rejections,
 * displays user-friendly toast notifications, and logs details
 * to the console for debugging.
 */

(function () {
    'use strict';

    // Toast container element (created lazily)
    let toastContainer = null;

    /**
     * Creates or returns the toast container element
     */
    function getToastContainer() {
        if (toastContainer && document.body.contains(toastContainer)) {
            return toastContainer;
        }

        toastContainer = document.createElement('div');
        toastContainer.id = 'error-toast-container';
        toastContainer.setAttribute('role', 'alert');
        toastContainer.setAttribute('aria-live', 'polite');

        // Inject styles
        const styles = document.createElement('style');
        styles.textContent = `
      #error-toast-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
        pointer-events: none;
      }

      .error-toast {
        background: linear-gradient(135deg, rgba(231, 29, 54, 0.95) 0%, rgba(180, 20, 40, 0.95) 100%);
        color: #fff;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(231, 29, 54, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.15);
        display: flex;
        align-items: flex-start;
        gap: 12px;
        pointer-events: auto;
        animation: toastSlideIn 0.3s ease-out;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      .error-toast.toast-out {
        animation: toastSlideOut 0.3s ease-in forwards;
      }

      @keyframes toastSlideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes toastSlideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      .error-toast-icon {
        font-size: 1.5rem;
        line-height: 1;
        flex-shrink: 0;
      }

      .error-toast-content {
        flex: 1;
        min-width: 0;
      }

      .error-toast-title {
        font-weight: 600;
        font-size: 0.95rem;
        margin-bottom: 4px;
      }

      .error-toast-message {
        font-size: 0.85rem;
        opacity: 0.9;
        word-break: break-word;
      }

      .error-toast-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: #fff;
        width: 24px;
        height: 24px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.2s ease;
      }

      .error-toast-close:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      @media (max-width: 480px) {
        #error-toast-container {
          left: 16px;
          right: 16px;
          bottom: 16px;
          max-width: none;
        }
      }
    `;

        document.head.appendChild(styles);
        document.body.appendChild(toastContainer);

        return toastContainer;
    }

    /**
     * Shows an error toast notification
     * @param {string} title - Toast title
     * @param {string} message - Error message to display
     */
    function showErrorToast(title, message) {
        const container = getToastContainer();

        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.innerHTML = `
      <span class="error-toast-icon">⚠️</span>
      <div class="error-toast-content">
        <div class="error-toast-title">${escapeHtml(title)}</div>
        <div class="error-toast-message">${escapeHtml(message)}</div>
      </div>
      <button class="error-toast-close" aria-label="Dismiss">×</button>
    `;

        // Close button handler
        const closeBtn = toast.querySelector('.error-toast-close');
        closeBtn.addEventListener('click', function () {
            dismissToast(toast);
        });

        container.appendChild(toast);

        // Auto-dismiss after 5 seconds
        setTimeout(function () {
            dismissToast(toast);
        }, 5000);
    }

    /**
     * Dismisses a toast with animation
     * @param {HTMLElement} toast - Toast element to dismiss
     */
    function dismissToast(toast) {
        if (!toast || !toast.parentNode) return;

        toast.classList.add('toast-out');
        setTimeout(function () {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    /**
     * Escapes HTML to prevent XSS
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Truncates error message for display
     * @param {string} message - Error message
     * @param {number} maxLength - Maximum length
     * @returns {string} Truncated message
     */
    function truncateMessage(message, maxLength) {
        if (!message) return 'An unknown error occurred';
        if (message.length <= maxLength) return message;
        return message.substring(0, maxLength) + '...';
    }

    // Global error handler for synchronous errors
    window.addEventListener('error', function (event) {
        const errorMessage = event.message || 'An unexpected error occurred';
        const fileName = event.filename ? event.filename.split('/').pop() : 'Unknown';
        const lineNumber = event.lineno || '?';

        // Log detailed error to console
        console.error('[Global Error Handler]', {
            message: errorMessage,
            file: event.filename,
            line: event.lineno,
            column: event.colno,
            error: event.error,
            stack: event.error?.stack
        });

        // Show user-friendly toast
        showErrorToast(
            'Something went wrong',
            truncateMessage(errorMessage, 100)
        );
    });

    // Handler for unhandled Promise rejections
    window.addEventListener('unhandledrejection', function (event) {
        const reason = event.reason;
        let errorMessage = 'An async operation failed';

        if (reason instanceof Error) {
            errorMessage = reason.message;
        } else if (typeof reason === 'string') {
            errorMessage = reason;
        }

        // Log detailed error to console
        console.error('[Unhandled Promise Rejection]', {
            reason: reason,
            stack: reason?.stack
        });

        // Show user-friendly toast
        showErrorToast(
            'Async Error',
            truncateMessage(errorMessage, 100)
        );
    });

    // Log initialization
    console.log('[Global Error Handler] Initialized');

})();
