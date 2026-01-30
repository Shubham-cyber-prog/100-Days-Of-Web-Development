/**
 * AI Service - Learning Architect & Performance Analytics
 * Gemini API integration for personalized recommendations
 * Issue #1117
 */

class AIService {
    constructor() {
        // Gemini API configuration
        this.apiKey = null;
        this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        
        // Cache for AI responses (avoid repeated API calls)
        this.responseCache = new Map();
        this.cacheDuration = 30 * 60 * 1000; // 30 minutes
        
        // Burnout detection thresholds
        this.burnoutThresholds = {
            velocityDrop: 0.5,      // 50% drop in completion rate
            streakBreakRisk: 3,     // Days without activity before warning
            overloadThreshold: 5    // Projects in single day (too fast)
        };

        this.init();
    }

    /**
     * Initialize AI Service
     */
    async init() {
        // Try to get API key from environment or localStorage
        this.apiKey = localStorage.getItem('gemini_api_key') || null;
        console.log('🤖 AI Service initialized', this.apiKey ? '(API key found)' : '(No API key)');
    }

    /**
     * Set API key for Gemini
     * @param {string} key - Gemini API key
     */
    setApiKey(key) {
        this.apiKey = key;
        localStorage.setItem('gemini_api_key', key);
        console.log('🔑 AI Service: API key configured');
    }

    /**
     * Check if AI features are available
     */
    isAvailable() {
        return !!this.apiKey;
    }

    /**
     * Analyze user progress and generate insights
     * @param {object} progressData - User's progress data
     */
    async analyzeProgress(progressData) {
        const cacheKey = `progress_${JSON.stringify(progressData).slice(0, 100)}`;
        
        // Check cache
        const cached = this.getFromCache(cacheKey);
        if (cached) return cached;

        // If no API key, use local analysis
        if (!this.apiKey) {
            return this.localProgressAnalysis(progressData);
        }

        try {
            const prompt = this.buildProgressPrompt(progressData);
            const response = await this.callGeminiAPI(prompt);
            
            const result = this.parseAIResponse(response);
            this.setCache(cacheKey, result);
            
            return result;
        } catch (error) {
            console.warn('AI API error, falling back to local analysis:', error.message);
            return this.localProgressAnalysis(progressData);
        }
    }

    /**
     * Build prompt for progress analysis
     */
    buildProgressPrompt(data) {
        return `You are a coding mentor analyzing a student's 100-day web development journey.

Progress Data:
- Completed Days: ${data.completedDays?.length || 0} out of 100
- Current Streak: ${data.currentStreak || 0} days
- Longest Streak: ${data.longestStreak || 0} days
- Tech Stack Distribution: ${JSON.stringify(data.techDistribution || {})}
- Recent Activity: ${JSON.stringify(data.recentActivity || [])}
- Completion Rate: ${data.completionRate || 0}%

Provide a JSON response with these fields:
{
    "overallAssessment": "Brief assessment (1-2 sentences)",
    "pathCorrections": ["Array of 2-3 specific suggestions"],
    "nextRecommendedProject": "Specific project idea based on their gaps",
    "motivationalMessage": "Personalized encouragement",
    "focusAreas": ["Areas to improve"],
    "estimatedCompletionDate": "Estimated date to finish if current pace continues",
    "riskLevel": "low|medium|high for burnout"
}

Respond ONLY with valid JSON, no markdown formatting.`;
    }

