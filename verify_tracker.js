const fs = require('fs');
const path = require('path');

const projectRoot = 'c:/Users/risha/OneDrive/Documents/GitHub/100-Days-Of-Web-Development-ECWoC26';

function checkFile(filePath, contentChecks = []) {
    const fullPath = path.join(projectRoot, filePath);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ File not found: ${filePath}`);
        return false;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    let allChecksPassed = true;

    contentChecks.forEach(check => {
        if (!content.includes(check)) {
            console.error(`❌ Content missing in ${filePath}: "${check}"`);
            allChecksPassed = false;
        }
    });

    if (allChecksPassed) {
        console.log(`✅ Verified ${filePath}`);
    }
    return allChecksPassed;
}

console.log("Starting verification...");

let success = true;

// 1. Check tracker.css
success &= checkFile('website/styles/tracker.css', [
    '.project-card.completed',
    '.tracker-btn'
]);

// 2. Check tracker.js
success &= checkFile('website/scripts/components/tracker.js', [
    'export function getCompletedDays()',
    'export function toggleDay(day)',
    'localStorage.setItem'
]);

// 3. Check index.html
success &= checkFile('index.html', [
    '<link rel="stylesheet" href="website/styles/tracker.css"',
    'id="progress-summary"',
    'id="progress-count"'
]);

// 4. Check landing-projects.js
success &= checkFile('website/scripts/pages/landing-projects.js', [
    "import { isDayCompleted, toggleDay, updateProgressUI } from '../components/tracker.js'",
    'isDayCompleted(project.day)',
    'const trackerBtn = card.querySelector(\'.tracker-btn\')'
]);

if (success) {
    console.log("🎉 All automated checks passed!");
} else {
    console.error("❌ Some checks failed.");
    process.exit(1);
}
