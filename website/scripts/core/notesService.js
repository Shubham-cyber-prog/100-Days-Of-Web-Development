/**
 * Notes Service
 * CRUD operations for project notes with localStorage and Firestore sync
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

class NotesService {
    constructor() {
        this.STORAGE_KEY = 'project_notes';
        this.SYNC_KEY = 'notes_last_sync';
        this.listeners = new Map();
        this.autoSaveTimers = new Map();
        this.autoSaveDelay = 2000; // 2 seconds debounce
    }
    
    /**
     * Get all notes for a user
     * @returns {Promise<Array>} Array of notes
     */
    async getAllNotes() {
        const user = auth.currentUser;
        
        if (user) {
            try {
                const notesRef = collection(db, 'users', user.uid, 'notes');
                const q = query(notesRef, orderBy('updatedAt', 'desc'));
                const snapshot = await getDocs(q);
                
                const notes = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                // Sync to localStorage
                this.saveToLocalStorage(notes);
                
                return notes;
            } catch (error) {
                console.error('Error fetching notes from Firestore:', error);
                return this.getFromLocalStorage();
            }
        }
        
        return this.getFromLocalStorage();
    }
    
    /**
     * Get note by ID
     * @param {string} noteId - Note ID
     * @returns {Promise<Object|null>} Note object or null
     */
    async getNoteById(noteId) {
        const user = auth.currentUser;
        
        if (user) {
            try {
                const noteRef = doc(db, 'users', user.uid, 'notes', noteId);
                const noteDoc = await getDoc(noteRef);
                
                if (noteDoc.exists()) {
                    return { id: noteDoc.id, ...noteDoc.data() };
                }
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        }
        
        // Fallback to localStorage
        const notes = this.getFromLocalStorage();
        return notes.find(n => n.id === noteId) || null;
    }
    
    /**
     * Get notes for a specific project day
     * @param {string} dayId - Day identifier (e.g., "day-01")
     * @returns {Promise<Array>} Notes for the day
     */
    async getNotesByDay(dayId) {
        const allNotes = await this.getAllNotes();
        return allNotes.filter(note => note.dayId === dayId);
    }
    
    /**
     * Create a new note
     * @param {Object} noteData - Note data
     * @returns {Promise<Object>} Created note
     */
    async createNote(noteData) {
        const note = {
            id: this.generateId(),
            title: noteData.title || 'Untitled Note',
            content: noteData.content || '',
            dayId: noteData.dayId || null,
            tags: noteData.tags || [],
            isPinned: noteData.isPinned || false,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        const user = auth.currentUser;
        
        if (user) {
            try {
                const noteRef = doc(db, 'users', user.uid, 'notes', note.id);
                await setDoc(noteRef, {
                    ...note,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
            } catch (error) {
                console.error('Error creating note in Firestore:', error);
            }
        }
        
        // Save to localStorage
        const notes = this.getFromLocalStorage();
        notes.unshift(note);
        this.saveToLocalStorage(notes);
        
        this.notifyListeners('create', note);
        
        return note;
    }
    
    /**
     * Update a note
     * @param {string} noteId - Note ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated note
     */
    async updateNote(noteId, updates) {
        const notes = this.getFromLocalStorage();
        const index = notes.findIndex(n => n.id === noteId);
        
        if (index === -1) {
            throw new Error('Note not found');
        }
        
        const updatedNote = {
            ...notes[index],
            ...updates,
            updatedAt: Date.now()
        };
        
        notes[index] = updatedNote;
        this.saveToLocalStorage(notes);
        
        const user = auth.currentUser;
        
        if (user) {
            try {
                const noteRef = doc(db, 'users', user.uid, 'notes', noteId);
                await setDoc(noteRef, {
                    ...updatedNote,
                    updatedAt: serverTimestamp()
                }, { merge: true });
            } catch (error) {
                console.error('Error updating note in Firestore:', error);
            }
        }
        
        this.notifyListeners('update', updatedNote);
        
        return updatedNote;
    }
    
    /**
     * Auto-save note with debounce
     * @param {string} noteId - Note ID
     * @param {Object} updates - Fields to update
     */
    autoSaveNote(noteId, updates) {
        // Clear existing timer
        if (this.autoSaveTimers.has(noteId)) {
            clearTimeout(this.autoSaveTimers.get(noteId));
        }
        
        // Set new timer
        const timer = setTimeout(async () => {
            await this.updateNote(noteId, updates);
            this.autoSaveTimers.delete(noteId);
            this.notifyListeners('autosave', { noteId });
        }, this.autoSaveDelay);
        
        this.autoSaveTimers.set(noteId, timer);
    }
    
    /**
     * Delete a note
     * @param {string} noteId - Note ID
     * @returns {Promise<void>}
     */
    async deleteNote(noteId) {
        const notes = this.getFromLocalStorage();
        const filtered = notes.filter(n => n.id !== noteId);
        this.saveToLocalStorage(filtered);
        
        const user = auth.currentUser;
        
        if (user) {
            try {
                const noteRef = doc(db, 'users', user.uid, 'notes', noteId);
                await deleteDoc(noteRef);
            } catch (error) {
                console.error('Error deleting note from Firestore:', error);
            }
        }
        
        this.notifyListeners('delete', { noteId });
    }
    
    /**
     * Pin/unpin a note
     * @param {string} noteId - Note ID
     * @returns {Promise<Object>} Updated note
     */
    async togglePin(noteId) {
        const note = await this.getNoteById(noteId);
        if (note) {
            return this.updateNote(noteId, { isPinned: !note.isPinned });
        }
    }
    
    /**
     * Search notes by query
     * @param {string} query - Search query
     * @returns {Promise<Array>} Matching notes
     */
    async searchNotes(query) {
        if (!query || query.trim().length === 0) {
            return this.getAllNotes();
        }
        
        const allNotes = await this.getAllNotes();
        const lowerQuery = query.toLowerCase();
        
        return allNotes.filter(note => {
            const titleMatch = note.title.toLowerCase().includes(lowerQuery);
            const contentMatch = note.content.toLowerCase().includes(lowerQuery);
            const tagMatch = note.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
            
            return titleMatch || contentMatch || tagMatch;
        });
    }
    
    /**
     * Get notes by tag
     * @param {string} tag - Tag to filter by
     * @returns {Promise<Array>} Notes with the tag
     */
    async getNotesByTag(tag) {
        const allNotes = await this.getAllNotes();
        return allNotes.filter(note => note.tags.includes(tag));
    }
    
    /**
     * Get all unique tags
     * @returns {Promise<Array>} Array of unique tags
     */
    async getAllTags() {
        const allNotes = await this.getAllNotes();
        const tags = new Set();
        
        allNotes.forEach(note => {
            note.tags.forEach(tag => tags.add(tag));
        });
        
        return Array.from(tags).sort();
    }
    
    /**
     * Export notes as JSON
     * @returns {Promise<string>} JSON string
     */
    async exportNotes() {
        const notes = await this.getAllNotes();
        return JSON.stringify({
            exportedAt: new Date().toISOString(),
            version: '1.0',
            notes
        }, null, 2);
    }
    
    /**
     * Import notes from JSON
     * @param {string} jsonString - JSON string to import
     * @returns {Promise<Object>} Import result
     */
    async importNotes(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            
            if (!data.notes || !Array.isArray(data.notes)) {
                throw new Error('Invalid import format');
            }
            
            let imported = 0;
            let skipped = 0;
            
            for (const note of data.notes) {
                // Generate new ID to avoid conflicts
                const newNote = {
                    ...note,
                    id: this.generateId(),
                    importedAt: Date.now()
                };
                
                await this.createNote(newNote);
                imported++;
            }
            
            return { imported, skipped, total: data.notes.length };
        } catch (error) {
            console.error('Import error:', error);
            throw new Error('Failed to import notes: ' + error.message);
        }
    }
    
    /**
     * Get notes from localStorage
     * @returns {Array} Notes array
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
     * Save notes to localStorage
     * @param {Array} notes - Notes to save
     */
    saveToLocalStorage(notes) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    
    /**
     * Generate unique ID
     * @returns {string} Unique ID
     */
    generateId() {
        return 'note_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
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
    
    /**
     * Parse markdown to HTML
     * @param {string} markdown - Markdown string
     * @returns {string} HTML string
     */
    parseMarkdown(markdown) {
        if (!markdown) return '';
        
        let html = markdown;
        
        // Headers
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Code blocks
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block" data-lang="$1"><code>$2</code></pre>');
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
        
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Lists
        html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
        
        // Numbered lists
        html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
        
        // Blockquotes
        html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
        
        // Horizontal rule
        html = html.replace(/^---$/gm, '<hr>');
        
        // Line breaks
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }
}

// Export singleton instance
const notesService = new NotesService();
export { notesService, NotesService };
export default notesService;
