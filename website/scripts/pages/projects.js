const REPO_URL = "https://github.com/Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26/tree/main/public";

// Import components
import { projectModal } from '../components/ProjectModal.js';
import { App } from '../core/app.js';
import { Notify } from '../core/Notify.js';

// Map of existing folders found in public/ to handle inconsistencies
const folderMap = {
    1: "Day 01", 2: "Day 02", 3: "Day 03", 4: "Day 04", 5: "Day 05",
    6: "Day 06", 7: "Day 07", 8: "Day 08", 9: "Day 09", 10: "Day 10",
    11: "Day 11", 12: "Day 12", 13: "Day 13", 14: "Day 14", 15: "Day 15",
    16: "Day 16", 17: "Day 17", 18: "Day 18", 19: "Day 19", 20: "Day 20",
    21: "Day 21", 22: "Day 22", 23: "Day 23", 24: "Day 24", 25: "Day 25",
    26: "Day 26", 27: "Day 27", 28: "Day 28", 29: "Day 29", 30: "Day 30",
    31: "Day 31", 32: "Day 32", 33: "Day 33", 34: "Day 34", 35: "Day 35",
    36: "Day 36", 37: "Day 37", 38: "Day 38", 39: "Day 39", 40: "Day 40",
    41: "Day 41", 42: "Day 42", 43: "Day 43", 44: "Day 44", 45: "Day 45",
    46: "Day 46", 47: "Day 47", 48: "Day 48", 49: "Day 49", 50: "Day 50",
    51: "Day 51", 52: "Day 52", 53: "Day 53", 54: "Day 54", 55: "Day 55",
    56: "Day 56", 57: "Day 57", 58: "Day 58", 59: "Day 59", 60: "Day 60",
    61: "Day 61", 62: "Day 62", 63: "Day 63", 64: "Day 64", 65: "Day 65",
    66: "Day 66", 67: "Day 67", 68: "Day 68", 69: "Day 69", 70: "Day 70",
    71: "Day 71", 72: "Day 72", 73: "Day 73", 74: "Day 74", 75: "Day 75",
    76: "Day 76", 77: "Day 77", 78: "Day 78", 79: "Day 79", 80: "Day 80",
    81: "Day 81", 82: "Day 82", 83: "Day 83", 84: "Day 84", 85: "Day 85",
    87: "Day 87", 88: "Day 88", 89: "Day 89", 90: "Day 90",
    91: "Day 91", 92: "Day 92", 93: "Day 93", 94: "Day 94", 95: "Day 95",
    96: "Day 96", 97: "Day 97", 98: "Day 98", 99: "Day 99", 100: "Day100", 101: "Day 101",
    102: "Day 102", 103: "Day 103", 105: "Day 105", 107: "Day 107", 111: "day-111",
    129: "Day 129",
    141: "Day 141",
    145: "Day 145",
    151: "Day 151",
    152: "Day 152 - Newsly",
    154: "Day 154 ",
    155: "Day 155", 156: "Day 156", 167: "Day 167"
};

