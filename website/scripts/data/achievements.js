/**
 * Achievements Data
 * Defines all achievement badges with their criteria and metadata
 */

export const achievementsData = [
    // Milestone Achievements - Days Completed
    {
        id: 'first_project',
        title: 'First Project',
        description: 'Complete your first day of the 100 Days challenge',
        icon: '🚀',
        category: 'milestone',
        rarity: 'common',
        points: 50,
        requirement: (stats) => stats.totalCompleted >= 1,
        progress: (stats) => Math.min(stats.totalCompleted / 1, 1)
    },
    {
        id: 'week_warrior',
        title: '7-Day Streak',
        description: 'Maintain a 7-day coding streak',
        icon: '🔥',
        category: 'streak',
        rarity: 'rare',
        points: 100,
        requirement: (stats) => stats.currentStreak >= 7,
        progress: (stats) => Math.min(stats.currentStreak / 7, 1)
    },
    {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain a 30-day coding streak',
        icon: '⚡',
        category: 'streak',
        rarity: 'epic',
        points: 300,
        requirement: (stats) => stats.currentStreak >= 30,
        progress: (stats) => Math.min(stats.currentStreak / 30, 1)
    },
    {
        id: 'html_master',
        title: 'HTML Master',
        description: 'Complete 10 HTML-focused projects',
        icon: '📄',
        category: 'skill',
        rarity: 'rare',
        points: 150,
        requirement: (stats) => (stats.htmlProjects || 0) >= 10,
        progress: (stats) => Math.min((stats.htmlProjects || 0) / 10, 1)
    },
    {
        id: 'css_wizard',
        title: 'CSS Wizard',
        description: 'Complete 10 CSS-focused projects with advanced styling',
        icon: '🎨',
        category: 'skill',
        rarity: 'rare',
        points: 150,
        requirement: (stats) => (stats.cssProjects || 0) >= 10,
        progress: (stats) => Math.min((stats.cssProjects || 0) / 10, 1)
    },
    {
        id: 'javascript_ninja',
        title: 'JavaScript Ninja',
        description: 'Complete 15 JavaScript projects with interactive features',
        icon: '⚔️',
        category: 'skill',
        rarity: 'epic',
        points: 200,
        requirement: (stats) => (stats.jsProjects || 0) >= 15,
        progress: (stats) => Math.min((stats.jsProjects || 0) / 15, 1)
    },
    {
        id: 'decade_of_code',
        title: 'Decade of Code',
        description: 'Complete 10 projects',
        icon: '🎫',
        category: 'milestone',
        rarity: 'common',
        points: 100,
        requirement: (stats) => stats.totalCompleted >= 10,
        progress: (stats) => Math.min(stats.totalCompleted / 10, 1)
    },
    {
        id: 'quarter_century',
        title: 'Quarter Century',
        description: 'Complete 25 projects',
        icon: '🎖️',
        category: 'milestone',
        rarity: 'rare',
        points: 250,
        requirement: (stats) => stats.totalCompleted >= 25,
        progress: (stats) => Math.min(stats.totalCompleted / 25, 1)
    },
    {
        id: 'halfway_hero',
        title: 'Halfway Hero',
        description: 'Complete 50 projects',
        icon: '🏆',
        category: 'milestone',
        rarity: 'epic',
        points: 500,
        requirement: (stats) => stats.totalCompleted >= 50,
        progress: (stats) => Math.min(stats.totalCompleted / 50, 1)
    },
    {
        id: 'zenith_master',
        title: 'Zenith Master',
        description: 'Complete the full 100 days challenge',
        icon: '👑',
        category: 'milestone',
        rarity: 'legendary',
        points: 1000,
        requirement: (stats) => stats.totalCompleted >= 100,
        progress: (stats) => Math.min(stats.totalCompleted / 100, 1)
    },
    {
        id: 'tech_explorer',
        title: 'Tech Explorer',
        description: 'Try 5 different technologies',
        icon: '🌍',
        category: 'explorer',
        rarity: 'rare',
        points: 150,
        requirement: (stats) => (stats.techCount || 0) >= 5,
        progress: (stats) => Math.min((stats.techCount || 0) / 5, 1)
    },
    {
        id: 'framework_pioneer',
        title: 'Framework Pioneer',
        description: 'Complete projects using 3 different frameworks',
        icon: '🏗️',
        category: 'explorer',
        rarity: 'epic',
        points: 250,
        requirement: (stats) => (stats.frameworkCount || 0) >= 3,
        progress: (stats) => Math.min((stats.frameworkCount || 0) / 3, 1)
    },
    {
        id: 'responsive_guru',
        title: 'Responsive Guru',
        description: 'Create 10 fully responsive websites',
        icon: '📱',
        category: 'skill',
        rarity: 'rare',
        points: 200,
        requirement: (stats) => (stats.responsiveProjects || 0) >= 10,
        progress: (stats) => Math.min((stats.responsiveProjects || 0) / 10, 1)
    },
    {
        id: 'api_integrator',
        title: 'API Integrator',
        description: 'Successfully integrate 5 different APIs',
        icon: '🔌',
        category: 'skill',
        rarity: 'epic',
        points: 250,
        requirement: (stats) => (stats.apiProjects || 0) >= 5,
        progress: (stats) => Math.min((stats.apiProjects || 0) / 5, 1)
    },
    {
        id: 'deployment_pro',
        title: 'Deployment Pro',
        description: 'Deploy 10 projects to live servers',
        icon: '🚀',
        category: 'milestone',
        rarity: 'epic',
        points: 300,
        requirement: (stats) => (stats.deployedProjects || 0) >= 10,
        progress: (stats) => Math.min((stats.deployedProjects || 0) / 10, 1)
    },
    {
        id: 'git_committer',
        title: 'Git Committer',
        description: 'Make 50 meaningful commits to your projects',
        icon: '📦',
        category: 'milestone',
        rarity: 'rare',
        points: 150,
        requirement: (stats) => (stats.totalCommits || 0) >= 50,
        progress: (stats) => Math.min((stats.totalCommits || 0) / 50, 1)
    },
    {
        id: 'community_helper',
        title: 'Community Helper',
        description: 'Help 5 other developers in the community',
        icon: '🤝',
        category: 'social',
        rarity: 'rare',
        points: 200,
        requirement: (stats) => (stats.helpedUsers || 0) >= 5,
        progress: (stats) => Math.min((stats.helpedUsers || 0) / 5, 1)
    },
    {
        id: 'early_bird',
        title: 'Early Bird',
        description: 'Complete 5 projects before 8 AM',
        icon: '🌅',
        category: 'special',
        rarity: 'epic',
        points: 150,
        requirement: (stats) => (stats.earlyProjects || 0) >= 5,
        progress: (stats) => Math.min((stats.earlyProjects || 0) / 5, 1)
    },
    {
        id: 'night_owl',
        title: 'Night Owl',
        description: 'Complete 5 projects after 10 PM',
        icon: '🦉',
        category: 'special',
        rarity: 'epic',
        points: 150,
        requirement: (stats) => (stats.lateProjects || 0) >= 5,
        progress: (stats) => Math.min((stats.lateProjects || 0) / 5, 1)
    },
    {
        id: 'weekend_warrior',
        title: 'Weekend Warrior',
        description: 'Complete projects on 10 weekends',
        icon: '🗓️',
        category: 'special',
        rarity: 'rare',
        points: 200,
        requirement: (stats) => (stats.weekendProjects || 0) >= 10,
        progress: (stats) => Math.min((stats.weekendProjects || 0) / 10, 1)
    }
];

