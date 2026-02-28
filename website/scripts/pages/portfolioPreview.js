/**
 * PortfolioPreview.js
 * Manages the live portfolio and resume preview.
 * Synchronizes user data with chosen templates.
 */

import { careerService } from '../core/careerService.js';
import { resumeGenerator } from '../core/resumeGenerator.js';

class PortfolioPreviewManager {
    constructor() {
        this.container = document.getElementById('portfolio-container');
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        this.templateId = urlParams.get('template') || 'minimal';
        await this.refresh();
    }

    async refresh() {
        const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
        const profile = JSON.parse(localStorage.getItem('profileData') || '{"fullName":"Pilot Developer","title":"Aspiring Engineer"}');
        
        const resumeData = await careerService.generateResumeData(profile, projects);
        const html = await resumeGenerator.generateHTML(resumeData, this.templateId);
        
        if (this.container) {
            this.container.innerHTML = html;
        }
    }

    switchTemplate(id) {
        this.templateId = id;
        this.refresh();
    }
}

window.addEventListener('load', () => new PortfolioPreviewManager());
