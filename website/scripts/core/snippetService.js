/**
 * Snippet Service
 * Personal code snippet library management with tagging and syntax highlighting
 */

import { db, auth } from './firebase.js';
import { 
    collection, 
    doc, 
    setDoc, 
    getDoc, 
    getDocs, 
    deleteDoc, 
    query, 
    where, 
    orderBy,
    serverTimestamp 
} from 'firebase/firestore';

class SnippetService {
    constructor() {
        this.STORAGE_KEY = 'code_snippets';
        this.listeners = new Map();
        
        // Predefined categories
        this.categories = [
            { id: 'css-tricks', name: 'CSS Tricks', icon: '🎨' },
            { id: 'js-utilities', name: 'JS Utilities', icon: '⚡' },
            { id: 'html-patterns', name: 'HTML Patterns', icon: '📄' },
            { id: 'api-examples', name: 'API Examples', icon: '🔌' },
            { id: 'algorithms', name: 'Algorithms', icon: '🧮' },
            { id: 'regex', name: 'Regex Patterns', icon: '🔍' },
            { id: 'responsive', name: 'Responsive Design', icon: '📱' },
            { id: 'animations', name: 'Animations', icon: '✨' },
            { id: 'debugging', name: 'Debugging', icon: '🐛' },
            { id: 'other', name: 'Other', icon: '📁' }
        ];
        
        // Supported languages
        this.languages = [
            'javascript', 'typescript', 'html', 'css', 'scss', 
            'python', 'json', 'markdown', 'bash', 'sql', 'jsx', 'tsx'
        ];
    }
    
    /**
     * Get all snippets
     * @returns {Promise<Array>} Array of snippets
     */
    async getAllSnippets() {
        const user = auth.currentUser;
        
        if (user) {
            try {
                const snippetsRef = collection(db, 'users', user.uid, 'snippets');
                const q = query(snippetsRef, orderBy('updatedAt', 'desc'));
                const snapshot = await getDocs(q);
                
                const snippets = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                // Sync to localStorage
                this.saveToLocalStorage(snippets);
                
                return snippets;
            } catch (error) {
                console.error('Error fetching snippets from Firestore:', error);
                return this.getFromLocalStorage();
            }
        }
        
        return this.getFromLocalStorage();
    }
    
    /**
     * Get snippet by ID
     * @param {string} snippetId - Snippet ID
     * @returns {Promise<Object|null>} Snippet object or null
     */
    async getSnippetById(snippetId) {
        const user = auth.currentUser;
        
        if (user) {
            try {
                const snippetRef = doc(db, 'users', user.uid, 'snippets', snippetId);
                const snippetDoc = await getDoc(snippetRef);
                
                if (snippetDoc.exists()) {
                    return { id: snippetDoc.id, ...snippetDoc.data() };
                }
            } catch (error) {
                console.error('Error fetching snippet:', error);
            }
        }
        
        // Fallback to localStorage
        const snippets = this.getFromLocalStorage();
        return snippets.find(s => s.id === snippetId) || null;
    }
    
