/**
 * Career.js
 * Orchestrates the Career Launchpad page.
 * Integrates CareerService, ResumeGenerator, CareerCoach, and SkillRadar.
 */

import { careerService } from '../core/careerService.js';
import { resumeGenerator } from '../core/resumeGenerator.js';
import { CareerCoach } from '../components/CareerCoach.js';
import { SkillRadar } from '../components/SkillRadar.js';

class CareerPageManager {
  constructor() {
    this.coach = new CareerCoach('career-coach-widget');
    this.radar = new SkillRadar('skill-radar-container');
    this.init();
    this.bindEvents();
  }

  async init() {
    const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    const profile = JSON.parse(
      localStorage.getItem('profileData') ||
        '{"fullName":"Pilot Developer","title":"Aspiring Engineer"}'
    );

    // Fetch readiness and market data
    const readiness = await careerService.getCareerScore(projects);
    const market = await careerService.getMarketInsights();
    const advice = await this.getCareerAdvice(readiness, market);

    // Update UI stats
    document.getElementById('readiness-score').textContent = `${readiness.overall}%`;
    document.getElementById('project-count').textContent = projects.length;
    document.getElementById('readiness-score').style.color =
      readiness.overall > 80 ? '#22c55e' : readiness.overall > 50 ? '#eab308' : '#ef4444';

    // Render components
    this.coach.render(advice, readiness);
    this.renderSkillRadar(projects);
    this.renderMarketTrends(market);
    await this.updateResumePreview(profile, projects);
  }

  async getCareerAdvice(readiness, market) {
    // Dynamic advice based on stats
    const adviceItems = [
      {
        type: 'Optimization',
        message: 'Improve lighthouse scores on 3 projects to reach 90+ readiness.',
        icon: 'fas fa-gauge-high',
        color: '#06b6d4',
      },
      {
        type: 'Skill Gap',
        message: 'Market demand for Fullstack is high. Consider a Node.js project.',
        icon: 'fas fa-code-branch',
        color: '#6d28d9',
      },
      {
        type: 'Strategy',
        message: 'LinkedIn engagement is up in your region. Post your latest build.',
        icon: 'fab fa-linkedin-in',
        color: '#0077b5',
      },
    ];

    if (readiness.overall < 40) {
      adviceItems.push({
        type: 'Urgent',
        message: 'Complete at least 1 CRUD application to unlock Junior rank.',
        icon: 'fas fa-exclamation-triangle',
        color: '#ef4444',
      });
    }
    return adviceItems;
  }

  renderSkillRadar(projects) {
    const skills = {
      'UI/UX': 85,
      Logic: 92,
      Architecture: 75,
      Testing: 40,
      Deployment: 60,
      Security: 30,
    };
    this.radar.render(skills);
  }

  renderMarketTrends(trends) {
    const container = document.getElementById('market-trends-container');
    if (!container) return;

    container.innerHTML = Object.entries(trends)
      .map(
        ([key, data]) => `
            <div class="trend-card">
                <div class="trend-stat">
                    <span>${key} Demand</span>
                    <h3>${data.score}%</h3>
                    <div class="trend-bar" style="width: ${data.score}%"></div>
                </div>
                <div class="trend-skills">
                    ${data.skills.map(s => `<span>${s}</span>`).join('')}
                </div>
            </div>
        `
      )
      .join('');
  }

  async updateResumePreview(profile, projects) {
    const resumeData = await careerService.generateResumeData(profile, projects);
    const template = document.querySelector('input[name="template"]:checked').value;
    const html = await resumeGenerator.generateHTML(resumeData, template);
    document.getElementById('resume-preview-container').innerHTML = html;
  }

  bindEvents() {
    document.querySelectorAll('input[name="template"]').forEach(radio => {
      radio.addEventListener('change', async () => {
        const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        const profile = JSON.parse(
          localStorage.getItem('profileData') ||
            '{"fullName":"Pilot Developer","title":"Aspiring Engineer"}'
        );
        await this.updateResumePreview(profile, projects);
      });
    });

    document.getElementById('btn-export-pdf')?.addEventListener('click', () => {
      alert('PDF Generation is a pro feature in this demo. Previewing instead.');
      document.getElementById('portfolio-modal').style.display = 'block';
      document.getElementById('full-portfolio-preview').innerHTML = document.getElementById(
        'resume-preview-container'
      ).innerHTML;
    });

    document.querySelector('.close-modal')?.addEventListener('click', () => {
      document.getElementById('portfolio-modal').style.display = 'none';
    });
  }
}

window.addEventListener('DOMContentLoaded', () => new CareerPageManager());
