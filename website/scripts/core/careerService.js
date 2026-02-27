/**
 * CareerService.js
 * Manages career readiness scores, professional pathing, and portfolio automation.
 * Integrates with AI for career coaching.
 */

export class CareerService {
    constructor() {
        this.cache = new Map();
        this._initMarketData();
    }

    _initMarketData() {
        this.marketTrends = {
            'Frontend': { score: 92, skills: ['React', 'TypeScript', 'Tailwind', 'Performance'] },
            'Fullstack': { score: 88, skills: ['Node.js', 'PostgreSQL', 'Auth', 'APIs'] },
            'Creative Dev': { score: 75, skills: ['Three.js', 'Shaders', 'Canvas', 'SVG'] },
            'Systems': { score: 70, skills: ['Rust', 'WASM', 'Memory Management', 'Network'] }
        };
    }

    async getCareerScore(userProjects = []) {
        // Calculate readiness based on project diversity and complexity
        const uniqueTags = new Set(userProjects.flatMap(p => p.tags || []));
        const baseScore = Math.min(100, (userProjects.length / 100) * 40 + (uniqueTags.size / 20) * 60);
        
        return {
            overall: Math.round(baseScore),
            breakdown: {
                technical: Math.round(baseScore * 0.8),
                presentation: Math.round(baseScore * 0.7),
                consistency: Math.round(baseScore * 0.9)
            },
            level: this._getReadinessLevel(baseScore)
        };
    }

    _getReadinessLevel(score) {
        if (score < 30) return 'Apprentice';
        if (score < 60) return 'Junior Architect';
        if (score < 85) return 'Senior Webmaster';
        return 'Professional Engineer';
    }

    async getMarketInsights() {
        // Mock API call to get live job market trends
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.marketTrends);
            }, 500);
        });
    }

    async generateResumeData(profileData, projects) {
        return {
            header: {
                name: profileData.fullName,
                title: profileData.title,
                location: profileData.location,
                links: ['GitHub', 'LinkedIn', 'Portfolio']
            },
            experience: projects.slice(0, 5).map(p => ({
                title: p.title,
                date: p.date || 'Active',
                achievements: [
                    `Implemented ${p.title} using ${p.tags?.join(', ') || 'Modern Web Tech'}.`,
                    'Optimized for performance and accessibility.',
                    'Reduced bundle size by 15% through tree-shaking.'
                ]
            })),
            skills: {
                languages: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
                frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
                tools: ['Git', 'Docker', 'Figma', 'Jest']
            }
        };
    }

    async suggestCertifications(score) {
        const certs = [];
        if (score > 50) certs.push({ name: 'AWS Cloud Practitioner', provider: 'Amazon' });
        if (score > 70) certs.push({ name: 'Professional Scrum Master', provider: 'Scrum.org' });
        certs.push({ name: 'Google UX Design Professional', provider: 'Coursera' });
        return certs;
    }
}

export const careerService = new CareerService();
