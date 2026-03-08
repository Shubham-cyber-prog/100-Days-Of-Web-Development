const ChallengeSystem = {
  challenges: [],
  submissions: [],
  leaderboard: [],
  userProgress: {},

  init() {
    this.loadFromStorage();
    this.setupEventListeners();
  },

  loadFromStorage() {
    const stored = localStorage.getItem('zenith_challenge_data');
    if (stored) {
      const data = JSON.parse(stored);
      this.challenges = data.challenges || [];
      this.submissions = data.submissions || [];
      this.leaderboard = data.leaderboard || [];
      this.userProgress = data.userProgress || {};
    }
  },

  saveToStorage() {
    localStorage.setItem('zenith_challenge_data', JSON.stringify({
      challenges: this.challenges,
      submissions: this.submissions,
      leaderboard: this.leaderboard,
      userProgress: this.userProgress
    }));
  },

  setupEventListeners() {
    document.addEventListener('challenge:submit', (e) => this.handleSubmission(e.detail));
    document.addEventListener('challenge:vote', (e) => this.handleVote(e.detail));
  },

  getActiveChallenges() {
    return this.challenges.filter(c => c.status === 'active');
  },

  getChallengeById(id) {
    return this.challenges.find(c => c.id === id);
  },

  createChallenge(challengeData) {
    const challenge = {
      id: `challenge-${Date.now()}`,
      title: challengeData.title,
      description: challengeData.description,
      theme: challengeData.theme,
      difficulty: challengeData.difficulty || 'intermediate',
      startDate: challengeData.startDate || new Date().toISOString(),
      endDate: challengeData.endDate,
      constraints: challengeData.constraints || [],
      starterTemplate: challengeData.starterTemplate,
      resources: challengeData.resources || [],
      status: 'active',
      submissions: [],
      createdAt: new Date().toISOString()
    };

    this.challenges.push(challenge);
    this.saveToStorage();
    return challenge;
  },

  submitChallenge(challengeId, submissionData) {
    const challenge = this.getChallengeById(challengeId);
    if (!challenge) return null;

    const submission = {
      id: `submission-${Date.now()}`,
      challengeId,
      userId: submissionData.userId || 'anonymous',
      userName: submissionData.userName || 'Anonymous',
      projectUrl: submissionData.projectUrl,
      description: submissionData.description,
      technologies: submissionData.technologies || [],
      learnings: submissionData.learnings,
      votes: 0,
      qualityScore: null,
      badges: [],
      submittedAt: new Date().toISOString()
    };

    this.submissions.push(submission);
    challenge.submissions.push(submission.id);
    this.updateLeaderboard(submission);
    this.saveToStorage();

    document.dispatchEvent(new CustomEvent('challenge:submitted', { detail: submission }));
    return submission;
  },

  handleSubmission(data) {
    return this.submitChallenge(data.challengeId, data);
  },

  voteForSubmission(submissionId) {
    const submission = this.submissions.find(s => s.id === submissionId);
    if (!submission) return;

    submission.votes++;
    this.updateLeaderboard(submission);
    this.saveToStorage();

    document.dispatchEvent(new CustomEvent('challenge:voted', { detail: submission }));
  },

  handleVote(data) {
    this.voteForSubmission(data.submissionId);
  },

  calculateQualityScore(submission) {
    return {
      performance: Math.floor(Math.random() * 20 + 80),
      accessibility: Math.floor(Math.random() * 20 + 80),
      bestPractices: Math.floor(Math.random() * 20 + 80)
    };
  },

  updateLeaderboard(submission) {
    const existingEntry = this.leaderboard.find(
      e => e.userId === submission.userId && e.challengeId === submission.challengeId
    );

    if (existingEntry) {
      existingEntry.votes = submission.votes;
      existingEntry.updatedAt = new Date().toISOString();
    } else {
      this.leaderboard.push({
        userId: submission.userId,
        userName: submission.userName,
        challengeId: submission.challengeId,
        votes: submission.votes,
        qualityScore: submission.qualityScore,
        badges: submission.badges,
        completedAt: submission.submittedAt,
        updatedAt: new Date().toISOString()
      });
    }

    this.leaderboard.sort((a, b) => b.votes - a.votes);
    this.saveToStorage();
  },

  getLeaderboard(type = 'weekly', limit = 10) {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    let filtered = this.leaderboard;

    if (type === 'weekly') {
      filtered = this.leaderboard.filter(e => 
        new Date(e.updatedAt) >= weekAgo
      );
    }

    const userScores = {};
    filtered.forEach(entry => {
      if (!userScores[entry.userId]) {
        userScores[entry.userId] = {
          userId: entry.userId,
          userName: entry.userName,
          totalVotes: 0,
          challengesCompleted: 0,
          badges: []
        };
      }
      userScores[entry.userId].totalVotes += entry.votes;
      userScores[entry.userId].challengesCompleted++;
      userScores[entry.userId].badges.push(...(entry.badges || []));
    });

    return Object.values(userScores)
      .sort((a, b) => b.totalVotes - a.totalVotes)
      .slice(0, limit);
  },

  awardBadge(userId, badge) {
    const userEntries = this.leaderboard.filter(e => e.userId === userId);
    userEntries.forEach(entry => {
      if (!entry.badges.includes(badge)) {
        entry.badges.push(badge);
      }
    });
    this.saveToStorage();

    document.dispatchEvent(new CustomEvent('badge:awarded', { detail: { userId, badge } }));
  },

  getBadges() {
    return {
      'first-submit': { name: 'First Steps', description: 'Submitted your first challenge', icon: 'star' },
      'streak-3': { name: 'On Fire', description: 'Completed 3 challenges in a row', icon: 'fire' },
      'streak-5': { name: 'Unstoppable', description: 'Completed 5 challenges in a row', icon: 'rocket' },
      'streak-10': { name: 'Legend', description: 'Completed 10 challenges in a row', icon: 'crown' },
      'top-3': { name: 'Podium', description: 'Finished in top 3 for a challenge', icon: 'medal' },
      'winner': { name: 'Champion', description: 'Won a weekly challenge', icon: 'trophy' },
      'creative': { name: 'Creative Mind', description: 'Awarded for creative solution', icon: 'lightbulb' },
      'performant': { name: 'Speed Demon', description: 'Achieved 95+ performance score', icon: 'zap' },
      'accessible': { name: 'Inclusive', description: 'Achieved 95+ accessibility score', icon: 'heart' }
    };
  },

  getWeeklyChallengeThemes() {
    return [
      { theme: 'CSS Animation', description: 'Create stunning animations with pure CSS' },
      { theme: 'API Integration', description: 'Build an app that consumes a public API' },
      { theme: 'PWA Features', description: 'Implement offline capabilities and install prompts' },
      { theme: 'Accessible Forms', description: 'Build forms with comprehensive accessibility' },
      { theme: 'Canvas Graphics', description: 'Create interactive graphics with Canvas API' },
      { theme: 'State Management', description: 'Build a complex app with custom state management' },
      { theme: 'Responsive Design', description: 'Create a pixel-perfect responsive layout' },
      { theme: 'Performance Optimization', description: 'Build a lightning-fast web experience' },
      { theme: 'Game Development', description: 'Create an interactive browser game' },
      { theme: 'Data Visualization', description: 'Visualize data with custom charts and graphs' }
    ];
  }
};

window.ChallengeSystem = ChallengeSystem;
document.addEventListener('DOMContentLoaded', () => ChallengeSystem.init());