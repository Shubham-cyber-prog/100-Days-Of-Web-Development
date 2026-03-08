import { db } from '../firebase-config.js';
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    doc,
    updateDoc,
    increment,
    arrayUnion,
    arrayRemove,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { Notify } from '../core/Notify.js';

class CommunityService {
    constructor() {
        this.submissionsRef = collection(db, 'community_submissions');
    }

    /**
     * Get all approved community projects
     */
    async getApprovedProjects() {
        try {
            const q = query(
                this.submissionsRef,
                where('status', '==', 'approved'),
                orderBy('submittedAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const projects = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                projects.push({
                    id: doc.id,
                    ...data,
                    // Convert Firestore timestamp to JavaScript Date
                    submittedAt: data.submittedAt?.toDate(),
                    reviewedAt: data.reviewedAt?.toDate()
                });
            });

            return projects;
        } catch (error) {
            console.error('Error fetching approved projects:', error);
            Notify.error('Failed to load community projects');
            return [];
        }
    }

    /**
     * Get pending submissions for admin review
     */
    async getPendingSubmissions() {
        try {
            const q = query(
                this.submissionsRef,
                where('status', '==', 'pending'),
                orderBy('submittedAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            const submissions = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                submissions.push({
                    id: doc.id,
                    ...data,
                    submittedAt: data.submittedAt?.toDate()
                });
            });

            return submissions;
        } catch (error) {
            console.error('Error fetching pending submissions:', error);
            return [];
        }
    }

    /**
     * Approve a submission
     */
    async approveSubmission(submissionId, adminId, reviewNotes = null) {
        try {
            const submissionRef = doc(this.submissionsRef, submissionId);
            await updateDoc(submissionRef, {
                status: 'approved',
                reviewedAt: serverTimestamp(),
                reviewedBy: adminId,
                reviewNotes: reviewNotes
            });

            Notify.success('Submission approved successfully');
            return true;
        } catch (error) {
            console.error('Error approving submission:', error);
            Notify.error('Failed to approve submission');
            return false;
        }
    }

    /**
     * Reject a submission
     */
    async rejectSubmission(submissionId, adminId, reviewNotes = null) {
        try {
            const submissionRef = doc(this.submissionsRef, submissionId);
            await updateDoc(submissionRef, {
                status: 'rejected',
                reviewedAt: serverTimestamp(),
                reviewedBy: adminId,
                reviewNotes: reviewNotes
            });

            Notify.success('Submission rejected');
            return true;
        } catch (error) {
            console.error('Error rejecting submission:', error);
            Notify.error('Failed to reject submission');
            return false;
        }
    }

    /**
     * Vote on a community project
     */
    async voteOnProject(projectId, userId, voteType) {
        try {
            const projectRef = doc(this.submissionsRef, projectId);

            // Get current project data
            const projectDoc = await getDocs(query(this.submissionsRef, where('__name__', '==', projectId)));
            const projectData = projectDoc.docs[0]?.data();

            if (!projectData) {
                throw new Error('Project not found');
            }

            // Check if user already voted
            const existingVote = projectData.votes?.find(vote => vote.userId === userId);

            if (existingVote) {
                if (existingVote.type === voteType) {
                    // Remove vote if same type
                    await updateDoc(projectRef, {
                        votes: arrayRemove(existingVote),
                        voteCount: increment(existingVote.type === 'up' ? -1 : 1)
                    });
                    return { action: 'removed', type: voteType };
                } else {
                    // Change vote type
                    const newVote = { userId, type: voteType, timestamp: serverTimestamp() };
                    await updateDoc(projectRef, {
                        votes: arrayRemove(existingVote),
                        votes: arrayUnion(newVote),
                        voteCount: increment(voteType === 'up' ? 2 : -2)
                    });
                    return { action: 'changed', type: voteType };
                }
            } else {
                // Add new vote
                const newVote = { userId, type: voteType, timestamp: serverTimestamp() };
                await updateDoc(projectRef, {
                    votes: arrayUnion(newVote),
                    voteCount: increment(voteType === 'up' ? 1 : -1)
                });
                return { action: 'added', type: voteType };
            }
        } catch (error) {
            console.error('Error voting on project:', error);
            Notify.error('Failed to vote on project');
            throw error;
        }
    }

    /**
     * Add a comment to a project
     */
    async addComment(projectId, userId, userName, commentText) {
        try {
            const projectRef = doc(this.submissionsRef, projectId);
            const newComment = {
                id: Date.now().toString(),
                userId,
                userName,
                text: commentText,
                timestamp: serverTimestamp(),
                votes: 0,
                replies: []
            };

            await updateDoc(projectRef, {
                comments: arrayUnion(newComment)
            });

            return newComment;
        } catch (error) {
            console.error('Error adding comment:', error);
            Notify.error('Failed to add comment');
            throw error;
        }
    }

    /**
     * Get project details with comments
     */
    async getProjectDetails(projectId) {
        try {
            const projectRef = doc(this.submissionsRef, projectId);
            const projectDoc = await getDocs(query(this.submissionsRef, where('__name__', '==', projectId)));

            if (projectDoc.empty) {
                throw new Error('Project not found');
            }

            const data = projectDoc.docs[0].data();
            return {
                id: projectDoc.docs[0].id,
                ...data,
                submittedAt: data.submittedAt?.toDate(),
                reviewedAt: data.reviewedAt?.toDate(),
                comments: data.comments?.map(comment => ({
                    ...comment,
                    timestamp: comment.timestamp?.toDate()
                })) || []
            };
        } catch (error) {
            console.error('Error fetching project details:', error);
            throw error;
        }
    }

    /**
     * Get user's voting status for a project
     */
    getUserVoteStatus(project, userId) {
        if (!project.votes || !userId) return null;
        const userVote = project.votes.find(vote => vote.userId === userId);
        return userVote ? userVote.type : null;
    }

    /**
     * Get vote count for a project
     */
    getVoteCount(project) {
        return project.voteCount || 0;
    }

    /**
     * Format project data for display in the grid
     */
    formatProjectForGrid(project) {
        return {
            id: project.id,
            day: `C${project.id.slice(-4)}`, // Community project ID
            title: project.title,
            tech: project.technologies,
            difficulty: project.difficulty,
            category: project.category,
            liveLink: project.liveDemoUrl,
            codeLink: project.sourceCodeUrl,
            description: project.description,
            submittedBy: project.submittedByName,
            submittedAt: project.submittedAt,
            votes: this.getVoteCount(project),
            comments: project.comments?.length || 0,
            isCommunity: true
        };
    }
}

export default new CommunityService();
