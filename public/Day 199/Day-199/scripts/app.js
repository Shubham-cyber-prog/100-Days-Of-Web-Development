/**
 * Main Application Controller
 */

import { getRandomSnippet } from '../data/codeSnippets.js';
import { TypingEngine } from './core/typingEngine.js';
import { StatsCalculator } from './core/statsCalculator.js';
import { ProgressBar } from './ui/progressBar.js';
import { ResultsScreen } from './ui/resultsScreen.js';

class CodeTypeApp {
    constructor() {
        // Settings
        this.language = 'javascript';
        this.difficulty = 'beginner';
        this.duration = 60;

        // Components
        this.engine = null;
        this.stats = new StatsCalculator();
        this.progressBar = new ProgressBar('progress-container', 'progress-fill', 'progress-chars', 'total-chars');
        this.resultsScreen = new ResultsScreen();

        // State
        this.currentCode = '';
        this.isTestActive = false;
        this.isPaused = false;
        this.timeRemaining = 0;
        this.timerInterval = null;

        // DOM Elements
        this.screens = {
            setup: document.getElementById('setup-screen'),
            typing: document.getElementById('typing-screen'),
            results: document.getElementById('results-screen')
        };

        this.liveWPM = document.getElementById('live-wpm');
        this.liveAccuracy = document.getElementById('live-accuracy');
        this.countdown = document.getElementById('countdown-timer');
        this.codeDisplay = document.getElementById('code-display');
        this.typingInput = document.getElementById('typing-input');

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Setup screen - Language selection
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-lang]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.language = e.target.dataset.lang;
            });
        });

        // Setup screen - Difficulty selection
        document.querySelectorAll('[data-difficulty]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-difficulty]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.difficulty;
            });
        });

        // Setup screen - Duration selection
        document.querySelectorAll('[data-duration]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-duration]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.duration = parseInt(e.target.dataset.duration);
            });
        });

        // Start test
        document.getElementById('btn-start-test').addEventListener('click', () => {
            this.startTest();
        });

        // Typing input
        this.typingInput.addEventListener('input', (e) => {
            if (this.isTestActive && !this.isPaused) {
                this.handleInput(e.target.value);
            }
        });

        // Control buttons
        document.getElementById('btn-restart').addEventListener('click', () => {
            this.restartTest();
        });

        document.getElementById('btn-pause').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('btn-quit').addEventListener('click', () => {
            if (confirm('Are you sure you want to quit?')) {
                this.showScreen('setup');
                this.resetTest();
            }
        });

        // Results screen buttons
        document.getElementById('btn-new-test').addEventListener('click', () => {
            this.showScreen('setup');
            this.resetTest();
        });

        document.getElementById('btn-retry').addEventListener('click', () => {
            this.restartTest();
        });
    }

    startTest() {
        // Get random code snippet
        this.currentCode = getRandomSnippet(this.language, this.difficulty);

        // Initialize engine and stats
        this.engine = new TypingEngine(this.currentCode);
        this.stats.reset();
        this.stats.start();

        // Render code display
        this.renderCodeDisplay([]);

        // Initialize progress bar
        this.progressBar.init(this.currentCode.length);

        // Setup timer
        this.timeRemaining = this.duration;
        this.updateCountdown();
        this.startTimer();

        // Start periodic WPM recording
        this.stats.startPeriodicRecording(() => {
            const engineStats = this.engine.getStats();
            return this.stats.calculateWPM(engineStats.totalTyped);
        }, 1000);

        // Show typing screen and focus input
        this.showScreen('typing');
        this.typingInput.value = '';
        this.typingInput.focus();
        this.isTestActive = true;
    }

    handleInput(value) {
        // Process input through engine
        const results = this.engine.processInput(value);

        // Update code display
        this.renderCodeDisplay(results);

        // Update stats
        const engineStats = this.engine.getStats();
        const currentWPM = this.stats.calculateWPM(engineStats.totalTyped);

        this.liveWPM.textContent = currentWPM;
        this.liveAccuracy.textContent = engineStats.accuracy;

        // Update progress
        this.progressBar.update(engineStats.totalTyped);

        // Check if complete
        if (this.engine.isComplete()) {
            this.completeTest();
        }
    }

    renderCodeDisplay(results) {
        if (!this.codeDisplay) return;

        if (results.length === 0) {
            // Initial render
            this.codeDisplay.innerHTML = this.currentCode
                .split('')
                .map((char, i) => `<span class="code-char pending" data-index="${i}">${this.escapeHtml(char)}</span>`)
                .join('');
        } else {
            // Update based on results
            results.forEach(result => {
                const span = this.codeDisplay.querySelector(`[data-index="${result.index}"]`);
                if (span) {
                    span.className = `code-char ${result.status}`;
                }
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateCountdown();

            if (this.timeRemaining <= 0) {
                this.completeTest();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateCountdown() {
        if (this.countdown) {
            this.countdown.textContent = this.timeRemaining;

            // Change color when time is low
            if (this.timeRemaining <= 10) {
                this.countdown.parentElement.style.borderColor = 'var(--error)';
            }
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        const btn = document.getElementById('btn-pause');

        if (this.isPaused) {
            this.stopTimer();
            btn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
            this.typingInput.disabled = true;
        } else {
            this.startTimer();
            btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            this.typingInput.disabled = false;
            this.typingInput.focus();
        }
    }

    restartTest() {
        this.resetTest();
        this.startTest();
    }

    resetTest() {
        this.stopTimer();
        this.isTestActive = false;
        this.isPaused = false;
        this.typingInput.value = '';
        this.progressBar.reset();
        if (this.countdown) {
            this.countdown.parentElement.style.borderColor = 'var(--primary)';
        }
    }

    completeTest() {
        this.isTestActive = false;
        this.stopTimer();
        this.stats.stop();

        // Get final stats
        const engineStats = this.engine.getStats();
        const finalStats = this.stats.getFinalStats(
            engineStats.correctChars,
            engineStats.totalTyped,
            engineStats.totalChars,
            engineStats.errors
        );

        // Show results
        this.resultsScreen.show(finalStats);
        this.showScreen('results');
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
        }
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new CodeTypeApp();
});
