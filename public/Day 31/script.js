const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "ABC Tech",
        location: "Remote",
        type: "Full Time",
        salary: 90000,
        salaryDisplay: "$80,000 - $100,000",
        experience: "2-4 years",
        experienceLevel: 3,
        description: "We are looking for a skilled Frontend Developer to join our team.",
        posted: "2025-01-15",
        postedDisplay: "2 days ago",
        tags: ["React", "JavaScript", "CSS"]
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "CodeBase",
        location: "Bangalore",
        type: "Internship",
        salary: 35000,
        salaryDisplay: "$30,000 - $40,000",
        experience: "0-1 years",
        experienceLevel: 1,
        description: "Exciting internship opportunity for backend development.",
        posted: "2025-01-1",
        postedDisplay: "1 week ago",
        tags: ["Node.js", "Python", "MongoDB"]
    },
    {
        id: 3,
        title: "UI/UX Designer",
        company: "DesignPro",
        location: "Hyderabad",
        type: "Full Time",
        salary: 80000,
        salaryDisplay: "$70,000 - $90,000",
        experience: "3-5 years",
        experienceLevel: 4,
        description: "Creative UI/UX designer needed for innovative projects.",
        posted: "2025-01-14",
        postedDisplay: "3 days ago",
        tags: ["Figma", "Sketch", "Adobe XD"]
    },
    {
        id: 4,
        title: "Java Developer",
        company: "TechSoft",
        location: "Chennai",
        type: "Internship",
        salary: 30000,
        salaryDisplay: "$25,000 - $35,000",
        experience: "0-2 years",
        experienceLevel: 1,
        description: "Java development internship with mentoring.",
        posted: "2025-01-12",
        postedDisplay: "5 days ago",
        tags: ["Java", "Spring", "SQL"]
    },
    {
        id: 5,
        title: "DevOps Engineer",
        company: "CloudTech",
        location: "Remote",
        type: "Full Time",
        salary: 105000,
        salaryDisplay: "$90,000 - $120,000",
        experience: "3-6 years",
        experienceLevel: 5,
        description: "DevOps engineer for cloud infrastructure.",
        posted: "2025-01-16",
        postedDisplay: "1 day ago",
        tags: ["AWS", "Docker", "Kubernetes"]
    },
    {
        id: 6,
        title: "Data Scientist",
        company: "DataCorp",
        location: "Mumbai",
        type: "Contract",
        salary: 120000,
        salaryDisplay: "$100,000 - $130,000",
        experience: "4-7 years",
        experienceLevel: 6,
        description: "Data scientist for machine learning projects.",
        posted: "2025-01-16",
        postedDisplay: "1 day ago",
        tags: ["Python", "TensorFlow", "SQL"]
    },
    {
        id: 7,
        title: "Product Manager",
        company: "InnovateCo",
        location: "Delhi",
        type: "Full Time",
        salary: 120000,
        salaryDisplay: "$110,000 - $140,000",
        experience: "5-8 years",
        experienceLevel: 5,
        description: "Lead product strategy and development for tech products.",
        posted: "2024-01-13",
        postedDisplay: "2 days ago",
        tags: ["Product Strategy", "Agile", "User Research", "Roadmapping"]
    },
    {
        id: 8,
        title: "Mobile Developer",
        company: "AppWorks",
        location: "Remote",
        type: "Full Time",
        salary: 95000,
        salaryDisplay: "$85,000 - $105,000",
        experience: "2-5 years",
        experienceLevel: 3,
        description: "Develop cross-platform mobile applications perfectly.",
        posted: "2024-01-11",
        postedDisplay: "4 days ago",
        tags: ["React Native", "iOS", "Android", "TypeScript", "Java"]
    },
    {
        id: 9,
        title: "Cyber Security Analyst",
        company: "SecureNet",
        location: "Bangalore",
        type: "Full Time",
        salary: 110000,
        salaryDisplay: "$95,000 - $125,000",
        experience: "3-6 years",
        experienceLevel: 4,
        description: "Protect systems and networks from security threats.",
        posted: "2024-01-09",
        postedDisplay: "6 days ago",
        tags: ["Security", "Networking", "Compliance", "SIEM"]
    },
    {
        id: 10,
        title: "Marketing Specialist",
        company: "GrowthHub",
        location: "Hyderabad",
        type: "Part Time",
        salary: 45000,
        salaryDisplay: "$40,000 - $50,000",
        experience: "1-3 years",
        experienceLevel: 2,
        description: "Digital marketing and content creation for tech products.",
        posted: "2024-01-07",
        postedDisplay: "1 week ago",
        tags: ["SEO", "Content", "Social Media", "Analytics"]
    },
    {
        id: 11,
        title: "Cloud Architect",
        company: "SkyTech",
        location: "Remote",
        type: "Full Time",
        salary: 135000,
        salaryDisplay: "$120,000 - $150,000",
        experience: "6-10 years",
        experienceLevel: 5,
        description: "Design and implement cloud infrastructure solutions.",
        posted: "2024-01-06",
        postedDisplay: "1 week ago",
        tags: ["AWS", "Azure", "Architecture", "DevOps"]
    },
    {
        id: 12,
        title: "QA Engineer",
        company: "QualityFirst",
        location: "Chennai",
        type: "Internship",
        salary: 28000,
        salaryDisplay: "$25,000 - $30,000",
        experience: "0-1 years",
        experienceLevel: 1,
        description: "Quality assurance and testing for software applications.",
        posted: "2024-01-04",
        postedDisplay: "2 weeks ago",
        tags: ["Testing", "Automation", "Selenium", "JIRA"]
    }
];

