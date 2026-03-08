/**
 * Tracker Logic
 * Handles persistence and state management for project completion.
 */

const STORAGE_KEY = 'ecwoc26-progress';

// Get completed days from localStorage
export function getCompletedDays() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse progress from localStorage", e);
        return [];
    }
}

// Check if a specific day is completed
export function isDayCompleted(day) {
    const completedDays = getCompletedDays();
    return completedDays.includes(day);
}

// Toggle completion status for a day
export function toggleDay(day) {
    const completedDays = getCompletedDays();
    const index = completedDays.indexOf(day);

    if (index > -1) {
        // Remove day
        completedDays.splice(index, 1);
    } else {
        // Add day
        completedDays.push(day);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedDays));
    updateProgressUI();
    return index === -1; // Specific return: true if added (completed), false if removed
}

// Update the progress summary UI
export function updateProgressUI() {
    const completedDays = getCompletedDays();
    const totalDays = 100; // Assuming 100 days challenge
    const count = completedDays.length;

    // Update text
    const countElement = document.getElementById('progress-count');
    if (countElement) {
        countElement.textContent = `${count}/${totalDays}`;
    }

    // Update progress bar
    const barFill = document.getElementById('progress-bar-fill');
    if (barFill) {
        const percentage = Math.min((count / totalDays) * 100, 100);
        barFill.style.width = `${percentage}%`;
    }
}