    /**
     * Create a new snippet
     * @param {Object} snippetData - Snippet data
     * @returns {Promise<Object>} Created snippet
     */
    async createSnippet(snippetData) {
        const snippet = {
            id: this.generateId(),
            title: snippetData.title || 'Untitled Snippet',
            description: snippetData.description || '',
            code: snippetData.code || '',
            language: snippetData.language || 'javascript',
            category: snippetData.category || 'other',
            tags: snippetData.tags || [],
            isFavorite: snippetData.isFavorite || false,
            usageCount: 0,
            dayId: snippetData.dayId || null,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        const user = auth.currentUser;
        
        if (user) {
            try {
                const snippetRef = doc(db, 'users', user.uid, 'snippets', snippet.id);
                await setDoc(snippetRef, {
                    ...snippet,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            } catch (error) {
                console.error('Error creating snippet in Firestore:', error);
            }
        }
        
        // Save to localStorage
        const snippets = this.getFromLocalStorage();
        snippets.unshift(snippet);
        this.saveToLocalStorage(snippets);
        
        this.notifyListeners('create', snippet);
        
        return snippet;
    }
    
    /**
     * Update a snippet
     * @param {string} snippetId - Snippet ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated snippet
     */
    async updateSnippet(snippetId, updates) {
        const snippets = this.getFromLocalStorage();
        const index = snippets.findIndex(s => s.id === snippetId);
        
        if (index === -1) {
            throw new Error('Snippet not found');
        }
        
        const updatedSnippet = {
            ...snippets[index],
            ...updates,
            updatedAt: Date.now()
        };
        
        snippets[index] = updatedSnippet;
        this.saveToLocalStorage(snippets);
        
        const user = auth.currentUser;
        
        if (user) {
            try {
                const snippetRef = doc(db, 'users', user.uid, 'snippets', snippetId);
                await setDoc(snippetRef, {
                    ...updatedSnippet,
                    updatedAt: serverTimestamp()
                }, { merge: true });
            } catch (error) {
                console.error('Error updating snippet in Firestore:', error);
            }
        }
        
        this.notifyListeners('update', updatedSnippet);
        
        return updatedSnippet;
    }
    
    /**
     * Delete a snippet
     * @param {string} snippetId - Snippet ID
     * @returns {Promise<void>}
     */
    async deleteSnippet(snippetId) {
        const snippets = this.getFromLocalStorage();
        const filtered = snippets.filter(s => s.id !== snippetId);
        this.saveToLocalStorage(filtered);
        
        const user = auth.currentUser;
        
        if (user) {
            try {
                const snippetRef = doc(db, 'users', user.uid, 'snippets', snippetId);
                await deleteDoc(snippetRef);
            } catch (error) {
                console.error('Error deleting snippet from Firestore:', error);
            }
        }
        
        this.notifyListeners('delete', { snippetId });
    }
    
    /**
     * Toggle favorite status
     * @param {string} snippetId - Snippet ID
     * @returns {Promise<Object>} Updated snippet
     */
    async toggleFavorite(snippetId) {
        const snippet = await this.getSnippetById(snippetId);
        if (snippet) {
            return this.updateSnippet(snippetId, { isFavorite: !snippet.isFavorite });
        }
    }
    
    /**
     * Increment usage count (when copied)
     * @param {string} snippetId - Snippet ID
     * @returns {Promise<Object>} Updated snippet
     */
    async incrementUsage(snippetId) {
        const snippet = await this.getSnippetById(snippetId);
        if (snippet) {
            return this.updateSnippet(snippetId, { usageCount: (snippet.usageCount || 0) + 1 });
        }
    }
    
    /**
     * Get snippets by category
     * @param {string} categoryId - Category ID
     * @returns {Promise<Array>} Snippets in the category
     */
    async getSnippetsByCategory(categoryId) {
        const allSnippets = await this.getAllSnippets();
        return allSnippets.filter(s => s.category === categoryId);
    }
    
    /**
     * Get snippets by language
     * @param {string} language - Programming language
     * @returns {Promise<Array>} Snippets in the language
     */
    async getSnippetsByLanguage(language) {
        const allSnippets = await this.getAllSnippets();
        return allSnippets.filter(s => s.language === language);
    }
    
    /**
     * Get snippets by tag
     * @param {string} tag - Tag to filter by
     * @returns {Promise<Array>} Snippets with the tag
     */
    async getSnippetsByTag(tag) {
        const allSnippets = await this.getAllSnippets();
        return allSnippets.filter(s => s.tags.includes(tag));
    }
    
    /**
     * Get favorite snippets
     * @returns {Promise<Array>} Favorite snippets
     */
    async getFavorites() {
        const allSnippets = await this.getAllSnippets();
        return allSnippets.filter(s => s.isFavorite);
    }
    
    /**
     * Get most used snippets
     * @param {number} limit - Maximum number to return
     * @returns {Promise<Array>} Most used snippets
     */
    async getMostUsed(limit = 10) {
        const allSnippets = await this.getAllSnippets();
        return allSnippets
            .filter(s => s.usageCount > 0)
            .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
            .slice(0, limit);
    }
    
    /**
     * Search snippets
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching snippets
     */
    async searchSnippets(query) {
        if (!query || query.trim().length === 0) {
            return this.getAllSnippets();
        }
        
        const allSnippets = await this.getAllSnippets();
        const lowerQuery = query.toLowerCase();
        
        return allSnippets.filter(snippet => {
            const titleMatch = snippet.title.toLowerCase().includes(lowerQuery);
            const descMatch = snippet.description.toLowerCase().includes(lowerQuery);
            const codeMatch = snippet.code.toLowerCase().includes(lowerQuery);
            const tagMatch = snippet.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
            
            return titleMatch || descMatch || codeMatch || tagMatch;
        });
    }
    
    /**
     * Get all unique tags from snippets
     * @returns {Promise<Array>} Array of unique tags
     */
    async getAllTags() {
        const allSnippets = await this.getAllSnippets();
        const tags = new Set();
        
        allSnippets.forEach(snippet => {
            snippet.tags.forEach(tag => tags.add(tag));
        });
        
        return Array.from(tags).sort();
    }
    
    /**
     * Get statistics
     * @returns {Promise<Object>} Snippet statistics
     */
    async getStatistics() {
        const snippets = await this.getAllSnippets();
        
        const byCategory = {};
        const byLanguage = {};
        
        snippets.forEach(snippet => {
            byCategory[snippet.category] = (byCategory[snippet.category] || 0) + 1;
            byLanguage[snippet.language] = (byLanguage[snippet.language] || 0) + 1;
        });
        
        return {
            total: snippets.length,
            favorites: snippets.filter(s => s.isFavorite).length,
            totalUsage: snippets.reduce((sum, s) => sum + (s.usageCount || 0), 0),
            byCategory,
            byLanguage
        };
    }
    
    /**
     * Export snippets as JSON
     * @returns {Promise<string>} JSON string
     */
    async exportSnippets() {
        const snippets = await this.getAllSnippets();
        return JSON.stringify({
            exportedAt: new Date().toISOString(),
            version: '1.0',
            snippets
        }, null, 2);
    }
    
    /**
     * Import snippets from JSON
     * @param {string} jsonString - JSON string to import
     * @returns {Promise<Object>} Import result
     */
    async importSnippets(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (!data.snippets || !Array.isArray(data.snippets)) {
                throw new Error('Invalid import format');
            }
            
            let imported = 0;
            
            for (const snippet of data.snippets) {
                const newSnippet = {
                    ...snippet,
                    id: this.generateId(),
                    importedAt: Date.now()
                };
                
                await this.createSnippet(newSnippet);
                imported++;
            }
            
            return { imported, total: data.snippets.length };
        } catch (error) {
            console.error('Import error:', error);
            throw new Error('Failed to import snippets: ' + error.message);
        }
    }
    
    /**
     * Quick-add snippet from code viewer
     * @param {string} code - Code to save
     * @param {string} language - Programming language
     * @param {string} dayId - Optional day ID
     * @returns {Promise<Object>} Created snippet
     */
    async quickAdd(code, language = 'javascript', dayId = null) {
        // Try to detect a title from the code
        let title = 'Quick Snippet';
        
        // Look for function name
        const funcMatch = code.match(/function\s+(\w+)/);
        if (funcMatch) {
            title = funcMatch[1];
        }
        
        // Look for class name
        const classMatch = code.match(/class\s+(\w+)/);
        if (classMatch) {
            title = classMatch[1];
        }
        
        // Look for const/let/var declaration
        const varMatch = code.match(/(const|let|var)\s+(\w+)/);
        if (varMatch) {
            title = varMatch[2];
        }
        
        return this.createSnippet({
            title,
            code,
            language,
            dayId,
            category: this.detectCategory(code, language)
        });
    }
    
    /**
     * Detect category from code content
     * @param {string} code - Code content
     * @param {string} language - Programming language
     * @returns {string} Detected category ID
     */
    detectCategory(code, language) {
        const lowerCode = code.toLowerCase();
        
        if (language === 'css' || language === 'scss') {
            if (lowerCode.includes('animation') || lowerCode.includes('@keyframes')) {
                return 'animations';
            }
            if (lowerCode.includes('@media')) {
                return 'responsive';
            }
            return 'css-tricks';
        }
        
        if (language === 'html') {
            return 'html-patterns';
        }
        
        if (lowerCode.includes('fetch') || lowerCode.includes('axios') || lowerCode.includes('xhr')) {
            return 'api-examples';
        }
        
        if (lowerCode.includes('regex') || lowerCode.includes('regexp') || /\/.*\/[gimsuvy]*/.test(code)) {
            return 'regex';
        }
        
        if (lowerCode.includes('sort') || lowerCode.includes('search') || lowerCode.includes('algorithm')) {
            return 'algorithms';
        }
        
        if (lowerCode.includes('debug') || lowerCode.includes('console.')) {
            return 'debugging';
        }
        
        if (language === 'javascript' || language === 'typescript') {
            return 'js-utilities';
        }
        
        return 'other';
    }
    
    /**
     * Copy code to clipboard
     * @param {string} snippetId - Snippet ID
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard(snippetId) {
        const snippet = await this.getSnippetById(snippetId);
        
        if (!snippet) {
            return false;
        }
        
        try {
            await navigator.clipboard.writeText(snippet.code);
            await this.incrementUsage(snippetId);
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            return false;
        }
    }
    
    /**
     * Get available categories
     * @returns {Array} List of categories
     */
    getCategories() {
        return this.categories;
    }
    
    /**
     * Get available languages
     * @returns {Array} List of languages
     */
    getLanguages() {
        return this.languages;
    }
    
    /**
     * Get snippets from localStorage
     * @returns {Array} Snippets array
     */
    getFromLocalStorage() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }
    
    /**
     * Save snippets to localStorage
     * @param {Array} snippets - Snippets to save
     */
    saveToLocalStorage(snippets) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(snippets));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    
    /**
     * Generate unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return 'snippet_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * Subscribe to changes
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    subscribe(callback) {
        const id = Symbol();
        this.listeners.set(id, callback);
        
        return () => {
            this.listeners.delete(id);
        };
    }
    
    /**
     * Notify all listeners
     * @param {string} event - Event type
     * @param {Object} data - Event data
     */
    notifyListeners(event, data) {
        this.listeners.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }
}

// Export singleton instance
const snippetService = new SnippetService();
export { snippetService, SnippetService };
export default snippetService;
