        // DOM elements
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const lightBtn = document.getElementById('lightBtn');
        const darkBtn = document.getElementById('darkBtn');
        const starsContainer = document.getElementById('starsContainer');
        const toggleCountElement = document.getElementById('toggleCount');
        const lightModeTimeElement = document.getElementById('lightModeTime');
        const darkModeTimeElement = document.getElementById('darkModeTime');
        
        // Initialize variables
        let toggleCount = 0;
        let isDarkMode = false;
        
        // Create stars for the dark theme
        function createStars() {
            starsContainer.innerHTML = '';
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                // Random position
                const x = Math.random() * 100;
                const y = Math.random() * 70; // Only in the top 70% of the container
                
                // Random size
                const size = Math.random() * 3 + 1;
                
                // Set star properties
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                // Random opacity for twinkling effect
                const opacity = Math.random() * 0.7 + 0.3;
                star.style.opacity = opacity;
                
                starsContainer.appendChild(star);
            }
        }
        
        // Update time display based on current time
        function updateTimeDisplay() {
            const now = new Date();
            const hours = now.getHours();
            
            // Calculate daylight and night hours based on current time
            // This is a simplified calculation for demonstration
            const daylightHours = hours >= 6 && hours < 18 ? 12 : 
                                 hours < 6 ? 18 - hours : 
                                 hours - 6;
            const nightHours = 24 - daylightHours;
            
            lightModeTimeElement.textContent = `${daylightHours}h`;
            darkModeTimeElement.textContent = `${nightHours}h`;
        }
        
        // Toggle theme function
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                themeToggle.classList.remove('light');
                themeToggle.classList.add('dark');
                document.querySelectorAll('.toggle-label')[0].textContent = 'Light';
                document.querySelectorAll('.toggle-label')[1].textContent = 'Dark';
            } else {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                themeToggle.classList.remove('dark');
                themeToggle.classList.add('light');
                document.querySelectorAll('.toggle-label')[0].textContent = 'Light';
                document.querySelectorAll('.toggle-label')[1].textContent = 'Dark';
            }
            
            // Update toggle count
            toggleCount++;
            toggleCountElement.textContent = toggleCount;
            
            // Update time display
            updateTimeDisplay();
        }
        
        // Set theme function (for direct buttons)
        function setTheme(isDark) {
            // Only toggle if changing to a different theme
            if (isDark !== isDarkMode) {
                toggleTheme();
            }
        }
        
        // Initialize the page
        function init() {
            // Create stars for dark mode
            createStars();
            
            // Update time display
            updateTimeDisplay();
            
            // Set initial toggle count
            toggleCountElement.textContent = toggleCount;
            
            // Add event listeners
            themeToggle.addEventListener('click', toggleTheme);
            lightBtn.addEventListener('click', () => setTheme(false));
            darkBtn.addEventListener('click', () => setTheme(true));
            
            // Add some interactivity to the buildings
            const buildings = document.querySelectorAll('.building');
            buildings.forEach(building => {
                building.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                });
                
                building.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
            
            // Add twinkling effect to stars
            setInterval(() => {
                if (isDarkMode) {
                    const stars = document.querySelectorAll('.star');
                    stars.forEach(star => {
                        // Randomly change opacity for some stars
                        if (Math.random() > 0.7) {
                            const newOpacity = Math.random() * 0.7 + 0.3;
                            star.style.opacity = newOpacity;
                        }
                    });
                }
            }, 1000);
        }
        
        // Initialize when page loads
        window.addEventListener('DOMContentLoaded', init);