// Full 100-Day Project List
const allProjects = [
    // BEGINNER (Days 1-30)
    { day: 1, title: "Personal Portfolio", tech: ["HTML", "CSS", "JS"] }, { day: 2, title: "Responsive Landing Page", tech: ["HTML", "CSS"] }, { day: 3, title: "Todo List", tech: ["HTML", "CSS", "JS"] },
    { day: 4, title: "Weather App", tech: ["HTML", "CSS", "JS", "API"] }, { day: 5, title: "Calculator", tech: ["HTML", "CSS", "JS"] }, { day: 6, title: "Quiz App", tech: ["HTML", "CSS", "JS"] },
    { day: 7, title: "Expense Tracker", tech: ["HTML", "CSS", "JS"] }, { day: 8, title: "Pomodoro Timer", tech: ["HTML", "CSS", "JS"] }, { day: 9, title: "Note Taking App", tech: ["HTML", "CSS", "JS", "Local Storage"] },
    { day: 10, title: "Recipe Book", tech: ["HTML", "CSS", "JS"] }, { day: 11, title: "Blog Website", tech: ["HTML", "CSS"] }, { day: 12, title: "Ecommerce Product Page", tech: ["HTML", "CSS", "JS"] },
    { day: 13, title: "Chat UI", tech: ["HTML", "CSS"] }, { day: 14, title: "Music Player", tech: ["HTML", "CSS", "JS"] }, { day: 15, title: "Drawing App", tech: ["HTML", "CSS", "JS", "Canvas"] },
    { day: 16, title: "Password Generator", tech: ["HTML", "CSS", "JS"] }, { day: 17, title: "Unit Converter", tech: ["HTML", "CSS", "JS"] }, { day: 18, title: "Countdown Timer", tech: ["HTML", "CSS", "JS"] },
    { day: 19, title: "Tip Calculator", tech: ["HTML", "CSS", "JS"] }, { day: 20, title: "QR Code Generator", tech: ["HTML", "CSS", "JS", "API"] }, { day: 21, title: "Flashcards App", tech: ["HTML", "CSS", "JS"] },
    { day: 22, title: "Markdown Previewer", tech: ["HTML", "CSS", "JS"] }, { day: 23, title: "Currency Converter", tech: ["HTML", "CSS", "JS", "API"] }, { day: 24, title: "BMI Calculator", tech: ["HTML", "CSS", "JS"] },
    { day: 25, title: "Random Quote Generator", tech: ["HTML", "CSS", "JS", "API"] }, { day: 26, title: "Image Gallery", tech: ["HTML", "CSS", "JS"] }, { day: 27, title: "Dice Roller", tech: ["HTML", "CSS", "JS"] },
    { day: 28, title: "Rock Paper Scissors", tech: ["HTML", "CSS", "JS"] }, { day: 29, title: "Memory Game", tech: ["HTML", "CSS", "JS"] }, { day: 30, title: "Tic Tac Toe", tech: ["HTML", "CSS", "JS"] },

    // INTERMEDIATE (Days 31-60)
    { day: 31, title: "Job Board", tech: ["HTML", "CSS", "JS"] }, { day: 32, title: "Social Media Dashboard", tech: ["HTML", "CSS", "JS"] }, { day: 33, title: "Real Estate Website", tech: ["HTML", "CSS", "JS"] },
    { day: 34, title: "Hotel Booking System", tech: ["HTML", "CSS", "JS"] }, { day: 35, title: "Food Delivery App", tech: ["HTML", "CSS", "JS"] }, { day: 36, title: "Fitness Tracker", tech: ["HTML", "CSS", "JS"] },
    { day: 37, title: "Event Management", tech: ["HTML", "CSS", "JS"] }, { day: 38, title: "Booking Appointment System", tech: ["HTML", "CSS", "JS"] }, { day: 39, title: "Online Learning Platform", tech: ["HTML", "CSS", "JS"] },
    { day: 40, title: "Movie Database", tech: ["HTML", "CSS", "JS", "API"] }, { day: 41, title: "Github Profile Finder", tech: ["HTML", "CSS", "JS", "API"] }, { day: 42, title: "Stock Market Tracker", tech: ["HTML", "CSS", "JS", "API"] },
    { day: 43, title: "News Aggregator", tech: ["HTML", "CSS", "JS", "API"] }, { day: 44, title: "Chat Application", tech: ["HTML", "CSS", "JS", "Firebase"] }, { day: 45, title: "Project Management Tool", tech: ["HTML", "CSS", "JS"] },
    { day: 46, title: "Ecommerce Cart", tech: ["HTML", "CSS", "JS"] }, { day: 47, title: "Banking Dashboard", tech: ["HTML", "CSS", "JS"] }, { day: 48, title: "Flight Booking System", tech: ["HTML", "CSS", "JS"] },
    { day: 49, title: "Recipe Sharing Platform", tech: ["HTML", "CSS", "JS"] }, { day: 50, title: "Blog with CMS", tech: ["HTML", "CSS", "JS", "Node.js"] }, { day: 51, title: "Portfolio with Blog", tech: ["HTML", "CSS", "JS"] },
    { day: 52, title: "Task Management Board", tech: ["HTML", "CSS", "JS"] }, { day: 53, title: "File Uploader", tech: ["HTML", "CSS", "JS"] }, { day: 54, title: "Code Editor", tech: ["HTML", "CSS", "JS"] },
    { day: 55, title: "Voice Notes App", tech: ["HTML", "CSS", "JS", "Web Speech API"] }, { day: 56, title: "Expense Splitter", tech: ["HTML", "CSS", "JS"] }, { day: 57, title: "Habit Tracker", tech: ["HTML", "CSS", "JS"] },
    { day: 58, title: "Budget Planner", tech: ["HTML", "CSS", "JS"] }, { day: 59, title: "Meal Planner", tech: ["HTML", "CSS", "JS"] }, { day: 60, title: "Travel Planner", tech: ["HTML", "CSS", "JS"] },

    // ADVANCED (Days 61-90)
    { day: 61, title: "Fullstack Ecommerce", tech: ["React", "Node.js", "MongoDB"] }, { day: 62, title: "GitHub Profile Stats Dashboard", tech: ["HTML", "CSS", "JS", "API"] }, { day: 63, title: "Video Conferencing", tech: ["WebRTC", "JS"] },
    { day: 64, title: "Online Code Editor", tech: ["HTML", "CSS", "JS"] }, { day: 65, title: "Real Time Collaboration", tech: ["Socket.io", "JS"] }, { day: 66, title: "Stock Trading Simulator", tech: ["HTML", "CSS", "JS", "API"] },
    { day: 67, title: "Multiplayer Game", tech: ["Canvas", "Socket.io", "JS"] }, { day: 68, title: "AI Chatbot", tech: ["OpenAI API", "JS"] }, { day: 69, title: "Open-Source E-Commerce Template", tech: ["HTML", "CSS", "JS"] },
    { day: 70, title: "Data Visualization Dashboard", tech: ["D3.js", "JS"] }, { day: 71, title: "Open-Source Portfolio Template", tech: ["HTML", "CSS"] }, { day: 72, title: "IoT Dashboard", tech: ["MQTT", "JS"] },
    { day: 73, title: "Machine Learning UI", tech: ["TensorFlow.js", "JS"] }, { day: 74, title: "Voice Assistant", tech: ["JS", "Web Speech API"] }, { day: 75, title: "AR Web App", tech: ["Three.js", "WebXR"] },
    { day: 76, title: "PWA News App", tech: ["PWA", "JS"] }, { day: 77, title: "Real Time Analytics", tech: ["Socket.io", "D3.js"] }, { day: 78, title: "Open-Source Learning Games", tech: ["HTML", "CSS", "JS"] },
    { day: 79, title: "Job Application Platform ", tech: ["React", "Node.js"] }, { day: 80, title: "Project Management SaaS", tech: ["React", "Firebase"] }, { day: 81, title: "Healthcare Portal", tech: ["Next.js", "Tailwind"] },
    { day: 82, title: "E-learning Platform", tech: ["Next.js", "PostgreSQL"] }, { day: 83, title: "Open-Source “AI Tools / Bots Directory", tech: ["Next.js", "AI API"] },
    { day: 84, title: "Real Time Chat Support", tech: ["Socket.io", "Node.js"] }, { day: 85, title: "Open-Source UI Component Library", tech: ["React", "CSS"] },
    { day: 86, title: "Uber Eats-Like Campus Food Delivery System", tech: ["React Native", "Firebase"] }, { day: 87, title: "AI-Powered Personal Assistant", tech: ["OpenAI", "Node.js"] },
    { day: 88, title: "Video Streaming", tech: ["HLS.js", "Node.js"] }, { day: 89, title: "Smart Home Dashboard", tech: ["React", "IoT"] }, { day: 90, title: "Enterprise CRM", tech: ["Next.js", "Prisma"] },

    // CAPSTONE (Days 91-100)
    { day: 91, title: "Leetcode Clone ", tech: ["Next.js", "Docker", "Go"] }, { day: 92, title: "Hackathon Registration Website", tech: ["Next.js", "PostgreSQL"] },
    { day: 93, title: "Open Source Contribution", tech: ["Git", "GitHub"] }, { day: 94, title: "Progressive Web App", tech: ["PWA", "Service Workers"] },
    { day: 95, title: "Fullstack Application", tech: ["MERN Stack"] }, { day: 96, title: "AI-Powered App", tech: ["LangChain", "OpenAI"] },
    { day: 97, title: "Open-Source “Smart Community Hub”", tech: ["Next.js", "Supabase"] }, { day: 98, title: "Smart Campus Platform", tech: ["Next.js", "PostgreSQL"] },
    { day: 99, title: "Music App using Next.js", tech: ["Next.js", "Spotify API"] }, { day: 100, title: "Survival Protocol", tech: ["Next.js", "TypeScript"] },

    //Extended Capstone Projects (Day 101-150) medium level HTML, CSS, JAVASCRIPT , TYPESCRIPT ,  FOR ECWoC26 Extended Program
    { day: 101, title: "Canvas Image Particle Animation", folder: "Day 101", level: "Intedmediate", tech: ["HTML", "CSS", "JS", "HTML Canvas"] }, { day: 102, title: "Interactive Storytelling Website", tech: ["HTML", "CSS", "JS"] },
    { day: 103, title: "Readme Tool Kit", tech: ["HTML", "CSS", "JS"] }, { day: 104, title: "3D Model Viewer", tech: ["Three.js", "JS"] },
    { day: 105, title: "Advanced Form Builder", tech: ["HTML", "CSS", "JS"] }, { day: 106, title: "Smart Campus Life Dashboard", tech: ["D3.js", "JS"] },
    { day: 107, title: "Solar System", tech: ["Socket.io", "JS"] }, { day: 108, title: "AI-Powered Image Editor", tech: ["TensorFlow.js", "JS"] },
    { day: 109, title: "Custom CMS", tech: ["Node.js", "Express", "MongoDB"] }, { day: 110, title: "Advanced E-commerce Platform", tech: ["React", "Node.js", "MongoDB"] },
    { day: 111, title: "Social Networking Site", tech: ["React", "Firebase"] }, { day: 112, title: "Online Learning Management System", tech: ["Next.js", "PostgreSQL"] },
    { day: 113, title: "AI-Powered Content Generator", tech: ["OpenAI API", "Node.js"] }, { day: 114, title: "Blockchain Explorer", tech: ["React", "Web3.js"] },
    { day: 115, title: "Decentralized Application (DApp)", tech: ["Solidity", "Ethereum"] }, { day: 116, title: "Advanced PWA", tech: ["PWA", "Service Workers"] },
    { day: 117, title: "Real-Time Analytics Platform", tech: ["Socket.io", "D3.js"] }, { day: 118, title: "AI-Powered Personal Finance Manager", tech: ["Python", "Flask"] },
    { day: 119, title: "Custom Video Conferencing Tool", tech: ["WebRTC", "JS"] }, { day: 120, title: "Advanced Task Management System", tech: ["React", "Node.js"] },
    { day: 121, title: "AI-Powered Resume Builder", tech: ["OpenAI API", "JS"] }, { day: 122, title: "Smart Contract Development", tech: ["Solidity", "Truffle"] },
    { day: 123, title: "Advanced Blogging Platform", tech: ["Next.js", "GraphQL"] }, { day: 124, title: "AI-Powered Chat Application", tech: ["OpenAI API", "Socket.io"] },
    { day: 125, title: "Sustainable Development Platform", tech: ["React", "Firebase"] }, { day: 126, title: "AI-Powered Code Review Tool", tech: ["OpenAI API", "Node.js"] },
    { day: 127, title: "Advanced Social Media Platform", tech: ["React", "Node.js"] }, { day: 128, title: "AI-Powered Image Recognition App", tech: ["TensorFlow.js", "JS"] },
    { day: 129, title: "Ultimate Kanban Board", tech: ["HTML", "CSS", "JS"] }, { day: 130, title: "AI-Powered Language Translation App", tech: ["OpenAI API", "JS"] },
    { day: 131, title: "Advanced CRM System", tech: ["Next.js", "Prisma"] }, { day: 132, title: "AI-Powered Virtual Assistant", tech: ["OpenAI API", "Node.js"] },
    { day: 133, title: "Custom Inventory Management System", tech: ["React", "Node.js"] }, { day: 134, title: "AI-Powered Sentiment Analysis Tool", tech: ["Python", "Flask"] },
    { day: 135, title: "Advanced Event Management Platform", tech: ["Next.js", "PostgreSQL"] }, { day: 136, title: "AI-Powered Content Moderation Tool", tech: ["OpenAI API", "Node.js"] },
    { day: 137, title: "Custom Helpdesk Ticketing System", tech: ["React", "Node.js"] }, { day: 138, title: "AI-Powered Market Research Tool", tech: ["Python", "Django"] },
    { day: 139, title: "Advanced Learning Management System", tech: ["Next.js", "PostgreSQL"] }, { day: 140, title: "AI-Powered Email Marketing Tool", tech: ["OpenAI API", "Node.js"] },
    { day: 141, title: "TimeFlow - Premium Time Tracking", tech: ["HTML", "CSS", "JS", "ApexCharts"] }, { day: 142, title: "AI-Powered SEO Optimization Tool", tech: ["Python", "Flask"] },
    { day: 143, title: "Advanced Recruitment Platform", tech: ["Next.js", "PostgreSQL"] }, { day: 144, title: "AI-Powered Social Media Management Tool", tech: ["OpenAI API", "Node.js"] },
    { day: 145, title: "Chess Game", tech: ["React", "Node.js"] }, { day: 146, title: "AI-Powered Customer Support Chatbot", tech: ["OpenAI API", "JS"] },
    { day: 147, title: "Advanced Financial Planning Tool", tech: ["Next.js", "Prisma"] }, { day: 148, title: "AI-Powered Document Summarization Tool", tech: ["OpenAI API", "Node.js"] },
    { day: 149, title: "Custom Knowledge Base System", tech: ["React", "Node.js"] }, { day: 150, title: "AI-Powered Video Analysis Tool", tech: ["Python", "Django"] },
    // DAY 151
    { day: 151, title: "Mini Geo Guesser", tech: ["HTML", "CSS", "JS"] },
    // DAY 152
    { day: 152, title: "Newsly", tech: ["HTML", "CSS", "JS"] },
    // DAY 154
    { day: 154, title: "Snake Game", tech: ["HTML", "CSS", "JS"] },
    { day: 152, title: "Newsly", tech: ["HTML", "CSS", "JS"] },
    { day: 155, title: "Tetris Game", tech: ["HTML", "CSS", "JS"] },
    { day: 167, title: "Time Fracture Arena", tech: ["HTML", "CSS", "JS", "Canvas"] }
];

