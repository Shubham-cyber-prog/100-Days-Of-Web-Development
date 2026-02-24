/**
 * Digital Footprint Calculator
 * 
 * This script calculates a weighted digital footprint score based on user inputs
 * for various online activities and displays the result with visual feedback.
 * 
 * @module DigitalFootprintCalculator
 * @version 1.0.0
 * @author Contributor
 */

/**
 * Safely converts input value to number
 * @param {string|number} value - The input value to convert
 * @returns {number} Parsed number or 0 if invalid
 */
function safeNum(value) {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

/**
 * Calculates weighted digital footprint score
 * @param {number} browsing - Hours spent browsing
 * @param {number} streaming - Hours spent streaming
 * @param {number} messaging - Hours spent messaging
 * @param {number} posts - Number of social media posts
 * @param {number} gaming - Hours spent gaming
 * @returns {number} Weighted score (0-300)
 */
function calculateFootprint(browsing, streaming, messaging, posts, gaming) {
  // Weighted calculation
  const score = (browsing * 1.5) + 
                (streaming * 2) + 
                (messaging * 1) + 
                (posts * 0.5) + 
                (gaming * 1.8);
  
  // Cap at 300
  return Math.min(score, 300);
}

/**
 * Updates UI with calculated score and visual feedback
 * @param {number} score - The calculated footprint score
 * @returns {void}
 */
function updateScoreDisplay(score) {
  const scoreEl = document.getElementById('score');
  const barFill = document.getElementById('bar-fill');
  const impactText = document.getElementById('impact-text');
  
  if (!scoreEl || !barFill || !impactText) return;
  
  // Update score display
  scoreEl.textContent = Math.round(score);
  
  // Update progress bar (percentage of 300)
  const percentage = (score / 300) * 100;
  barFill.style.width = `${percentage}%`;
  
  // Update color based on score range
  if (score < 100) {
    barFill.style.backgroundColor = '#10b981'; // Green
    impactText.textContent = 'Low impact - You\'re doing great!';
    impactText.style.color = '#10b981';
  } else if (score < 200) {
    barFill.style.backgroundColor = '#f59e0b'; // Yellow
    impactText.textContent = 'Moderate impact - Consider reducing usage';
    impactText.style.color = '#f59e0b';
  } else {
    barFill.style.backgroundColor = '#ef4444'; // Red
    impactText.textContent = 'High impact - Time for a digital detox!';
    impactText.style.color = '#ef4444';
  }
}

/**
 * Main calculation handler
 * @returns {void}
 */
function handleCalculate() {
  // Get input elements
  const browsingEl = document.getElementById('browsing');
  const streamingEl = document.getElementById('streaming');
  const messagingEl = document.getElementById('messaging');
  const postsEl = document.getElementById('posts');
  const gamingEl = document.getElementById('gaming');
  
  if (!browsingEl || !streamingEl || !messagingEl || !postsEl || !gamingEl) {
    console.error('Input elements not found');
    return;
  }
  
  // Get values and calculate
  const browsing = safeNum(browsingEl.value);
  const streaming = safeNum(streamingEl.value);
  const messaging = safeNum(messagingEl.value);
  const posts = safeNum(postsEl.value);
  const gaming = safeNum(gamingEl.value);
  
  // Calculate footprint score
  const score = calculateFootprint(browsing, streaming, messaging, posts, gaming);
  
  // Update display
  updateScoreDisplay(score);
}

/**
 * Initialize event listeners when DOM is ready
 * @returns {void}
 */
function initCalculator() {
  const calculateBtn = document.getElementById('calculateBtn');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', handleCalculate);
    
    // Also calculate on Enter key in input fields
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          handleCalculate();
        }
      });
    });
    
    // Calculate with default values on load
    setTimeout(() => {
      handleCalculate();
    }, 500);
  } else {
    console.warn('Calculate button not found. Calculator not initialized.');
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalculator);
} else {
  initCalculator();
}