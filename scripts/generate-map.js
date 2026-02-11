/**
 * Project Metadata Generator
 * 
 * Scans the public/ directory for project folders and generates
 * assets/data/projects.json for dynamic frontend rendering.
 * 
 * Usage: node scripts/generate-map.js
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_FILE = path.join(__dirname, '..', 'assets', 'data', 'projects.json');
const EXISTING_DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

// Regex patterns to match project folders
const DAY_PATTERNS = [
    /^Day\s*(\d+)/i,           // "Day 01", "Day 1", "Day01"
    /^Day-(\d+)/i,             // "Day-175"
    /^Day_(\d+)/i,             // "Day_1"
];

/**
 * Extract day number from folder name
 */
function extractDayNumber(folderName) {
    for (const pattern of DAY_PATTERNS) {
        const match = folderName.match(pattern);
        if (match) {
            return parseInt(match[1], 10);
        }
    }
    return null;
}

/**
 * Determine difficulty level based on day number
 */
function getDifficultyLevel(day) {
    if (day <= 30) return 'BEGINNER';
    if (day <= 60) return 'INTERMEDIATE';
    if (day <= 90) return 'ADVANCED';
    return 'CAPSTONE';
}

/**
 * Generate title from folder name
 */
function generateTitle(folderName, day) {
    // Remove "Day XX" prefix and clean up
    let title = folderName
        .replace(/^Day[\s_-]*\d+[\s_-]*/i, '')
        .replace(/[-_]/g, ' ')
        .trim();

    if (!title) {
        title = `Project Day ${day}`;
    }

    // Title case
    return title.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Check if folder has an index.html file
 */
function hasIndexFile(folderPath) {
    return fs.existsSync(path.join(folderPath, 'index.html'));
}

/**
 * Load existing project metadata for enrichment
 */
function loadExistingMetadata() {
    try {
        if (fs.existsSync(EXISTING_DATA_FILE)) {
            const data = JSON.parse(fs.readFileSync(EXISTING_DATA_FILE, 'utf8'));
            const map = new Map();
            data.forEach(project => {
                map.set(project.day, project);
            });
            return map;
        }
    } catch (error) {
        console.warn('Warning: Could not load existing metadata:', error.message);
    }
    return new Map();
}

/**
 * Scan public directory and generate projects array
 */
function scanProjects() {
    const existingMetadata = loadExistingMetadata();
    const projects = [];
    const seenDays = new Set();

    if (!fs.existsSync(PUBLIC_DIR)) {
        console.error('Error: public/ directory not found');
        process.exit(1);
    }

    const folders = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .sort(); // Sort for consistent ordering

    for (const folderName of folders) {
        const dayNumber = extractDayNumber(folderName);

        if (dayNumber === null) {
            // Skip non-day folders (tools, apps, etc.)
            continue;
        }

        // Skip duplicate day entries (keep first alphabetically sorted occurrence)
        if (seenDays.has(dayNumber)) {
            console.log(`  Skipping duplicate: ${folderName} (Day ${dayNumber} already exists)`);
            continue;
        }
        seenDays.add(dayNumber);

        const folderPath = path.join(PUBLIC_DIR, folderName);
        const hasIndex = hasIndexFile(folderPath);

        // Try to get existing metadata
        const existing = existingMetadata.get(dayNumber);

        const project = {
            day: dayNumber,
            folder: folderName,
            title: existing?.title || generateTitle(folderName, dayNumber),
            tech: existing?.tech || ['HTML', 'CSS', 'JS'],
            level: existing?.level || getDifficultyLevel(dayNumber),
            hasIndex: hasIndex
        };

        projects.push(project);
    }

    // Sort by day number
    projects.sort((a, b) => a.day - b.day);

    return projects;
}

/**
 * Main execution
 */
function main() {
    console.log('🔍 Scanning public/ directory for projects...');

    const projects = scanProjects();

    console.log(`✅ Found ${projects.length} project folders`);

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));

    console.log(`📁 Generated: ${OUTPUT_FILE}`);
    console.log('');
    console.log('Sample output:');
    console.log(JSON.stringify(projects.slice(0, 3), null, 2));
}

main();
