/**
 * Notes Page Logic
 * Handles notes and snippets dashboard functionality
 */

import notesService from '../core/notesService.js';
import snippetService from '../core/snippetService.js';
import { NoteEditor } from '../components/NoteEditor.js';
import { SnippetCard } from '../components/SnippetCard.js';

class NotesPage {
    constructor() {
        this.activeTab = 'notes';
        this.notes = [];
        this.snippets = [];
        this.editingNoteId = null;
        this.editingSnippetId = null;
        this.searchQuery = '';
        this.filters = {
            day: '',
            tag: '',
            category: '',
            language: '',
            favoritesOnly: false
        };
        this.viewMode = 'grid';
        this.noteEditor = null;
        
        this.init();
    }
    
    /**
     * Initialize the page
     */
    async init() {
        this.bindElements();
        this.bindEvents();
        this.populateFilters();
        await this.loadData();
        this.setupKeyboardShortcuts();
    }
    
    /**
     * Bind DOM elements
     */
    bindElements() {
        // Tabs
        this.tabs = document.querySelectorAll('.tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.notesCountEl = document.getElementById('notes-count');
        this.snippetsCountEl = document.getElementById('snippets-count');
        
        // Search
        this.searchInput = document.getElementById('search-input');
        
        // Containers
        this.notesContainer = document.getElementById('notes-container');
        this.snippetsContainer = document.getElementById('snippets-container');
        
        // Loading/Empty states
        this.notesLoading = document.getElementById('notes-loading');
        this.notesEmpty = document.getElementById('notes-empty');
        this.snippetsLoading = document.getElementById('snippets-loading');
        this.snippetsEmpty = document.getElementById('snippets-empty');
        
        // Buttons
        this.btnNew = document.getElementById('btn-new');
        this.btnMore = document.getElementById('btn-more');
        this.btnImport = document.getElementById('btn-import');
        this.btnExport = document.getElementById('btn-export');
        this.btnRefresh = document.getElementById('btn-refresh');
        
        // Note Modal
        this.noteModal = document.getElementById('note-modal');
        this.noteTitleInput = document.getElementById('note-title');
        this.noteContentInput = document.getElementById('note-content');
        this.notePreview = document.getElementById('note-preview');
        this.noteDaySelect = document.getElementById('note-day');
        this.noteTagsInput = document.getElementById('note-tags');
        this.autosaveIndicator = document.getElementById('autosave-indicator');
        this.btnPinNote = document.getElementById('btn-pin-note');
        this.btnSaveNote = document.getElementById('btn-save-note');
        this.btnDeleteNote = document.getElementById('btn-delete-note');
        this.btnPreview = document.getElementById('btn-preview');
        
        // Snippet Modal
        this.snippetModal = document.getElementById('snippet-modal');
        this.snippetModalTitle = document.getElementById('snippet-modal-title');
        this.snippetTitleInput = document.getElementById('snippet-title');
        this.snippetDescInput = document.getElementById('snippet-description');
        this.snippetCodeInput = document.getElementById('snippet-code');
        this.snippetLanguageSelect = document.getElementById('snippet-language');
        this.snippetCategorySelect = document.getElementById('snippet-category');
        this.snippetTagsInput = document.getElementById('snippet-tags');
        this.snippetDaySelect = document.getElementById('snippet-day');
        this.snippetFavoriteCheck = document.getElementById('snippet-favorite');
        this.snippetLineNumbers = document.getElementById('snippet-line-numbers');
        this.btnSaveSnippet = document.getElementById('btn-save-snippet');
        this.btnDeleteSnippet = document.getElementById('btn-delete-snippet');
        
        // Import Modal
        this.importModal = document.getElementById('import-modal');
        this.importDropZone = document.getElementById('import-drop-zone');
        this.importFile = document.getElementById('import-file');
        this.importPreview = document.getElementById('import-preview');
        this.previewStats = document.getElementById('preview-stats');
        this.btnConfirmImport = document.getElementById('btn-confirm-import');
        this.importTabs = document.querySelectorAll('.import-tab');
        
        // Filters
        this.filterDay = document.getElementById('filter-day');
        this.filterCategory = document.getElementById('filter-category');
        this.filterLanguage = document.getElementById('filter-language');
        this.filterFavorites = document.getElementById('filter-favorites');
        this.tagsFilter = document.getElementById('tags-filter');
        
        // View toggles
        this.viewToggles = document.querySelectorAll('.view-toggle button');
        
        // Toast container
        this.toastContainer = document.getElementById('toast-container');
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Tab switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
        
        // Search
        this.searchInput.addEventListener('input', this.debounce(() => {
            this.searchQuery = this.searchInput.value;
            this.renderCurrentTab();
        }, 300));
        
        // New button
        this.btnNew.addEventListener('click', () => {
            if (this.activeTab === 'notes') {
                this.openNoteModal();
            } else {
                this.openSnippetModal();
            }
        });
        
        // More menu
        this.btnMore.addEventListener('click', () => {
            this.btnMore.parentElement.classList.toggle('open');
        });
        
        // Import/Export/Refresh
        this.btnImport.addEventListener('click', () => this.openImportModal());
        this.btnExport.addEventListener('click', () => this.exportData());
        this.btnRefresh.addEventListener('click', () => this.loadData());
        
        // Note Modal events
        this.bindNoteModalEvents();
        
        // Snippet Modal events
        this.bindSnippetModalEvents();
        
        // Import Modal events
        this.bindImportModalEvents();
        
        // Filter events
        this.filterDay?.addEventListener('change', () => {
            this.filters.day = this.filterDay.value;
            this.renderNotes();
        });
        
        this.filterCategory?.addEventListener('change', () => {
            this.filters.category = this.filterCategory.value;
            this.renderSnippets();
        });
        
        this.filterLanguage?.addEventListener('change', () => {
            this.filters.language = this.filterLanguage.value;
            this.renderSnippets();
        });
        
        this.filterFavorites?.addEventListener('change', () => {
            this.filters.favoritesOnly = this.filterFavorites.checked;
            this.renderSnippets();
        });
        
        // View toggle
        this.viewToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                this.viewToggles.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.viewMode = btn.dataset.view;
                this.updateViewMode();
            });
        });
        
        // Close modals on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeModals();
                }
            });
        });
        
        // Close buttons
        document.querySelectorAll('.btn-close-modal, .btn-cancel-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });
        
        // Empty state buttons
        document.getElementById('btn-create-first-note')?.addEventListener('click', () => this.openNoteModal());
        document.getElementById('btn-create-first-snippet')?.addEventListener('click', () => this.openSnippetModal());
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
            }
        });
        
        // Subscribe to service updates
        notesService.subscribe((event, data) => {
            if (event === 'autosave') {
                this.showAutosaveIndicator();
            }
        });
    }
    
    /**
     * Bind Note Modal events
     */
    bindNoteModalEvents() {
        // Auto-save on content change
        this.noteContentInput.addEventListener('input', () => {
            if (this.editingNoteId) {
                notesService.autoSaveNote(this.editingNoteId, {
                    content: this.noteContentInput.value
                });
            }
            this.updateLineNumbers(this.noteContentInput);
        });
        
        // Auto-save on title change
        this.noteTitleInput.addEventListener('input', () => {
            if (this.editingNoteId) {
                notesService.autoSaveNote(this.editingNoteId, {
                    title: this.noteTitleInput.value
                });
            }
        });
        
        // Toolbar buttons
        document.querySelectorAll('.editor-toolbar button').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                if (action === 'preview') {
                    this.toggleNotePreview();
                } else {
                    this.insertMarkdown(action);
                }
            });
        });
        
        // Pin button
        this.btnPinNote.addEventListener('click', () => this.togglePinNote());
        
        // Save button
        this.btnSaveNote.addEventListener('click', () => this.saveNote());
        
        // Delete button
        this.btnDeleteNote.addEventListener('click', () => this.deleteNote());
    }
    
    /**
     * Bind Snippet Modal events
     */
    bindSnippetModalEvents() {
        // Update line numbers on code input
        this.snippetCodeInput.addEventListener('input', () => {
            this.updateLineNumbers(this.snippetCodeInput, this.snippetLineNumbers);
        });
        
        this.snippetCodeInput.addEventListener('scroll', () => {
            this.snippetLineNumbers.scrollTop = this.snippetCodeInput.scrollTop;
        });
        
        // Tab key handling in code editor
        this.snippetCodeInput.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.snippetCodeInput.selectionStart;
                const end = this.snippetCodeInput.selectionEnd;
                const value = this.snippetCodeInput.value;
                this.snippetCodeInput.value = value.substring(0, start) + '  ' + value.substring(end);
                this.snippetCodeInput.selectionStart = this.snippetCodeInput.selectionEnd = start + 2;
            }
        });
        
        // Save button
        this.btnSaveSnippet.addEventListener('click', () => this.saveSnippet());
        
        // Delete button
        this.btnDeleteSnippet.addEventListener('click', () => this.deleteSnippet());
    }
    
    /**
     * Bind Import Modal events
     */
    bindImportModalEvents() {
        // Tab switching
        this.importTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.importTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
        
        // Drag and drop
        this.importDropZone.addEventListener('click', () => this.importFile.click());
        
        this.importDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.importDropZone.classList.add('dragover');
        });
        
        this.importDropZone.addEventListener('dragleave', () => {
            this.importDropZone.classList.remove('dragover');
        });
        
        this.importDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.importDropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) this.handleImportFile(file);
        });
        
        this.importFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.handleImportFile(file);
        });
        
        // Confirm import
        this.btnConfirmImport.addEventListener('click', () => this.confirmImport());
    }
    
    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K - Focus search
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.searchInput.focus();
            }
            
            // Ctrl+N - New note/snippet
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                if (this.activeTab === 'notes') {
                    this.openNoteModal();
                } else {
                    this.openSnippetModal();
                }
            }
            
            // Escape - Close modals
            if (e.key === 'Escape') {
                this.closeModals();
            }
            
            // Ctrl+S - Save (when modal open)
            if (e.ctrlKey && e.key === 's') {
                if (this.noteModal.classList.contains('active')) {
                    e.preventDefault();
                    this.saveNote();
                } else if (this.snippetModal.classList.contains('active')) {
                    e.preventDefault();
                    this.saveSnippet();
                }
            }
        });
    }
    
    /**
     * Load all data
     */
    async loadData() {
        try {
            // Load notes
            this.notesLoading.classList.remove('hidden');
            this.notes = await notesService.getAllNotes();
            this.notesLoading.classList.add('hidden');
            
            // Load snippets
            this.snippetsLoading.classList.remove('hidden');
            this.snippets = await snippetService.getAllSnippets();
            this.snippetsLoading.classList.add('hidden');
            
            // Update counts
            this.updateCounts();
            
            // Render current tab
            this.renderCurrentTab();
            
            // Update tag filters
            this.updateTagFilters();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showToast('Failed to load data', 'error');
        }
    }
    
    /**
     * Switch between tabs
     */
    switchTab(tabId) {
        this.activeTab = tabId;
        
        // Update tab buttons
        this.tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });
        
        // Update tab contents
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabId}-tab`);
        });
        
        // Update new button text
        const btnText = this.btnNew.querySelector('.btn-text');
        btnText.textContent = tabId === 'notes' ? 'New Note' : 'New Snippet';
        
        this.renderCurrentTab();
    }
    
    /**
     * Render current tab content
     */
    renderCurrentTab() {
        if (this.activeTab === 'notes') {
            this.renderNotes();
        } else {
            this.renderSnippets();
        }
    }
    
    /**
     * Render notes grid
     */
    renderNotes() {
        let filteredNotes = [...this.notes];
        
        // Apply search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filteredNotes = filteredNotes.filter(note => 
                note.title.toLowerCase().includes(query) ||
                note.content.toLowerCase().includes(query) ||
                note.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        // Apply day filter
        if (this.filters.day) {
            filteredNotes = filteredNotes.filter(note => note.dayId === this.filters.day);
        }
        
        // Apply tag filter
        if (this.filters.tag) {
            filteredNotes = filteredNotes.filter(note => note.tags.includes(this.filters.tag));
        }
        
        // Sort: pinned first, then by updated date
        filteredNotes.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return b.updatedAt - a.updatedAt;
        });
        
        // Show empty state or render
        if (filteredNotes.length === 0) {
            this.notesContainer.innerHTML = '';
            this.notesEmpty.classList.remove('hidden');
        } else {
            this.notesEmpty.classList.add('hidden');
            this.notesContainer.innerHTML = filteredNotes.map(note => this.renderNoteCard(note)).join('');
            this.bindNoteCardEvents();
        }
    }
    
    /**
     * Render single note card
     */
    renderNoteCard(note) {
        const preview = this.truncateText(note.content, 150);
        const date = this.formatDate(note.updatedAt);
        const tags = note.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('');
        
        return `
            <div class="note-card ${note.isPinned ? 'pinned' : ''}" data-id="${note.id}">
                ${note.isPinned ? '<span class="pin-indicator">📌</span>' : ''}
                <h3 class="note-card-title">${this.escapeHtml(note.title)}</h3>
                <p class="note-card-preview">${this.escapeHtml(preview)}</p>
                <div class="note-card-meta">
                    ${note.dayId ? `<span class="day-badge">${note.dayId}</span>` : ''}
                    <span class="note-date">${date}</span>
                </div>
                ${tags ? `<div class="note-card-tags">${tags}</div>` : ''}
            </div>
        `;
    }
    
    /**
     * Bind note card click events
     */
    bindNoteCardEvents() {
        this.notesContainer.querySelectorAll('.note-card').forEach(card => {
            card.addEventListener('click', () => {
                const noteId = card.dataset.id;
                const note = this.notes.find(n => n.id === noteId);
                if (note) this.openNoteModal(note);
            });
        });
    }
    
    /**
     * Render snippets grid
     */
    renderSnippets() {
        let filteredSnippets = [...this.snippets];
        
        // Apply search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filteredSnippets = filteredSnippets.filter(snippet => 
                snippet.title.toLowerCase().includes(query) ||
                snippet.description.toLowerCase().includes(query) ||
                snippet.code.toLowerCase().includes(query) ||
                snippet.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        // Apply category filter
        if (this.filters.category) {
            filteredSnippets = filteredSnippets.filter(s => s.category === this.filters.category);
        }
        
        // Apply language filter
        if (this.filters.language) {
            filteredSnippets = filteredSnippets.filter(s => s.language === this.filters.language);
        }
        
        // Apply favorites filter
        if (this.filters.favoritesOnly) {
            filteredSnippets = filteredSnippets.filter(s => s.isFavorite);
        }
        
        // Sort by updated date
        filteredSnippets.sort((a, b) => b.updatedAt - a.updatedAt);
        
        // Show empty state or render
        if (filteredSnippets.length === 0) {
            this.snippetsContainer.innerHTML = '';
            this.snippetsEmpty.classList.remove('hidden');
        } else {
            this.snippetsEmpty.classList.add('hidden');
            this.snippetsContainer.innerHTML = filteredSnippets.map(snippet => 
                SnippetCard.render(snippet)
            ).join('');
            this.bindSnippetCardEvents();
        }
    }
    
    /**
     * Bind snippet card events
     */
    bindSnippetCardEvents() {
        // Card click - edit
        this.snippetsContainer.querySelectorAll('.snippet-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.snippet-actions')) return;
                
                const snippetId = card.dataset.id;
                const snippet = this.snippets.find(s => s.id === snippetId);
                if (snippet) this.openSnippetModal(snippet);
            });
        });
        
        // Copy button
        this.snippetsContainer.querySelectorAll('.btn-copy').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const snippetId = btn.closest('.snippet-card').dataset.id;
                const success = await snippetService.copyToClipboard(snippetId);
                
                if (success) {
                    btn.classList.add('copied');
                    btn.textContent = '✓';
                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.textContent = '📋';
                    }, 2000);
                    this.showToast('Copied to clipboard!', 'success');
                }
            });
        });
        
        // Favorite button
        this.snippetsContainer.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const snippetId = btn.closest('.snippet-card').dataset.id;
                await snippetService.toggleFavorite(snippetId);
                this.snippets = await snippetService.getAllSnippets();
                this.renderSnippets();
            });
        });
    }
    
    /**
     * Open note modal for editing or creating
     */
    openNoteModal(note = null) {
        this.editingNoteId = note?.id || null;
        
        // Fill form
        this.noteTitleInput.value = note?.title || '';
        this.noteContentInput.value = note?.content || '';
        this.noteTagsInput.value = note?.tags?.join(', ') || '';
        this.noteDaySelect.value = note?.dayId || '';
        
        // Update pin button
        this.btnPinNote.classList.toggle('active', note?.isPinned);
        
        // Show/hide delete button
        this.btnDeleteNote.style.display = note ? 'block' : 'none';
        
        // Reset preview
        this.notePreview.classList.add('hidden');
        this.noteContentInput.classList.remove('hidden');
        this.btnPreview.classList.remove('active');
        
        // Show modal
        this.noteModal.classList.add('active');
        this.noteTitleInput.focus();
    }
    
    /**
     * Save note
     */
    async saveNote() {
        const noteData = {
            title: this.noteTitleInput.value || 'Untitled Note',
            content: this.noteContentInput.value,
            tags: this.noteTagsInput.value.split(',').map(t => t.trim()).filter(Boolean),
            dayId: this.noteDaySelect.value || null
        };
        
        try {
            if (this.editingNoteId) {
                await notesService.updateNote(this.editingNoteId, noteData);
                this.showToast('Note updated', 'success');
            } else {
                await notesService.createNote(noteData);
                this.showToast('Note created', 'success');
            }
            
            this.notes = await notesService.getAllNotes();
            this.updateCounts();
            this.renderNotes();
            this.closeModals();
        } catch (error) {
            console.error('Error saving note:', error);
            this.showToast('Failed to save note', 'error');
        }
    }
    
    /**
     * Delete note
     */
    async deleteNote() {
        if (!this.editingNoteId) return;
        
        if (!confirm('Are you sure you want to delete this note?')) return;
        
        try {
            await notesService.deleteNote(this.editingNoteId);
            this.notes = await notesService.getAllNotes();
            this.updateCounts();
            this.renderNotes();
            this.closeModals();
            this.showToast('Note deleted', 'success');
        } catch (error) {
            console.error('Error deleting note:', error);
            this.showToast('Failed to delete note', 'error');
        }
    }
    
    /**
     * Toggle pin status
     */
    async togglePinNote() {
        if (!this.editingNoteId) return;
        
        const note = this.notes.find(n => n.id === this.editingNoteId);
        if (note) {
            await notesService.updateNote(this.editingNoteId, { isPinned: !note.isPinned });
            this.btnPinNote.classList.toggle('active');
            this.notes = await notesService.getAllNotes();
        }
    }
    
    /**
     * Toggle note preview
     */
    toggleNotePreview() {
        const isPreview = this.notePreview.classList.contains('hidden');
        
        if (isPreview) {
            const html = notesService.parseMarkdown(this.noteContentInput.value);
            this.notePreview.innerHTML = html || '<p class="text-secondary">Nothing to preview</p>';
            this.notePreview.classList.remove('hidden');
            this.noteContentInput.classList.add('hidden');
            this.btnPreview.classList.add('active');
        } else {
            this.notePreview.classList.add('hidden');
            this.noteContentInput.classList.remove('hidden');
            this.btnPreview.classList.remove('active');
        }
    }
    
    /**
     * Insert markdown syntax
     */
    insertMarkdown(action) {
        const textarea = this.noteContentInput;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);
        
        let before = '', after = '';
        
        switch (action) {
            case 'bold':
                before = '**'; after = '**';
                break;
            case 'italic':
                before = '*'; after = '*';
                break;
            case 'code':
                if (selected.includes('\n')) {
                    before = '```\n'; after = '\n```';
                } else {
                    before = '`'; after = '`';
                }
                break;
            case 'link':
                before = '['; after = '](url)';
                break;
            case 'h1':
                before = '# '; after = '';
                break;
            case 'h2':
                before = '## '; after = '';
                break;
            case 'h3':
                before = '### '; after = '';
                break;
            case 'ul':
                before = '- '; after = '';
                break;
            case 'ol':
                before = '1. '; after = '';
                break;
            case 'quote':
                before = '> '; after = '';
                break;
        }
        
        textarea.value = text.substring(0, start) + before + selected + after + text.substring(end);
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = start + before.length + selected.length;
        textarea.focus();
        
        // Trigger auto-save
        if (this.editingNoteId) {
            notesService.autoSaveNote(this.editingNoteId, { content: textarea.value });
        }
    }
    
    /**
     * Open snippet modal for editing or creating
     */
    openSnippetModal(snippet = null) {
        this.editingSnippetId = snippet?.id || null;
        
        // Update modal title
        this.snippetModalTitle.textContent = snippet ? 'Edit Snippet' : 'New Snippet';
        
        // Fill form
        this.snippetTitleInput.value = snippet?.title || '';
        this.snippetDescInput.value = snippet?.description || '';
        this.snippetCodeInput.value = snippet?.code || '';
        this.snippetLanguageSelect.value = snippet?.language || 'javascript';
        this.snippetCategorySelect.value = snippet?.category || 'js-utilities';
        this.snippetTagsInput.value = snippet?.tags?.join(', ') || '';
        this.snippetDaySelect.value = snippet?.dayId || '';
        this.snippetFavoriteCheck.checked = snippet?.isFavorite || false;
        
        // Update line numbers
        this.updateLineNumbers(this.snippetCodeInput, this.snippetLineNumbers);
        
        // Show/hide delete button
        this.btnDeleteSnippet.style.display = snippet ? 'block' : 'none';
        
        // Show modal
        this.snippetModal.classList.add('active');
        this.snippetTitleInput.focus();
    }
    
    /**
     * Save snippet
     */
    async saveSnippet() {
        const snippetData = {
            title: this.snippetTitleInput.value || 'Untitled Snippet',
            description: this.snippetDescInput.value,
            code: this.snippetCodeInput.value,
            language: this.snippetLanguageSelect.value,
            category: this.snippetCategorySelect.value,
            tags: this.snippetTagsInput.value.split(',').map(t => t.trim()).filter(Boolean),
            dayId: this.snippetDaySelect.value || null,
            isFavorite: this.snippetFavoriteCheck.checked
        };
        
        try {
            if (this.editingSnippetId) {
                await snippetService.updateSnippet(this.editingSnippetId, snippetData);
                this.showToast('Snippet updated', 'success');
            } else {
                await snippetService.createSnippet(snippetData);
                this.showToast('Snippet created', 'success');
            }
            
            this.snippets = await snippetService.getAllSnippets();
            this.updateCounts();
            this.renderSnippets();
            this.closeModals();
        } catch (error) {
            console.error('Error saving snippet:', error);
            this.showToast('Failed to save snippet', 'error');
        }
    }
    
    /**
     * Delete snippet
     */
    async deleteSnippet() {
        if (!this.editingSnippetId) return;
        
        if (!confirm('Are you sure you want to delete this snippet?')) return;
        
        try {
            await snippetService.deleteSnippet(this.editingSnippetId);
            this.snippets = await snippetService.getAllSnippets();
            this.updateCounts();
            this.renderSnippets();
            this.closeModals();
            this.showToast('Snippet deleted', 'success');
        } catch (error) {
            console.error('Error deleting snippet:', error);
            this.showToast('Failed to delete snippet', 'error');
        }
    }
    
    /**
     * Open import modal
     */
    openImportModal() {
        this.importPreview.classList.add('hidden');
        this.btnConfirmImport.disabled = true;
        this.importFile.value = '';
        this.importModal.classList.add('active');
    }
    
    /**
     * Handle import file selection
     */
    async handleImportFile(file) {
        if (!file.name.endsWith('.json')) {
            this.showToast('Please select a JSON file', 'error');
            return;
        }
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            this.importData = { text, data };
            
            // Show preview
            const count = data.notes?.length || data.snippets?.length || 0;
            const type = data.notes ? 'notes' : 'snippets';
            
            this.previewStats.innerHTML = `
                <p><strong>File:</strong> ${file.name}</p>
                <p><strong>Items:</strong> ${count} ${type}</p>
                <p><strong>Exported:</strong> ${data.exportedAt || 'Unknown'}</p>
            `;
            
            this.importPreview.classList.remove('hidden');
            this.btnConfirmImport.disabled = false;
        } catch (error) {
            console.error('Error parsing file:', error);
            this.showToast('Invalid JSON file', 'error');
        }
    }
    
    /**
     * Confirm import
     */
    async confirmImport() {
        if (!this.importData) return;
        
        try {
            const { text, data } = this.importData;
            let result;
            
            if (data.notes) {
                result = await notesService.importNotes(text);
                this.notes = await notesService.getAllNotes();
            } else if (data.snippets) {
                result = await snippetService.importSnippets(text);
                this.snippets = await snippetService.getAllSnippets();
            }
            
            this.updateCounts();
            this.renderCurrentTab();
            this.closeModals();
            this.showToast(`Imported ${result.imported} items`, 'success');
        } catch (error) {
            console.error('Import error:', error);
            this.showToast('Import failed: ' + error.message, 'error');
        }
    }
    
    /**
     * Export data
     */
    async exportData() {
        try {
            let json, filename;
            
            if (this.activeTab === 'notes') {
                json = await notesService.exportNotes();
                filename = `notes-export-${Date.now()}.json`;
            } else {
                json = await snippetService.exportSnippets();
                filename = `snippets-export-${Date.now()}.json`;
            }
            
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            
            URL.revokeObjectURL(url);
            this.showToast('Export successful', 'success');
        } catch (error) {
            console.error('Export error:', error);
            this.showToast('Export failed', 'error');
        }
    }
    
    /**
     * Close all modals
     */
    closeModals() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        this.editingNoteId = null;
        this.editingSnippetId = null;
        this.importData = null;
    }
    
    /**
     * Update view mode (grid/list)
     */
    updateViewMode() {
        this.notesContainer.classList.toggle('grid-view', this.viewMode === 'grid');
        this.notesContainer.classList.toggle('list-view', this.viewMode === 'list');
        this.snippetsContainer.classList.toggle('grid-view', this.viewMode === 'grid');
        this.snippetsContainer.classList.toggle('list-view', this.viewMode === 'list');
    }
    
    /**
     * Update counts
     */
    updateCounts() {
        this.notesCountEl.textContent = this.notes.length;
        this.snippetsCountEl.textContent = this.snippets.length;
    }
    
    /**
     * Update tag filters
     */
    async updateTagFilters() {
        const tags = await notesService.getAllTags();
        
        this.tagsFilter.innerHTML = `
            <button class="tag-pill active" data-tag="">All</button>
            ${tags.map(tag => `<button class="tag-pill" data-tag="${tag}">${tag}</button>`).join('')}
        `;
        
        this.tagsFilter.querySelectorAll('.tag-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                this.tagsFilter.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.filters.tag = pill.dataset.tag;
                this.renderNotes();
            });
        });
    }
    
    /**
     * Populate filter dropdowns
     */
    populateFilters() {
        // Populate day filters
        const days = Array.from({ length: 100 }, (_, i) => `Day ${String(i + 1).padStart(2, '0')}`);
        
        [this.filterDay, this.noteDaySelect, this.snippetDaySelect].forEach(select => {
            if (!select) return;
            
            days.forEach(day => {
                const option = document.createElement('option');
                option.value = day.toLowerCase().replace(' ', '-');
                option.textContent = day;
                select.appendChild(option);
            });
        });
        
        // Populate category filter
        const categories = snippetService.getCategories();
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = `${cat.icon} ${cat.name}`;
            this.filterCategory.appendChild(option);
        });
        
        // Populate language filter
        const languages = snippetService.getLanguages();
        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
            this.filterLanguage.appendChild(option);
        });
    }
    
    /**
     * Show autosave indicator
     */
    showAutosaveIndicator() {
        this.autosaveIndicator.classList.add('saved');
        setTimeout(() => {
            this.autosaveIndicator.classList.remove('saved');
        }, 2000);
    }
    
    /**
     * Update line numbers for code textarea
     */
    updateLineNumbers(textarea, lineNumbersEl = null) {
        if (!lineNumbersEl) return;
        
        const lines = textarea.value.split('\n').length;
        lineNumbersEl.innerHTML = Array.from({ length: lines }, (_, i) => 
            `<span>${i + 1}</span>`
        ).join('');
    }
    
    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    /**
     * Truncate text
     */
    truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    
    /**
     * Format date
     */
    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
        
        return date.toLocaleDateString();
    }
    
    /**
     * Escape HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Debounce function
     */
    debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    new NotesPage();
});

export default NotesPage;