    /**
     * Call Gemini API
     */
    async callGeminiAPI(prompt) {
        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    /**
     * Parse AI response to structured object
     */
    parseAIResponse(responseText) {
        try {
            // Clean up response (remove markdown code blocks if present)
            let cleaned = responseText
                .replace(/```json\n?/g, '')
                .replace(/```\n?/g, '')
                .trim();
            
            return JSON.parse(cleaned);
        } catch (e) {
            console.warn('Failed to parse AI response:', e);
            return {
                overallAssessment: 'Keep up the great work on your coding journey!',
                pathCorrections: ['Continue with your current pace', 'Try exploring new technologies'],
                nextRecommendedProject: 'Build a full-stack application',
                motivationalMessage: 'Every line of code brings you closer to mastery!',
                focusAreas: ['Consistency', 'Practice'],
                estimatedCompletionDate: 'Keep going!',
                riskLevel: 'low'
            };
        }
    }

    /**
     * Local progress analysis (no API required)
     */
    localProgressAnalysis(data) {
        const completed = data.completedDays?.length || 0;
        const streak = data.currentStreak || 0;
        const rate = data.completionRate || 0;

        // Determine risk level
        let riskLevel = 'low';
        if (streak === 0 && completed > 10) riskLevel = 'medium';
        if (rate < 30 && completed > 20) riskLevel = 'high';

        // Generate path corrections based on gaps
        const pathCorrections = [];
        const techDist = data.techDistribution || {};
        
        if (!techDist.API || techDist.API < 5) {
            pathCorrections.push('Try more API-based projects to strengthen backend skills');
        }
        if (!techDist.Canvas || techDist.Canvas < 2) {
            pathCorrections.push('Explore Canvas projects for creative visualization');
        }
        if (streak < 3) {
            pathCorrections.push('Focus on building a consistent daily coding habit');
        }

        // Estimate completion
        const remaining = 100 - completed;
        const avgDaysPerProject = completed > 0 ? (Date.now() - (data.startDate || Date.now())) / (completed * 24 * 60 * 60 * 1000) : 2;
        const daysToComplete = Math.ceil(remaining * avgDaysPerProject);
        const completionDate = new Date(Date.now() + daysToComplete * 24 * 60 * 60 * 1000);

        return {
            overallAssessment: this.generateAssessment(completed, streak, rate),
            pathCorrections: pathCorrections.length > 0 ? pathCorrections : ['Keep your current momentum!'],
            nextRecommendedProject: this.recommendNextProject(data),
            motivationalMessage: this.getMotivationalMessage(completed, streak),
            focusAreas: this.identifyFocusAreas(techDist),
            estimatedCompletionDate: completionDate.toLocaleDateString(),
            riskLevel
        };
    }

    /**
     * Generate assessment message
     */
    generateAssessment(completed, streak, rate) {
        if (completed >= 80) {
            return "Outstanding! You're in the final stretch of your 100-day journey. Victory is within reach!";
        } else if (completed >= 50) {
            return "Excellent progress! You've passed the halfway mark. Your dedication is paying off.";
        } else if (completed >= 25) {
            return "Great start! You're building solid foundations. Keep the momentum going!";
        } else if (streak >= 7) {
            return "Amazing streak! Your consistency is the key to mastery. Keep it up!";
        } else {
            return "Every expert was once a beginner. Each day you code, you level up!";
        }
    }

    /**
     * Recommend next project based on gaps
     */
    recommendNextProject(data) {
        const techDist = data.techDistribution || {};
        const completed = data.completedDays || [];

        const recommendations = [
            { tech: 'API', project: 'Build a Weather Dashboard with real-time API data' },
            { tech: 'Canvas', project: 'Create an Interactive Drawing App with Canvas API' },
            { tech: 'React', project: 'Build a Task Manager with React and local storage' },
            { tech: 'Animation', project: 'Design an Animated Landing Page with CSS keyframes' },
            { tech: 'Game', project: 'Develop a Browser-based Puzzle Game' }
        ];

        // Find least practiced tech
        let minTech = recommendations[0];
        let minCount = Infinity;

        for (const rec of recommendations) {
            const count = techDist[rec.tech] || 0;
            if (count < minCount) {
                minCount = count;
                minTech = rec;
            }
        }

        return minTech.project;
    }

    /**
     * Get motivational message
     */
    getMotivationalMessage(completed, streak) {
        const messages = [
            "Code is poetry in motion. Every function you write is a verse in your masterpiece! 🎨",
            "The best developers aren't born, they're compiled through practice! 💻",
            "Your future self will thank you for the code you write today! 🚀",
            "Bugs are just features waiting to be understood! 🐛",
            "In the world of code, you're the architect of infinite possibilities! 🏗️",
            "Every semicolon brings you closer to greatness! ⚡",
            "The only way to learn programming is to program. You're doing it right! 🎯"
        ];

        if (streak >= 7) {
            return `🔥 ${streak}-day streak! You're on fire! ${messages[Math.floor(Math.random() * messages.length)]}`;
        }
        
        return messages[Math.floor(Math.random() * messages.length)];
    }

    /**
     * Identify focus areas from tech distribution
     */
    identifyFocusAreas(techDist) {
        const areas = [];
        const techMap = {
            'API': 'Backend Integration',
            'Canvas': 'Graphics & Visualization',
            'React': 'Frontend Frameworks',
            'CSS': 'Styling & Design',
            'JS': 'JavaScript Fundamentals'
        };

        for (const [tech, label] of Object.entries(techMap)) {
            if (!techDist[tech] || techDist[tech] < 3) {
                areas.push(label);
            }
        }

        return areas.length > 0 ? areas.slice(0, 3) : ['Keep exploring all areas!'];
    }

    // ==========================================
    // BURNOUT DETECTION
    // ==========================================

    /**
     * Analyze for burnout risk
     * @param {object} activityData - User activity data
     */
    analyzeBurnoutRisk(activityData) {
        const { recentActivity, currentStreak, completedDays, lastActiveDate } = activityData;
        
        const warnings = [];
        let riskScore = 0;

        // Check for velocity drop
        const velocityDrop = this.calculateVelocityDrop(recentActivity);
        if (velocityDrop > this.burnoutThresholds.velocityDrop) {
            warnings.push({
                type: 'velocity_drop',
                severity: 'warning',
                message: 'Your completion rate has dropped. Consider taking smaller steps.',
                suggestion: 'Try completing just one simple project today to rebuild momentum.'
            });
            riskScore += 30;
        }

        // Check for streak break risk
        const daysSinceActive = this.daysSinceLastActivity(lastActiveDate);
        if (daysSinceActive >= this.burnoutThresholds.streakBreakRisk && daysSinceActive < 7) {
            warnings.push({
                type: 'streak_risk',
                severity: 'warning',
                message: `${daysSinceActive} days without activity. Your streak is at risk!`,
                suggestion: 'Even 15 minutes of coding counts. Open a project now!'
            });
            riskScore += 20;
        } else if (daysSinceActive >= 7) {
            warnings.push({
                type: 'extended_break',
                severity: 'alert',
                message: 'You\'ve been away for a while. Time to restart your journey!',
                suggestion: 'Start fresh with an easy project to get back in the flow.'
            });
            riskScore += 40;
        }

        // Check for overload (too many in one day)
        const overloadDays = this.detectOverloadDays(recentActivity);
        if (overloadDays.length > 0) {
            warnings.push({
                type: 'overload',
                severity: 'info',
                message: 'You completed many projects in single days. Pace yourself!',
                suggestion: 'Quality over quantity. Deep learning takes time.'
            });
            riskScore += 10;
        }

        // Determine overall risk level
        let riskLevel = 'low';
        if (riskScore >= 50) riskLevel = 'high';
        else if (riskScore >= 25) riskLevel = 'medium';

        return {
            riskLevel,
            riskScore,
            warnings,
            recommendation: this.getBurnoutRecommendation(riskLevel, warnings)
        };
    }

    /**
     * Calculate velocity drop (completion rate change)
     */
    calculateVelocityDrop(recentActivity) {
        if (!recentActivity || recentActivity.length < 14) return 0;

        const firstWeek = recentActivity.slice(0, 7).filter(Boolean).length;
        const secondWeek = recentActivity.slice(7, 14).filter(Boolean).length;

        if (firstWeek === 0) return 0;
        return (firstWeek - secondWeek) / firstWeek;
    }

    /**
     * Calculate days since last activity
     */
    daysSinceLastActivity(lastActiveDate) {
        if (!lastActiveDate) return 999;
        const last = new Date(lastActiveDate);
        const now = new Date();
        return Math.floor((now - last) / (24 * 60 * 60 * 1000));
    }

    /**
     * Detect days with too many completions (overload)
     */
    detectOverloadDays(recentActivity) {
        const dayCounts = {};
        
        if (!recentActivity) return [];
        
        recentActivity.forEach(item => {
            if (item && item.date) {
                const date = new Date(item.date).toDateString();
                dayCounts[date] = (dayCounts[date] || 0) + 1;
            }
        });

        return Object.entries(dayCounts)
            .filter(([_, count]) => count >= this.burnoutThresholds.overloadThreshold)
            .map(([date]) => date);
    }

    /**
     * Get burnout recommendation
     */
    getBurnoutRecommendation(riskLevel, warnings) {
        if (riskLevel === 'high') {
            return {
                action: 'pause',
                message: 'Take a short break, then start with something fun and easy.',
                priority: 'high'
            };
        } else if (riskLevel === 'medium') {
            return {
                action: 'adjust',
                message: 'Consider reducing daily goals temporarily.',
                priority: 'medium'
            };
        }
        return {
            action: 'continue',
            message: 'You\'re doing great! Keep up the steady pace.',
            priority: 'low'
        };
    }

    // ==========================================
    // TECH STACK ANALYSIS
    // ==========================================

    /**
     * Analyze tech stack distribution for radar chart
     * @param {Array} completedDays - Array of completed day numbers
     * @param {Array} projects - Project definitions with tech info
     */
    analyzeTechStack(completedDays, projects) {
        const categories = {
            'Frontend': { count: 0, max: 30, skills: ['HTML', 'CSS', 'JS'] },
            'Backend': { count: 0, max: 20, skills: ['API', 'Node', 'Database'] },
            'Design': { count: 0, max: 20, skills: ['CSS', 'Animation', 'Canvas'] },
            'Logic': { count: 0, max: 25, skills: ['JS', 'Algorithm', 'Game'] },
            'Integration': { count: 0, max: 15, skills: ['API', 'Firebase', 'Auth'] },
            'DevOps': { count: 0, max: 10, skills: ['Deploy', 'PWA', 'Performance'] }
        };

        // Count completed projects per category
        completedDays.forEach(dayNum => {
            const project = projects.find(p => p.day === dayNum);
            if (!project) return;

            const techStack = project.tech || [];
            
            for (const [category, data] of Object.entries(categories)) {
                const hasSkill = techStack.some(tech => 
                    data.skills.some(skill => tech.toLowerCase().includes(skill.toLowerCase()))
                );
                if (hasSkill) {
                    data.count++;
                }
            }
        });

        // Calculate percentages for radar chart
        const radarData = {};
        for (const [category, data] of Object.entries(categories)) {
            radarData[category] = Math.min(100, Math.round((data.count / data.max) * 100));
        }

        return {
            radarData,
            categories,
            strongestArea: Object.entries(radarData).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Frontend',
            weakestArea: Object.entries(radarData).sort((a, b) => a[1] - b[1])[0]?.[0] || 'DevOps'
        };
    }

    // ==========================================
    // CACHING
    // ==========================================

    /**
     * Get cached response
     */
    getFromCache(key) {
        const cached = this.responseCache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.data;
        }
        return null;
    }

    /**
     * Set cache
     */
    setCache(key, data) {
        this.responseCache.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.responseCache.clear();
    }
}

// Singleton instance
const AI = new AIService();

// Export for modules
export { AI, AIService };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.AI = AI;
}
