/**
 * LocalStorage Wrapper
 * Handles data persistence with error handling and validation
 */

const STORAGE_KEY = 'kb_board_state_v1';

export const Storage = {
    /**
     * Save state to localStorage
     * @param {Object} state - The application state
     */
    save(state) {
        try {
            const serialized = JSON.stringify(state);
            localStorage.setItem(STORAGE_KEY, serialized);
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    },

    /**
     * Load state from localStorage
     * @returns {Object|null} The saved state or null
     */
    load() {
        try {
            const serialized = localStorage.getItem(STORAGE_KEY);
            if (!serialized) return null;
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return null;
        }
    },

    /**
     * Clear saved state
     */
    clear() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Failed to clear storage:', error);
            return false;
        }
    }
};
