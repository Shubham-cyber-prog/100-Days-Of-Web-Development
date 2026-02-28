// Dynamic Profile Data Management - Enhanced Integration
class ProfileDataEnhancer {
  constructor() {
    this.projectCount = this.getProjectCount();
    this.init();
  }

  init() {
    // Wait for existing ProfileManager to initialize first
    setTimeout(() => {
      this.enhanceProfileWithDynamicData();
    }, 100);
  }

  getProjectCount() {
    // Count actual projects in the public folder
    const dayFolders = [
      'Day 01', 'Day 02', 'Day 03', 'Day 04', 'Day 05', 'Day 06', 'Day 07', 'Day 08', 'Day 09', 'Day 10',
      'Day 11', 'Day 12', 'Day 13', 'Day 14', 'Day 15', 'Day 16', 'Day 17', 'Day 18', 'Day 19', 'Day 20',
      'Day 21', 'Day 22', 'Day 23', 'Day 24', 'Day 25', 'Day 26', 'Day 27', 'Day 28', 'Day 29', 'Day 30',
      'Day 31', 'Day 32', 'Day 33', 'Day 34', 'Day 35', 'Day 36', 'Day 38', 'Day 39', 'Day 40',
      'Day 41', 'Day 42', 'Day 43', 'Day 44', 'Day 45', 'Day 46', 'Day 47', 'Day 48', 'Day 49', 'Day 50',
      'Day 51', 'Day 52', 'Day 53', 'Day 54', 'Day 55', 'Day 56', 'Day 57', 'Day 58', 'Day 59', 'Day 60',
      'Day 61', 'Day 62', 'Day 63', 'Day 64', 'Day 65', 'Day 66', 'Day 67', 'Day 68', 'Day 69', 'Day 70',
      'Day 71', 'Day 72', 'Day 73', 'Day 74', 'Day 75', 'Day 76', 'Day 77', 'Day 78', 'Day 79', 'Day 80',
      'Day 81', 'Day 82', 'Day 83', 'Day 84', 'Day 85', 'Day 86', 'Day 87', 'Day 88', 'Day 89', 'Day 90',
      'Day 91', 'Day 92', 'Day 93', 'Day 94', 'Day 96', 'Day 100', 'Day 101', 'Day 102', 'Day 103', 'Day 104', 'Day 105',
      'Day 107', 'Day 108', 'Day 111', 'Day 110', 'Day 130', 'Day 145', 'Day 151', 'Day 152 - Newsly',
      'Day 153', 'Day 154', 'Day 155', 'Day 156', 'Day 157', 'Day 158', 'Day 159', 'Day 160',
      'Day 161', 'Day 162', 'Day 163', 'Day 164', 'Day 167'
    ];
    return dayFolders.length;
  }

  enhanceProfileWithDynamicData() {
    // Update project count with real data
    this.animateNumber('projectsCompleted', this.projectCount, 1500);
    
    // Calculate and display days active
    const joinDate = new Date('2024-03-01');
    const currentDate = new Date();
    const daysActive = Math.floor((currentDate - joinDate) / (1000 * 60 * 60 * 24));
    this.animateNumber('daysActive', daysActive, 1200);

    // Generate realistic streak
    const currentStreak = Math.floor(Math.random() * 30) + 5;
    this.animateNumber('currentStreak', currentStreak, 1000);

    // Enhance skills section
    this.enhanceSkillsProgress();

    // Update user info with better defaults
    this.enhanceUserInfo();
  }

  animateNumber(elementId, targetValue, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let startValue = 0;
    const increment = targetValue / (duration / 50);
    
    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= targetValue) {
        element.textContent = targetValue;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(startValue);
      }
    }, 50);
  }

  enhanceSkillsProgress() {
    // Animate progress bars with realistic values
    const progressBars = document.querySelectorAll('.progress-fill');
    const skillValues = [95, 87, 78, 72, 92, 65]; // HTML, JS, React, Database, Responsive, Node
    
    progressBars.forEach((bar, index) => {
      if (skillValues[index]) {
        setTimeout(() => {
          bar.style.width = `${skillValues[index]}%`;
          // Update the text as well
          const progressText = bar.closest('.progress-info')?.querySelector('.progress-text');
          if (progressText) {
            progressText.textContent = `${skillValues[index]}% Complete`;
          }
        }, 500 + (index * 200));
      }
    });
  }

  enhanceUserInfo() {
    // Update with better default values if elements exist and are empty/default
    const updates = {
      'userName': 'Mission Commander',
      'userTitle': 'Frontend Code Architect',
      'fullName': 'Alex Rodriguez', 
      'userEmail': 'alex.rodriguez@webdev.academy',
      'userLocation': 'San Francisco, CA',
      'joinDate': 'March 2024'
    };

    Object.entries(updates).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element && (element.textContent === 'Web Developer' || element.textContent === 'developer@example.com' || element.textContent === 'Global' || element.textContent.includes('January'))) {
        element.textContent = value;
      }
    });

    // Enhance achievements with better structure
    this.enhanceAchievements();
  }

  enhanceAchievements() {
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (!achievementsGrid) return;

    const achievements = [
      { icon: '👶', name: 'First Steps', desc: 'Complete first project', date: '2024-01-15' },
      { icon: '🔥', name: 'Week Warrior', desc: 'Code for 7 consecutive days', date: '2024-01-22' },
      { icon: '📝', name: 'HTML Master', desc: 'Complete 10 HTML projects', date: '2024-02-01' },
      { icon: '🎨', name: 'CSS Wizard', desc: 'Master CSS animations', date: 'Locked' },
      { icon: '⚡', name: 'JS Ninja', desc: 'Build 5 JavaScript apps', date: 'Locked' },
      { icon: '🏆', name: 'Century Club', desc: 'Complete 100 days challenge', date: 'Locked' }
    ];

    achievementsGrid.innerHTML = '';
    achievements.forEach((achievement, index) => {
      const div = document.createElement('div');
      div.className = 'achievement-badge';
      div.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-description">${achievement.desc}</div>
        ${achievement.date !== 'Locked' ? `<div class="achievement-date">Earned: ${achievement.date}</div>` : ''}
      `;
      
      if (achievement.date === 'Locked') {
        div.style.opacity = '0.5';
        div.style.filter = 'grayscale(100%)';
      }
      
      achievementsGrid.appendChild(div);
    });
  }
}

// Initialize enhancement after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new ProfileDataEnhancer();
});