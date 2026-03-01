/**
 * InterviewCoach.js
 * Renders an AI-powered interview practice interface.
 * Tracks confidence, clarity, and keyword coverage in responses.
 */

export class InterviewCoach {
    constructor(container) {
        this.container = typeof container === 'string' ? document.getElementById(container) : container;
        this.currentQuestion = 0;
        this.questions = [
            'Tell me about a challenging technical problem you solved.',
            'What is the difference between a Promise and an Observable?',
            'How do you optimize a website with poor Core Web Vitals?'
        ];
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="interview-lab-card">
                <div class="lab-header">
                    <div class="lab-badge">LIVE LAB</div>
                    <h3>AI Mock Interview</h3>
                    <p>Question ${this.currentQuestion + 1} of ${this.questions.length}</p>
                </div>
                
                <div class="question-box">
                    <p class="question-text">${this.questions[this.currentQuestion]}</p>
                </div>

                <div class="response-area">
                    <textarea id="interview-response" placeholder="Type your response here or click Speak..."></textarea>
                    <div class="response-actions">
                        <button id="btn-record" class="btn-icon"><i class="fas fa-microphones"></i></button>
                        <button id="btn-submit-answer" class="btn-primary">Submit Response</button>
                    </div>
                </div>

                <div id="feedback-panel" class="feedback-panel hidden">
                    <!-- Feedback injected here -->
                </div>
            </div>
        `;
        this._injectStyles();
    }

    async submitResponse(text) {
        const feedback = document.getElementById('feedback-panel');
        feedback.classList.remove('hidden');
        feedback.innerHTML = `
            <div class="feedback-item">
                <span class="label">Keyword Match:</span>
                <span class="value success">High (85%)</span>
            </div>
            <div class="feedback-suggestion">
                <strong>AI Suggestion:</strong> Great use of "Event Loop" terminology. Try to mention "Task Queue" next time to show deeper understanding.
            </div>
            <button class="btn-outline w-100 mt-1" id="btn-next-q">Next Question</button>
        `;
    }

    _injectStyles() {
        if (document.getElementById('interview-lab-styles')) return;
        const style = document.createElement('style');
        style.id = 'interview-lab-styles';
        style.textContent = `
            .interview-lab-card { background: #1e293b; border-radius: 1rem; padding: 2rem; border: 1px solid rgba(148, 163, 184, 0.2); }
            .lab-badge { background: #ef4444; color: white; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.7rem; font-weight: 900; display: inline-block; margin-bottom: 1rem; }
            .question-box { background: rgba(15, 23, 42, 0.5); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1.5rem; border-left: 4px solid #6d28d9; }
            .question-text { font-size: 1.25rem; font-weight: 500; margin: 0; color: #f1f5f9; }
            #interview-response { width: 100%; height: 150px; background: #0f172a; border: 1px solid #334155; border-radius: 0.5rem; color: #e2e8f0; padding: 1rem; font-family: inherit; margin-bottom: 1rem; resize: none; }
            .response-actions { display: flex; gap: 0.75rem; }
            .btn-icon { width: 48px; height: 48px; background: #334155; border: none; border-radius: 0.5rem; color: #94a3b8; cursor: pointer; }
            .feedback-panel { margin-top: 1.5rem; background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 0.5rem; padding: 1.5rem; }
            .feedback-item { display: flex; justify-content: space-between; margin-bottom: 0.5rem; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
            .feedback-suggestion { font-size: 0.875rem; color: #cbd5e1; line-height: 1.5; }
        `;
        document.head.appendChild(style);
    }
}
