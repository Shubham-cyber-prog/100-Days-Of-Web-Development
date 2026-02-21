import { auth, db } from '../firebase-config.js';
import {
    collection,
    addDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { Notify } from '../core/Notify.js';

// Technology tags management
class TechTagsManager {
    constructor() {
        this.tags = new Set();
        this.input = document.getElementById('techInput');
        this.tagsContainer = document.getElementById('techTags');
        this.init();
    }

    init() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addTag(this.input.value.trim());
            }
        });
    }

    addTag(tag) {
        if (!tag || this.tags.has(tag)) return;

        this.tags.add(tag);
        this.renderTags();
        this.input.value = '';
    }

    removeTag(tag) {
        this.tags.delete(tag);
        this.renderTags();
    }

    renderTags() {
        this.tagsContainer.innerHTML = '';

        this.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tech-tag';
            tagElement.innerHTML = `
                ${tag}
                <span class="remove-tag" data-tag="${tag}">&times;</span>
            `;

            tagElement.querySelector('.remove-tag').addEventListener('click', () => {
                this.removeTag(tag);
            });

            this.tagsContainer.appendChild(tagElement);
        });
    }

    getTags() {
        return Array.from(this.tags);
    }
}

// File upload handler
class FileUploadManager {
    constructor() {
        this.files = [];
        this.input = document.getElementById('projectScreenshots');
        this.maxFiles = 3;
        this.maxSize = 5 * 1024 * 1024; // 5MB
        this.init();
    }

    init() {
        this.input.addEventListener('change', (e) => {
            this.handleFileSelection(e.target.files);
        });
    }

    handleFileSelection(fileList) {
        const newFiles = Array.from(fileList);

        // Check total files
        if (this.files.length + newFiles.length > this.maxFiles) {
            Notify.error(`Maximum ${this.maxFiles} screenshots allowed`);
            return;
        }

        // Validate each file
        for (const file of newFiles) {
            if (!this.isValidFile(file)) {
                Notify.error(`Invalid file: ${file.name}. Only PNG, JPG, JPEG allowed, max 5MB each.`);
                return;
            }
        }

        this.files.push(...newFiles);
        Notify.success(`${newFiles.length} file(s) selected`);
    }

    isValidFile(file) {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return allowedTypes.includes(file.type) && file.size <= this.maxSize;
    }

    getFiles() {
        return this.files;
    }

    clear() {
        this.files = [];
        this.input.value = '';
    }
}

// Form submission handler
class ProjectSubmissionManager {
    constructor() {
        this.form = document.getElementById('projectSubmissionForm');
        this.techManager = new TechTagsManager();
        this.fileManager = new FileUploadManager();
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        try {
            this.isSubmitting = true;
            this.setLoadingState(true);

            // Validate form
            if (!this.validateForm()) {
                return;
            }

            // Check authentication
            if (!auth.currentUser) {
                Notify.error('Please log in to submit a project');
                window.location.href = '../pages/login.html';
                return;
            }

            // Prepare submission data
            const submissionData = this.prepareSubmissionData();

            // Submit to Firestore
            await this.submitToFirestore(submissionData);

            // Success
            Notify.success('Project submitted successfully! It will be reviewed by maintainers.');
            this.resetForm();

            // Redirect after delay
            setTimeout(() => {
                window.location.href = 'projects.html';
            }, 2000);

        } catch (error) {
            console.error('Submission error:', error);
            Notify.error('Failed to submit project. Please try again.');
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(false);
        }
    }

    validateForm() {
        const title = document.getElementById('projectTitle').value.trim();
        const description = document.getElementById('projectDescription').value.trim();
        const sourceCodeUrl = document.getElementById('sourceCodeUrl').value.trim();
        const difficulty = document.getElementById('projectDifficulty').value;
        const technologies = this.techManager.getTags();

        if (!title) {
            Notify.error('Project title is required');
            return false;
        }

        if (!description) {
            Notify.error('Project description is required');
            return false;
        }

        if (!sourceCodeUrl) {
            Notify.error('Source code URL is required');
            return false;
        }

        if (!difficulty) {
            Notify.error('Difficulty level is required');
            return false;
        }

        if (technologies.length === 0) {
            Notify.error('At least one technology must be specified');
            return false;
        }

        // Validate URLs
        if (!this.isValidUrl(sourceCodeUrl)) {
            Notify.error('Please enter a valid source code URL');
            return false;
        }

        const liveDemoUrl = document.getElementById('liveDemoUrl').value.trim();
        if (liveDemoUrl && !this.isValidUrl(liveDemoUrl)) {
            Notify.error('Please enter a valid live demo URL');
            return false;
        }

        return true;
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    prepareSubmissionData() {
        const formData = new FormData(this.form);

        return {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            difficulty: formData.get('difficulty'),
            category: formData.get('category') || null,
            liveDemoUrl: formData.get('liveDemoUrl')?.trim() || null,
            sourceCodeUrl: formData.get('sourceCodeUrl').trim(),
            technologies: this.techManager.getTags(),
            learningOutcomes: formData.get('learningOutcomes')?.trim() || null,
            challenges: formData.get('challenges')?.trim() || null,
            futureImprovements: formData.get('futureImprovements')?.trim() || null,
            screenshots: this.fileManager.getFiles(), // Note: In a real implementation, you'd upload these to storage
            status: 'pending',
            submittedBy: auth.currentUser.uid,
            submittedByName: auth.currentUser.displayName || auth.currentUser.email,
            submittedAt: serverTimestamp(),
            reviewedAt: null,
            reviewedBy: null,
            reviewNotes: null,
            votes: 0,
            comments: []
        };
    }

    async submitToFirestore(data) {
        const submissionsRef = collection(db, 'community_submissions');
        await addDoc(submissionsRef, data);
    }

    setLoadingState(loading) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.classList.toggle('loading', loading);
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? 'Submitting...' : 'Submit Project';
    }

    resetForm() {
        this.form.reset();
        this.techManager.tags.clear();
        this.techManager.renderTags();
        this.fileManager.clear();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is authenticated
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // Redirect to login if not authenticated
            Notify.info('Please log in to submit a community project');
            setTimeout(() => {
                window.location.href = '../pages/login.html';
            }, 2000);
            return;
        }

        // Initialize submission manager
        new ProjectSubmissionManager();
    });
});