const jobsContainer = document.getElementById("jobsContainer");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const clearFiltersBtn = document.getElementById("clearFilters");
const resetSearchBtn = document.getElementById("resetSearch");
const jobsCount = document.getElementById("jobsCount");
const emptyState = document.getElementById("emptyState");
const viewSavedJobsBtn = document.getElementById("viewSavedJobs");
const toggleViewBtn = document.getElementById("toggleView");
const sortFilter = document.getElementById("sortFilter");
let currentSort = 'newest';

let currentView = 'grid';


document.addEventListener('DOMContentLoaded', () => {
    renderJobs(jobs);
    updateJobsCount(jobs.length);
    checkEmptyState();
});


function renderJobs(jobList) {
    jobsContainer.innerHTML = "";

    jobList.forEach((job) => {
        const isSaved = checkIfSaved(job.id);
        
        const jobCard = document.createElement("div");
        jobCard.className = "job-card";
        
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p class="company"><i class="fas fa-building"></i> ${job.company}</p>
            
            <div class="job-meta">
                <span class="job-tag"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span class="job-tag"><i class="fas fa-briefcase"></i> ${job.type}</span>
                <span class="job-tag"><i class="fas fa-money-bill-wave"></i> ${job.salaryDisplay}</span>
            </div>
            
            <p class="description">${job.description}</p>
            
            <div class="job-meta">
                <span class="job-tag"><i class="fas fa-clock"></i> ${job.postedDisplay}</span>
                <span class="job-tag"><i class="fas fa-user-graduate"></i> ${job.experience}</span>
            </div>
            
            <div class="tags">
                ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="job-actions">
                <button class="apply-btn">Apply Now</button>
                <button class="save-btn ${isSaved ? 'saved' : ''}" data-id="${job.id}">
                    <i class="fas ${isSaved ? 'fa-bookmark' : 'fa-bookmark'}"></i>
                    ${isSaved ? 'Saved' : 'Save Job'}
                </button>
            </div>
        `;
        
        jobsContainer.appendChild(jobCard);
    });
    
    attachEventListeners(jobList);
}

function sortJobs(jobList, sortBy) {
    const jobsCopy = [...jobList];
    
    switch(sortBy) {
        case 'newest':
            return jobsCopy.sort((a, b) => new Date(b.posted) - new Date(a.posted));
        
        case 'salary-high':
            return jobsCopy.sort((a, b) => b.salary - a.salary);
        
        case 'salary-low':
            return jobsCopy.sort((a, b) => a.salary - b.salary);
        
        case 'experience-low':
            return jobsCopy.sort((a, b) => a.experienceLevel - b.experienceLevel);
        
        case 'experience-high':
            return jobsCopy.sort((a, b) => b.experienceLevel - a.experienceLevel);
        
        case 'title-asc':
            return jobsCopy.sort((a, b) => a.title.localeCompare(b.title));
        
        case 'title-desc':
            return jobsCopy.sort((a, b) => b.title.localeCompare(a.title));
        
        default:
            return jobsCopy;
    }
}


function updateSortIndicator(sortValue) {
    const sortTextMap = {
        'newest': 'Newest First',
        'salary-high': 'Salary (High to Low)',
        'salary-low': 'Salary (Low to High)',
        'experience-low': 'Experience (Low to High)',
        'experience-high': 'Experience (High to Low)',
        'title-asc': 'Title (A-Z)',
        'title-desc': 'Title (Z-A)'
    };
    
    const indicator = document.getElementById('currentSort');
    if (indicator) {
        indicator.innerHTML = `<i class="fas fa-sort-amount-down"></i> Sorted by: ${sortTextMap[sortValue]}`;
    }
}


function applyFilters() {
    const searchText =  searchInput.value.toLowerCase();
    const selectedLocation = locationFilter.value;
    const selectedType = typeFilter.value;
    const selectedSort = sortFilter.value;

    let filteredJobs = jobs.filter(job => {
        const matchesSearch = 
            job.title.toLowerCase().includes(searchText) ||
            job.company.toLowerCase().includes(searchText)||
            job.description.toLowerCase().includes(searchText) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchText));

        const matchesLocation = 
            selectedLocation === "all" || job.location === selectedLocation;

        const matchesType = 
            selectedType === "all" || job.type === selectedType;

        return matchesSearch && matchesLocation && matchesType;
    });

    filteredJobs = sortJobs(filteredJobs, selectedSort);

    updateSortIndicator(selectedSort);

    renderJobs(filteredJobs);
    updateJobsCount(filteredJobs.length);
    checkEmptyState(filteredJobs.length);

    currentSort = selectedSort;
}


function updateJobsCount(count) {
    jobsCount.textContent = `${count} ${count === 1 ? 'job' : 'jobs'} found`;
}


function checkEmptyState(count) {
    if (count === 0 || jobsContainer.children.length === 0) {
        emptyState.style.display = 'block';
        jobsContainer.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        jobsContainer.style.display = currentView === 'grid' ? 'grid' : 'block';
    }
}


function clearFilters() {
    searchInput.value = '';
    locationFilter.value = 'all';
    typeFilter.value = 'all';
    sortFilter.value = 'newest';
    applyFilters();
}


function toggleView() {
    currentView = currentView === 'grid' ? 'list' : 'grid';
    toggleViewBtn.innerHTML = `<i class="fas fa-${currentView === 'grid' ? 'th' : 'list'}"></i> ${currentView === 'grid' ? 'Grid' : 'List'} View`;
    
    if (currentView === 'list') {
        jobsContainer.style.display = 'block';
        jobsContainer.style.gridTemplateColumns = '1fr';
    } else {
        jobsContainer.style.display = 'grid';
        jobsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    }
}


function getSavedJobs() {
    return JSON.parse(localStorage.getItem("savedJobs")) || [];
}


function checkIfSaved(jobId) {
    const savedJobs = getSavedJobs();
    return savedJobs.some(savedJob => savedJob.id === jobId);
}


function saveJob(jobId) {
    const savedJobs = getSavedJobs();
    const job = jobs.find(j => j.id === jobId);

    if(!job) return;

    const alreadySaved = savedJobs.some(
        savedJob => savedJob.id === jobId);

        if (!alreadySaved) {
            savedJobs.push(job);
            localStorage.setItem("savedJobs", JSON.stringify(savedJobs));

            const saveBtn = document.querySelector(`.save-btn[data-id="${jobId}"]`);
            if (saveBtn) {
                saveBtn.classList.add('saved');
                saveBtn.innerHTML = `<i class="fas fa-bookmark"></i> Saved`;
            }

            showNotification('Job saved successfully!', 'success');
        } else {
            const newSavedJobs = savedJobs.filter(savedJob => savedJob.id !== jobId);
            localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
        
        
            const saveBtn = document.querySelector(`.save-btn[data-id="${jobId}"]`);
        if (saveBtn) {
            saveBtn.classList.remove('saved');
            saveBtn.innerHTML = `<i class="far fa-bookmark"></i> Save Job`;
        }
        
        showNotification('Job removed from saved!', 'info');
        }
}


function viewSavedJobs() {
    const savedJobs = getSavedJobs();
    if (savedJobs.length > 0) {
        renderJobs(savedJobs);
        updateJobsCount(savedJobs.length);
        showNotification(`Showing ${savedJobs.length} saved jobs`, 'info');
    } else {
        showNotification('No saved jobs yet!', 'warning');
    }
}


function attachEventListeners(jobList) {
    const saveButtons = document.querySelectorAll(".save-btn");

    saveButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const jobId = parseInt(btn.getAttribute("data-id"));
            saveJob(jobId);
        });
    });

    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const jobCard = btn.closest('.job-card');
            const jobTitle = jobCard.querySelector('h3').textContent;
            showNotification(`Applying for: ${jobTitle}`, `success`);
        });
    });
}

function showNotification(message, type = 'info') {
    
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <i class="fas fa-times close-notification"></i>
    `;
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}


// Add this to your DOM elements
const themeToggle = document.getElementById('themeToggle');

// Theme management
function initTheme() {
    const savedTheme = localStorage.getItem('jobBoardTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jobBoardTheme', newTheme);
    updateThemeToggle(newTheme);
    
    // Add transition animation
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
}

function updateThemeToggle(theme) {
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('span');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        text.textContent = 'Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = 'Dark Mode';
    }
}

// Add smooth transition for theme change
const transitionStyles = document.createElement('style');
transitionStyles.textContent = `
    .theme-transition * {
        transition: background-color 0.3s ease, 
                    color 0.3s ease, 
                    border-color 0.3s ease,
                    box-shadow 0.3s ease !important;
    }
`;
document.head.appendChild(transitionStyles);

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    // ... your existing initialization code
});

// Add event listener
themeToggle.addEventListener('click', toggleTheme);


const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid var(--success-color);
    }
    
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification-warning {
        border-left: 4px solid var(--warning-color);
    }
    
    .close-notification {
        cursor: pointer;
        color: var(--text-light);
    }
    
    .close-notification:hover {
        color: var(--text-color);
    }
`;
document.head.appendChild(notificationStyles);


searchInput.addEventListener('keyup', applyFilters);
locationFilter.addEventListener('change', applyFilters);
typeFilter.addEventListener('change', applyFilters);
clearFiltersBtn.addEventListener('click', clearFilters);
resetSearchBtn.addEventListener('click', clearFilters);
viewSavedJobsBtn.addEventListener('click', viewSavedJobs);
toggleViewBtn.addEventListener('click', toggleView);
sortFilter.addEventListener('change', applyFilters);


renderJobs(jobs);

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
