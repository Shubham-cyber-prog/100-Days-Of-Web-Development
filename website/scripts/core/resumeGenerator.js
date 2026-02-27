/**
 * ResumeGenerator.js
 * Generates dynamic resumes and portfolios from user progress and project data.
 * Outputs PDF templates and JSON schemas for LinkedIn/Job Boards.
 */

export class ResumeGenerator {
    constructor() {
        this.templates = [
            { id: 'minimal', name: 'Minimalist Professional', color: '#1a1a1a' },
            { id: 'dark-cyber', name: 'Dark Cyberpunk', color: '#00ff88' },
            { id: 'creative-grid', name: 'Creative Masonry Grid', color: '#6d28d9' }
        ];
    }

    async generateHTML(resumeData, templateId = 'minimal') {
        const template = this.templates.find(t => t.id === templateId) || this.templates[0];
        
        return `<div class="resume-root ${template.id}" style="--primary-color: ${template.color}">
            <header>
                <h1>${resumeData.header.name}</h1>
                <p>${resumeData.header.title} | ${resumeData.header.location}</p>
                <div class="links">${resumeData.header.links.map(l => `<span>${l}</span>`).join(' • ')}</div>
            </header>
            
            <section class="summary">
                <h2>Professional Summary</h2>
                <p>Ambitious Web Developer with ${resumeData.experience.length} completed projects under the 100 Days of Web Dev challenge. Specialize in ${resumeData.skills.languages.slice(0,3).join(', ')}.</p>
            </section>

            <section class="experience">
                <h2>Recent Projects</h2>
                ${resumeData.experience.map(exp => `
                    <article>
                        <div class="header">
                            <h3>${exp.title}</h3>
                            <span>${exp.date}</span>
                        </div>
                        <ul>
                            ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                    </article>
                `).join('')}
            </section>

            <section class="skills">
                <h2>Technical Toolkit</h2>
                <div class="skill-grid">
                    <div><strong>Languages:</strong> ${resumeData.skills.languages.join(', ')}</div>
                    <div><strong>Frameworks:</strong> ${resumeData.skills.frameworks.join(', ')}</div>
                    <div><strong>Tools:</strong> ${resumeData.skills.tools.join(', ')}</div>
                </div>
            </section>
        </div>`;
    }

    async exportToJSON(resumeData) {
        return JSON.stringify(resumeData, null, 2);
    }

    getTemplates() {
        return this.templates;
    }
}

export const resumeGenerator = new ResumeGenerator();
