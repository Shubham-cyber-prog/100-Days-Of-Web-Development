/**
 * CareerAnalytics.js
 * Tracks and processes career-related events and performance data.
 * calculates ROI on learning and skill acquisition rates.
 */

export class CareerAnalytics {
    constructor() {
        this.data = this._loadData();
    }

    _loadData() {
        const saved = localStorage.getItem('careerAnalytics');
        return saved ? JSON.parse(saved) : { sessions: [], skillProgress: {}, marketAlignment: 0 };
    }

    trackSession(type, duration) {
        this.data.sessions.push({ type, duration, timestamp: Date.now() });
        this._save();
    }

    updateSkillProgress(skill, delta) {
        this.data.skillProgress[skill] = (this.data.skillProgress[skill] || 0) + delta;
        this._save();
    }

    getDailyStats() {
        const today = new Date().setHours(0,0,0,0);
        return this.data.sessions.filter(s => new Date(s.timestamp).setHours(0,0,0,0) === today);
    }

    _save() {
        localStorage.setItem('careerAnalytics', JSON.stringify(this.data));
    }
}

export const careerAnalytics = new CareerAnalytics();