function getDifficulty(day) {
    if (day <= 30) return "BEGINNER";
    if (day <= 60) return "INTERMEDIATE";
    if (day <= 90) return "ADVANCED";
    return "CAPSTONE";
}

function renderProjects(filter = 'All') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    let delay = 0;

    allProjects.forEach(project => {
        const difficulty = getDifficulty(project.day);

        if (filter !== 'All' && difficulty.toLowerCase() !== filter.toLowerCase()) return;

        let folderName = folderMap[project.day];
        let liveLink = '#';
        let codeLink = '#';
        let isDisabled = false;

        /* SPECIAL CASE: README TOOL KIT (DAY 103) */
        if (project.day === 103) {
            liveLink = 'https://100dayswebdevelopment-ecwoc.netlify.app/public/Day%20103/index.html';
            codeLink = `${REPO_URL}/${folderName}`;
            isDisabled = false;
        }
        else if (project.day === 111) {
            liveLink = `../../public/${folderName}/build/index.html`
            codeLink = `${REPO_URL}/${folderName}`;
            isDisabled = false;
        }
        else if (folderName) {
            liveLink = `../../public/${folderName}/index.html`;
            codeLink = `${REPO_URL}/${folderName}`;
        }
        else {
            isDisabled = true;
            codeLink = REPO_URL;
        }


        const dayLabel = project.endDay ? `DAYS ${project.day}-${project.endDay}` : `DAY ${project.day}`;

        const card = document.createElement('div');
        card.className = 'card project-card animate-enter';
        card.style.animationDelay = `${Math.min(delay, 1000)}ms`;
        delay += 30;

        const techIconMap = {
            HTML: 'fa-html5',
            CSS: 'fa-css3-alt',
            JS: 'fa-js',
            'Node.js': 'fa-node',
            React: 'fa-react',
            API: 'fa-plug'
        };

        const techTags = project.tech
            ? project.tech.map(t => `
        <span class="tech-tag">
            <i class="fa-brands ${techIconMap[t] || 'fa-code'}"></i>
            ${t}
        </span>
      `).join('')
            : '';


        card.innerHTML = `
            <div class="card-top">
                <span class="text-flame" style="font-size: var(--text-xs); font-weight: bold; letter-spacing: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; max-width: calc(100% - 40px);">
                    ${difficulty} • ${dayLabel}
                </span>
                <button class="code-chip" type="button" aria-label="View Code" title="View Code">&lt;/&gt;</button>
            </div>
            <div class="card-divider"></div>
            <h3 class="project-title" style="font-size: var(--text-lg); margin-bottom: 0.5rem; line-height: 1.3;">
                ${project.title}
            </h3>
            <div class="tech-stack" style="margin-bottom: 0.5rem;">
                ${techTags}
            </div>
            ${isDisabled ? `<div class="card-hint muted">Pending</div>` : ''}
        `;

        const codeChip = card.querySelector('.code-chip');
        codeChip.onclick = (e) => {
            e.stopPropagation();
            window.open(codeLink, '_blank');
        };

        // --- PROJECT SHOWCASE INTEGRATION ---
        if (!isDisabled) {
            card.addEventListener('click', (e) => {
                // Prepare project data for modal
                const projectData = {
                    ...project,
                    difficulty,
                    liveLink,
                    codeLink,
                    time: project.day <= 30 ? '1-2 hours' : project.day <= 60 ? '3-5 hours' : '8+ hours'
                };

                projectModal.show(projectData);
            });
        } else {
            card.classList.add('is-disabled');
        }
        // --- END INTEGRATION ---

        setupTiltEffect(card);
        grid.appendChild(card);
    });
}

