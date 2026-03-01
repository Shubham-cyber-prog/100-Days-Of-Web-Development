import { auth, db } from '../firebase-config.js';
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    doc,
    updateDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { Notify } from '../core/Notify.js';
import communityService from '../services/communityService.js';

class AdminDashboard {
    constructor() {
        this.currentSubmission = null;
        this.init();
    }

    init() {
        // Check authentication and admin access
        auth.onAuthStateChanged((user) => {
            if (!user) {
                Notify.error('Please log in to access admin dashboard');
                window.location.href = '../pages/login.html';
                return;
            }

            // For now, allow all authenticated users to access admin
            // In production, you'd check for admin role in user document
            this.loadDashboard();
        });

        // Event listeners
        document.getElementById('refreshBtn')?.addEventListener('click', () => {
            this.loadDashboard();
        });
    }

    async loadDashboard() {
        try {
            this.showLoading();

            // Load statistics
            await this.loadStats();

            // Load pending submissions
            await this.loadPendingSubmissions();

        } catch (error) {
            console.error('Error loading dashboard:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async loadStats() {
        try {
            // Get pending submissions count
            const pendingQuery = query(
                collection(db, 'community_submissions'),
                where('status', '==', 'pending')
            );
            const pendingSnapshot = await getDocs(pendingQuery);
            document.getElementById('pendingCount').textContent = pendingSnapshot.size;

            // Get approved submissions count
            const approvedQuery = query(
                collection(db, 'community_submissions'),
                where('status', '==', 'approved')
            );
            const approvedSnapshot = await getDocs(approvedQuery);
            document.getElementById('approvedCount').textContent = approvedSnapshot.size;

            // Get rejected submissions count
            const rejectedQuery = query(
                collection(db, 'community_submissions'),
                where('status', '==', 'rejected')
            );
            const rejectedSnapshot = await getDocs(rejectedQuery);
            document.getElementById('rejectedCount').textContent = rejectedSnapshot.size;

        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async loadPendingSubmissions() {
        try {
            const submissions = await communityService.getPendingSubmissions();

            if (submissions.length === 0) {
                this.showEmptyState();
                return;
            }

            this.renderSubmissionsTable(submissions);

        } catch (error) {
            console.error('Error loading submissions:', error);
            this.showError('Failed to load submissions');
        }
    }

    renderSubmissionsTable(submissions) {
        const container = document.getElementById('submissionsList');

        const tableHTML = `
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Submitted By</th>
                        <th>Difficulty</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${submissions.map(submission => this.renderSubmissionRow(submission)).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;
    }

    renderSubmissionRow(submission) {
        const submittedDate = submission.submittedAt ?
            new Date(submission.submittedAt).toLocaleDateString() : 'Unknown';

        return `
            <tr>
                <td>${submission.title}</td>
                <td>${submission.submittedByName || 'Anonymous'}</td>
                <td>
                    <span class="difficulty-badge ${submission.difficulty.toLowerCase()}">
                        ${submission.difficulty}
                    </span>
                </td>
                <td>${submittedDate}</td>
                <td>
                    <button class="btn-small btn-primary" onclick="adminDashboard.reviewSubmission('${submission.id}')">
                        <i class="fas fa-eye"></i>
                        Review
                    </button>
                </td>
            </tr>
        `;
    }

    async reviewSubmission(submissionId) {
        try {
            // Get full submission details
            const submissions = await communityService.getPendingSubmissions();
            this.currentSubmission = submissions.find(s => s.id === submissionId);

            if (!this.currentSubmission) {
                Notify.error('Submission not found');
                return;
            }

            this.showReviewModal();

        } catch (error) {
            console.error('Error loading submission details:', error);
            Notify.error('Failed to load submission details');
        }
    }

    showReviewModal() {
        const modal = document.getElementById('reviewModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        title.textContent = `Review: ${this.currentSubmission.title}`;

        const detailsHTML = `
            <div class="submission-details">
                <div class="detail-row">
                    <strong>Title:</strong>
                    <span>${this.currentSubmission.title}</span>
                </div>
                <div class="detail-row">
                    <strong>Description:</strong>
                    <span>${this.currentSubmission.description}</span>
                </div>
                <div class="detail-row">
                    <strong>Submitted By:</strong>
                    <span>${this.currentSubmission.submittedByName || 'Anonymous'}</span>
                </div>
                <div class="detail-row">
                    <strong>Difficulty:</strong>
                    <span class="difficulty-badge ${this.currentSubmission.difficulty.toLowerCase()}">
                        ${this.currentSubmission.difficulty}
                    </span>
                </div>
                <div class="detail-row">
                    <strong>Category:</strong>
                    <span>${this.currentSubmission.category || 'Not specified'}</span>
                </div>
                <div class="detail-row">
                    <strong>Technologies:</strong>
                    <span>${this.currentSubmission.technologies.join(', ')}</span>
                </div>
                <div class="detail-row">
                    <strong>Source Code:</strong>
                    <a href="${this.currentSubmission.sourceCodeUrl}" target="_blank">
                        ${this.currentSubmission.sourceCodeUrl}
                    </a>
                </div>
                ${this.currentSubmission.liveDemoUrl ? `
                <div class="detail-row">
                    <strong>Live Demo:</strong>
                    <a href="${this.currentSubmission.liveDemoUrl}" target="_blank">
                        ${this.currentSubmission.liveDemoUrl}
                    </a>
                </div>
                ` : ''}
                ${this.currentSubmission.learningOutcomes ? `
                <div class="detail-row">
                    <strong>Learning Outcomes:</strong>
                    <span>${this.currentSubmission.learningOutcomes}</span>
                </div>
                ` : ''}
                ${this.currentSubmission.challenges ? `
                <div class="detail-row">
                    <strong>Challenges:</strong>
                    <span>${this.currentSubmission.challenges}</span>
                </div>
                ` : ''}
            </div>
        `;

        body.innerHTML = detailsHTML;
        modal.style.display = 'flex';
    }

    closeReviewModal() {
        document.getElementById('reviewModal').style.display = 'none';
        this.currentSubmission = null;
    }

    async approveSubmission() {
        if (!this.currentSubmission) return;

        try {
            const success = await communityService.approveSubmission(
                this.currentSubmission.id,
                auth.currentUser.uid
            );

            if (success) {
                this.closeReviewModal();
                this.loadDashboard(); // Refresh the dashboard
            }

        } catch (error) {
            console.error('Error approving submission:', error);
        }
    }

    async rejectSubmission() {
        if (!this.currentSubmission) return;

        // For now, simple rejection without notes
        // In production, you might want to add a notes field
        try {
            const success = await communityService.rejectSubmission(
                this.currentSubmission.id,
                auth.currentUser.uid
            );

            if (success) {
                this.closeReviewModal();
                this.loadDashboard(); // Refresh the dashboard
            }

        } catch (error) {
            console.error('Error rejecting submission:', error);
        }
    }

    showLoading() {
        const container = document.getElementById('submissionsList');
        container.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading submissions...</p>
            </div>
        `;
    }

    showEmptyState() {
        const container = document.getElementById('submissionsList');
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <p>No pending submissions to review</p>
            </div>
        `;
    }

    showError(message) {
        const container = document.getElementById('submissionsList');
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// Global functions for modal buttons
window.closeReviewModal = () => adminDashboard.closeReviewModal();
window.approveSubmission = () => adminDashboard.approveSubmission();
window.rejectSubmission = () => adminDashboard.rejectSubmission();

// Initialize dashboard when DOM is loaded
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new AdminDashboard();
});