// Achievement categories for filtering
export const achievementCategories = [
    { id: 'all', label: 'All Badges', icon: '🏅' },
    { id: 'milestone', label: 'Milestones', icon: '🎯' },
    { id: 'streak', label: 'Streaks', icon: '🔥' },
    { id: 'skill', label: 'Skills', icon: '⚔️' },
    { id: 'explorer', label: 'Explorer', icon: '🌍' },
    { id: 'social', label: 'Social', icon: '🤝' },
    { id: 'special', label: 'Special', icon: '✨' }
];

// Rarity configuration
export const rarityConfig = {
    common: { color: '#8B8B8B', label: 'Common', multiplier: 1 },
    rare: { color: '#4A90E2', label: 'Rare', multiplier: 1.5 },
    epic: { color: '#9B59B6', label: 'Epic', multiplier: 2 },
    legendary: { color: '#F39C12', label: 'Legendary', multiplier: 3 }
};

// Helper function to get achievements by category
export function getAchievementsByCategory(category) {
    if (category === 'all') return achievementsData;
    return achievementsData.filter(a => a.category === category);
}

// Helper function to get achievement by ID
export function getAchievementById(id) {
    return achievementsData.find(a => a.id === id);
}

// Helper function to calculate total possible points
export function getTotalPossiblePoints() {
    return achievementsData.reduce((total, a) => total + a.points, 0);
}

export default achievementsData;