// Ensure the path to 404.html is correct relative to your current folder
async function handleProjectClick(event, url) {
    event.preventDefault();

    try {
        // Use 'no-cache' to ensure the browser doesn't give a fake "OK" 
        const response = await fetch(url, { method: 'HEAD', cache: 'no-cache' });

        if (response.ok) {
            window.open(url, '_blank', 'noopener,noreferrer');
        } else {
            // If the folder isn't there, redirect to your mission recovery page
            window.location.href = './404.html';
        }
    } catch (error) {
        // This catches the "Cannot GET" scenario (network/file not found)
        window.location.href = './404.html';
    }
}
/**
 * Applies a 3D Tilt effect based on cursor position.
 * Uses CSS variables --rx and --ry to control rotation.
 */
function setupTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate percentage (0 to 1)
        const xPct = x / rect.width;
        const yPct = y / rect.height;

        // Calculate rotation (Max tilt: 10deg)
        // Y-axis rotation is based on X position (left/right)
        // X-axis rotation is based on Y position (up/down) - Reversed for natural feel
        const rotateY = (xPct - 0.5) * 12;
        const rotateX = (0.5 - yPct) * 12;

        card.style.setProperty('--rx', `${rotateX}deg`);
        card.style.setProperty('--ry', `${rotateY}deg`);
        card.style.setProperty('--tx', `${(xPct - 0.5) * 5}px`); // Subtle translation
        card.style.setProperty('--ty', `${(yPct - 0.5) * 5}px`);
    });

    card.addEventListener('mouseleave', () => {
        // Reset to center
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--tx', '0px');
        card.style.setProperty('--ty', '0px');
    });
}

// Search Functionality
document.getElementById('projectSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Tab Filtering
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.dataset.category);
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Small timeout to ensure styles load
    setTimeout(() => renderProjects(), 50);
});

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
