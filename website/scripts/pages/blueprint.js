/**
 * Blueprint Page Logic - CRDT-Based Collaborative Whiteboard
 * Real-time multi-user canvas with Yjs CRDT synchronization
 * @version 1.0.0
 */

import { blueprintService } from '../core/blueprintService.js';
import { BlueprintCanvas } from '../components/BlueprintCanvas.js';
import { BlueprintToolbar } from '../components/BlueprintToolbar.js';

// State
let canvas, toolbar;
let roomId, userId;
let currentColor = '#58a6ff';

/**
 * Initialize Blueprint Page
 */
async function init() {
    // Generate or get room ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    roomId = urlParams.get('room') || generateRoomId();
    userId = localStorage.getItem('userId') || generateUserId();
    
    // Update URL if needed
    if (!urlParams.get('room')) {
        window.history.replaceState({}, '', `?room=${roomId}`);
    }
    
    // Update UI
    document.getElementById('roomId').textContent = `Room: ${roomId}`;
    document.getElementById('shareLinkInput').value = 
        `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    
    // Initialize components
    toolbar = new BlueprintToolbar('blueprintToolbar');
    canvas = new BlueprintCanvas('blueprintCanvas');
    
    // Initialize blueprint service
    showConnectionStatus('Connecting...', 'connecting');
    const initialized = await blueprintService.initialize(roomId, userId);
    
    if (initialized) {
        showConnectionStatus('Connected', 'connected');
        setTimeout(() => hideConnectionStatus(), 2000);
    } else {
        showConnectionStatus('Connection failed - Working offline', 'offline');
    }
    
    // Load existing shapes
    const shapes = blueprintService.getAllShapes();
    canvas.setShapes(shapes);
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('✅ Blueprint initialized:', { roomId, userId });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Toolbar events
    toolbar.on('toolChanged', (tool) => {
        canvas.setTool(tool);
    });
    
    toolbar.on('colorChanged', (color) => {
        currentColor = color;
    });
    
    toolbar.on('undo', () => {
        blueprintService.undo();
    });
    
    toolbar.on('redo', () => {
        blueprintService.redo();
    });
    
    toolbar.on('clear', () => {
        if (confirm('Clear all shapes? This cannot be undone.')) {
            blueprintService.clearAll();
        }
    });
    
    toolbar.on('export', () => {
        exportBlueprint();
    });
    
    toolbar.on('import', () => {
        importBlueprint();
    });
    
    // Canvas events
    canvas.on('shapeCreated', (shape) => {
        shape.strokeColor = currentColor;
        blueprintService.addShape(shape);
    });
    
    canvas.on('shapeSelected', (shapeId) => {
        console.log('Shape selected:', shapeId);
    });
    
    canvas.on('cursorMoved', (point) => {
        blueprintService.updateCursor(point.x, point.y);
    });
    
    // Blueprint service events
    blueprintService.on('shapesChanged', ({ shapes }) => {
        canvas.setShapes(shapes);
    });
    
    blueprintService.on('usersChanged', ({ users }) => {
        const otherUsers = users.filter(u => u.id !== userId);
        toolbar.updateCollaborators(otherUsers);
        updateUserCursors(otherUsers);
    });
    
    // Share button
    document.getElementById('shareRoomBtn').addEventListener('click', () => {
        document.getElementById('shareModal').style.display = 'flex';
    });
    
    // Copy link button
    document.getElementById('copyLinkBtn').addEventListener('click', () => {
        const input = document.getElementById('shareLinkInput');
        input.select();
        document.execCommand('copy');
        
        const btn = document.getElementById('copyLinkBtn');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
    });
    
    // Zoom controls (if implemented)
    document.getElementById('zoomInBtn')?.addEventListener('click', () => {
        // Implement zoom in
    });
    
    document.getElementById('zoomOutBtn')?.addEventListener('click', () => {
        // Implement zoom out
    });
    
    document.getElementById('resetZoomBtn')?.addEventListener('click', () => {
        // Implement reset zoom
    });
}

/**
 * Export blueprint to JSON
 */
function exportBlueprint() {
    const data = blueprintService.exportJSON();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `blueprint-${roomId}-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
}

/**
 * Import blueprint from JSON
 */
function importBlueprint() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                blueprintService.importJSON(data);
            } catch (error) {
                alert('Failed to import blueprint: Invalid file format');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

/**
 * Update user cursors on canvas
 */
function updateUserCursors(users) {
    const container = document.getElementById('userCursors');
    container.innerHTML = users
        .filter(u => u.cursor)
        .map(u => `
            <div class="user-cursor" style="
                left: ${u.cursor.x}px;
                top: ${u.cursor.y}px;
                --user-color: ${u.color};
            ">
                <svg class="cursor-icon" viewBox="0 0 24 24">
                    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="${u.color}"/>
                </svg>
                <span class="cursor-label">${u.name}</span>
            </div>
        `).join('');
}

/**
 * Connection status helpers
 */
function showConnectionStatus(text, status) {
    const el = document.getElementById('connectionStatus');
    el.querySelector('.status-text').textContent = text;
    el.className = `connection-status ${status}`;
    el.classList.remove('hidden');
}

function hideConnectionStatus() {
    document.getElementById('connectionStatus').classList.add('hidden');
}

/**
 * Close share modal
 */
window.closeShareModal = function() {
    document.getElementById('shareModal').style.display = 'none';
};

// Close modal on background click
document.getElementById('shareModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'shareModal') {
        window.closeShareModal();
    }
});

/**
 * Generate unique room ID
 */
function generateRoomId() {
    return 'room_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
}

/**
 * Generate unique user ID
 */
function generateUserId() {
    const id = 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem('userId', id);
    return id;
}

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', () => {
    blueprintService.destroy();
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
