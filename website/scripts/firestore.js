import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    onSnapshot
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase configuration - should match the one in login.js
const firebaseConfig = (() => {
    const defaultConfig = {
        apiKey: "YOUR_API_KEY_HERE",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    if (typeof __firebase_config === 'object' && __firebase_config !== null) {
        return __firebase_config;
    } else if (typeof __firebase_config === 'string' && __firebase_config.trim()) {
        try {
            return JSON.parse(__firebase_config);
        } catch (e) {
            return defaultConfig;
        }
    } else {
        return defaultConfig;
    }
})();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore Service Class
class FirestoreService {
    constructor() {
        this.db = db;
    }

    // User Profile Operations
    async createUserProfile(userId, userData) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const defaultProfile = {
                username: userData.displayName || userData.email.split('@')[0],
                email: userData.email,
                handle: `@${userData.email.split('@')[0]}`,
                avatar: userData.photoURL || '',
                rank: 'Developer',
                level: 1,
                bio: 'Web Developer | Building amazing projects',
                location: '',
                website: '',
                github: '',
                createdAt: new Date(),
                lastLogin: new Date()
            };

            await setDoc(userRef, defaultProfile);
            return defaultProfile;
        } catch (error) {
            console.error('Error creating user profile:', error);
            throw error;
        }
    }

    async getUserProfile(userId) {
        try {
            const userRef = doc(this.db, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                // Update last login
                await updateDoc(userRef, { lastLogin: new Date() });
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting user profile:', error);
            throw error;
        }
    }

    async updateUserProfile(userId, profileData) {
        try {
            const userRef = doc(this.db, 'users', userId);
            await updateDoc(userRef, {
                ...profileData,
                updatedAt: new Date()
            });
            return true;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    // Progress Operations
    async getUserProgress(userId) {
        try {
            const progressRef = doc(this.db, 'progress', userId);
            const progressSnap = await getDoc(progressRef);

            if (progressSnap.exists()) {
                return progressSnap.data();
            } else {
                // Return default progress
                return {
                    completedDays: [],
                    totalProjects: 100,
                    currentStreak: 0,
                    longestStreak: 0,
                    lastCompletedDate: null,
                    createdAt: new Date()
                };
            }
        } catch (error) {
            console.error('Error getting user progress:', error);
            throw error;
        }
    }

    async updateUserProgress(userId, progressData) {
        try {
            const progressRef = doc(this.db, 'progress', userId);
            await setDoc(progressRef, {
                ...progressData,
                updatedAt: new Date()
            }, { merge: true });
            return true;
        } catch (error) {
            console.error('Error updating user progress:', error);
            throw error;
        }
    }

    async updateCompletedDays(userId, completedDays) {
        try {
            const progressRef = doc(this.db, 'progress', userId);
            const currentProgress = await this.getUserProgress(userId);

            // Calculate streaks
            const sortedDays = [...completedDays].sort((a, b) => a - b);
            let currentStreak = 0;
            let longestStreak = currentProgress.longestStreak || 0;

            if (sortedDays.length > 0) {
                const today = new Date();
                const todayDay = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

                // Calculate current streak
                for (let i = sortedDays.length - 1; i >= 0; i--) {
                    if (sortedDays[i] === todayDay - (sortedDays.length - 1 - i)) {
                        currentStreak++;
                    } else {
                        break;
                    }
                }

                // Update longest streak
                longestStreak = Math.max(longestStreak, currentStreak);
            }

            await updateDoc(progressRef, {
                completedDays: completedDays,
                currentStreak: currentStreak,
                longestStreak: longestStreak,
                lastCompletedDate: new Date(),
                updatedAt: new Date()
            });

            return {
                completedDays,
                currentStreak,
                longestStreak
            };
        } catch (error) {
            console.error('Error updating completed days:', error);
            throw error;
        }
    }

<<<<<<< HEAD
    // Get aggregated user statistics
    async getUserStats(userId) {
        try {
            const [progress, profile] = await Promise.all([
                this.getUserProgress(userId),
                this.getUserProfile(userId)
            ]);

            if (!progress || !profile) {
                return null;
        const userRef = doc(this.db, 'users', userId);
        return onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                callback(doc.data());
            }
        });
    }

    // Utility methods
    async initializeUserData(userId, userData) {
        try {
            // Create profile if it doesn't exist
            const existingProfile = await this.getUserProfile(userId);
            if (!existingProfile) {
                await this.createUserProfile(userId, userData);
            }

            // Create progress if it doesn't exist
            const existingProgress = await this.getUserProgress(userId);
            if (!existingProgress.completedDays) {
                await this.updateUserProgress(userId, {
                    completedDays: [],
                    totalProjects: 100,
                    currentStreak: 0,
                    longestStreak: 0,
                    lastCompletedDate: null,
                    createdAt: new Date()
                });
            }

            return true;
        } catch (error) {
            console.error('Error initializing user data:', error);
            throw error;
        }
    }

    // Migration from localStorage
    async migrateLocalStorageData(userId) {
        try {
            // Migrate completed days
            const localCompletedDays = localStorage.getItem('completedDays');
            if (localCompletedDays) {
                const completedDays = JSON.parse(localCompletedDays);
                await this.updateCompletedDays(userId, completedDays);
            }

            // Migrate profile data
            const localProfile = localStorage.getItem('userProfile');
            if (localProfile) {
                const profileData = JSON.parse(localProfile);
                await this.updateUserProfile(userId, profileData);
            }

            // Migrate zenith mission progress
            const zenithProgress = localStorage.getItem('zenith_mission_progress');
            if (zenithProgress) {
                const progressArray = JSON.parse(zenithProgress);
                const completedDays = progressArray.map((completed, index) => completed ? index + 1 : null).filter(day => day !== null);
                await this.updateCompletedDays(userId, completedDays);
            }

            return true;
        } catch (error) {
            console.error('Error migrating localStorage data:', error);
            return false;
        }
    }
<<<<<<< HEAD

    // Forum Operations
    async createPost(userId, postData) {
        try {
            const postsRef = collection(this.db, 'posts');
            const newPost = {
                ...postData,
                authorId: userId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                upvotes: 0,
                upvotedBy: [],
                commentCount: 0
            };
            const docRef = await addDoc(postsRef, newPost);
            return { id: docRef.id, ...newPost };
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async getPosts(category = null, limitCount = 20) {
        try {
            let q = query(collection(this.db, 'posts'), orderBy('createdAt', 'desc'), limit(limitCount));
            if (category) {
                q = query(collection(this.db, 'posts'), where('category', '==', category), orderBy('createdAt', 'desc'), limit(limitCount));
            }
            const querySnapshot = await getDocs(q);
            const posts = [];
            for (const docSnap of querySnapshot.docs) {
                const postData = docSnap.data();
                const authorProfile = await this.getUserProfile(postData.authorId);
                posts.push({
                    id: docSnap.id,
                    ...postData,
                    author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                });
            }
            return posts;
        } catch (error) {
            console.error('Error getting posts:', error);
            throw error;
        }
    }

    async searchPosts(searchTerm, category = null, limitCount = 20) {
        try {
            // Note: Firestore doesn't support full-text search natively, this is a simple title/content search
            let q = query(collection(this.db, 'posts'), orderBy('createdAt', 'desc'));
            if (category) {
                q = query(collection(this.db, 'posts'), where('category', '==', category), orderBy('createdAt', 'desc'));
            }
            const querySnapshot = await getDocs(q);
            const posts = [];
            const term = searchTerm.toLowerCase();
            for (const docSnap of querySnapshot.docs) {
                const postData = docSnap.data();
                if (postData.title.toLowerCase().includes(term) || postData.content.toLowerCase().includes(term)) {
                    const authorProfile = await this.getUserProfile(postData.authorId);
                    posts.push({
                        id: docSnap.id,
                        ...postData,
                        author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                    });
                    if (posts.length >= limitCount) break;
                }
            }
            return posts;
        } catch (error) {
            console.error('Error searching posts:', error);
            throw error;
        }
    }

    async upvotePost(postId, userId) {
        try {
            const postRef = doc(this.db, 'posts', postId);
            const postSnap = await getDoc(postRef);
            if (!postSnap.exists()) throw new Error('Post not found');

            const postData = postSnap.data();
            const hasUpvoted = postData.upvotedBy.includes(userId);

            if (hasUpvoted) {
                // Remove upvote
                await updateDoc(postRef, {
                    upvotes: increment(-1),
                    upvotedBy: arrayRemove(userId)
                });
                return { upvotes: postData.upvotes - 1, upvoted: false };
            } else {
                // Add upvote
                await updateDoc(postRef, {
                    upvotes: increment(1),
                    upvotedBy: arrayUnion(userId)
                });
                return { upvotes: postData.upvotes + 1, upvoted: true };
            }
        } catch (error) {
            console.error('Error upvoting post:', error);
            throw error;
        }
    }

    async addComment(postId, userId, commentData) {
        try {
            const commentsRef = collection(this.db, 'posts', postId, 'comments');
            const newComment = {
                ...commentData,
                authorId: userId,
                createdAt: Timestamp.now(),
                upvotes: 0,
                upvotedBy: []
            };
            const commentDocRef = await addDoc(commentsRef, newComment);

            // Update comment count on post
            const postRef = doc(this.db, 'posts', postId);
            await updateDoc(postRef, {
                commentCount: increment(1)
            });

            return { id: commentDocRef.id, ...newComment };
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }

    async getComments(postId) {
        try {
            const q = query(collection(this.db, 'posts', postId, 'comments'), orderBy('createdAt', 'asc'));
            const querySnapshot = await getDocs(q);
            const comments = [];
            for (const docSnap of querySnapshot.docs) {
                const commentData = docSnap.data();
                const authorProfile = await this.getUserProfile(commentData.authorId);
                comments.push({
                    id: docSnap.id,
                    ...commentData,
                    author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                });
            }
            return comments;
        } catch (error) {
            console.error('Error getting comments:', error);
            throw error;
        }
    }

    async deletePost(postId, userId) {
        try {
            const postRef = doc(this.db, 'posts', postId);
            const postSnap = await getDoc(postRef);
            if (!postSnap.exists()) throw new Error('Post not found');

            const postData = postSnap.data();
            if (postData.authorId !== userId) throw new Error('Unauthorized');

            // Delete comments first
            const commentsQuery = query(collection(this.db, 'posts', postId, 'comments'));
            const commentsSnapshot = await getDocs(commentsQuery);
            const deletePromises = commentsSnapshot.docs.map(doc => doc.ref.delete());
            await Promise.all(deletePromises);

            // Delete post
            await postRef.delete();
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }

    // Project Submission Operations
    async submitProject(userId, projectData) {
        try {
            const submissionsRef = collection(this.db, 'submissions');
            const newSubmission = {
                ...projectData,
                authorId: userId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                averageRating: 0,
                totalRatings: 0,
                reviewCount: 0,
                featured: false
            };
            const docRef = await addDoc(submissionsRef, newSubmission);
            return { id: docRef.id, ...newSubmission };
        } catch (error) {
            console.error('Error submitting project:', error);
            throw error;
        }
    }

    async getSubmissions(limitCount = 20, featuredOnly = false) {
        try {
            let q = query(collection(this.db, 'submissions'), orderBy('createdAt', 'desc'), limit(limitCount));
            if (featuredOnly) {
                q = query(collection(this.db, 'submissions'), where('featured', '==', true), orderBy('createdAt', 'desc'), limit(limitCount));
            }
            const querySnapshot = await getDocs(q);
            const submissions = [];
            for (const docSnap of querySnapshot.docs) {
                const submissionData = docSnap.data();
                const authorProfile = await this.getUserProfile(submissionData.authorId);
                submissions.push({
                    id: docSnap.id,
                    ...submissionData,
                    author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                });
            }
            return submissions;
        } catch (error) {
            console.error('Error getting submissions:', error);
            throw error;
        }
    }

    async searchSubmissions(searchTerm, limitCount = 20) {
        try {
            const q = query(collection(this.db, 'submissions'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const submissions = [];
            const term = searchTerm.toLowerCase();
            for (const docSnap of querySnapshot.docs) {
                const submissionData = docSnap.data();
                if (submissionData.title.toLowerCase().includes(term) ||
                    submissionData.description.toLowerCase().includes(term) ||
                    submissionData.techStack.some(tech => tech.toLowerCase().includes(term))) {
                    const authorProfile = await this.getUserProfile(submissionData.authorId);
                    submissions.push({
                        id: docSnap.id,
                        ...submissionData,
                        author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                    });
                    if (submissions.length >= limitCount) break;
                }
            }
            return submissions;
        } catch (error) {
            console.error('Error searching submissions:', error);
            throw error;
        }
    }

    async rateProject(submissionId, userId, rating) {
        try {
            const ratingRef = doc(this.db, 'submissions', submissionId, 'ratings', userId);
            const ratingSnap = await getDoc(ratingRef);

            const submissionRef = doc(this.db, 'submissions', submissionId);
            const submissionSnap = await getDoc(submissionRef);
            if (!submissionSnap.exists()) throw new Error('Submission not found');

            const submissionData = submissionSnap.data();
            let newAverageRating = submissionData.averageRating;
            let newTotalRatings = submissionData.totalRatings;

            if (ratingSnap.exists()) {
                // Update existing rating
                const oldRating = ratingSnap.data().rating;
                newAverageRating = ((newAverageRating * newTotalRatings) - oldRating + rating) / newTotalRatings;
                await updateDoc(ratingRef, { rating, updatedAt: Timestamp.now() });
            } else {
                // Add new rating
                newTotalRatings += 1;
                newAverageRating = ((newAverageRating * (newTotalRatings - 1)) + rating) / newTotalRatings;
                await setDoc(ratingRef, { rating, userId, createdAt: Timestamp.now(), updatedAt: Timestamp.now() });
            }

            await updateDoc(submissionRef, {
                averageRating: newAverageRating,
                totalRatings: newTotalRatings,
                updatedAt: Timestamp.now()
            });

            return { averageRating: newAverageRating, totalRatings: newTotalRatings };
        } catch (error) {
            console.error('Error rating project:', error);
            throw error;
        }
    }

    async addReview(submissionId, userId, reviewData) {
        try {
            const reviewsRef = collection(this.db, 'submissions', submissionId, 'reviews');
            const newReview = {
                ...reviewData,
                authorId: userId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                upvotes: 0,
                upvotedBy: []
            };
            const reviewDocRef = await addDoc(reviewsRef, newReview);

            // Update review count on submission
            const submissionRef = doc(this.db, 'submissions', submissionId);
            await updateDoc(submissionRef, {
                reviewCount: increment(1),
                updatedAt: Timestamp.now()
            });

            return { id: reviewDocRef.id, ...newReview };
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    }

    async getReviews(submissionId) {
        try {
            const q = query(collection(this.db, 'submissions', submissionId, 'reviews'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const reviews = [];
            for (const docSnap of querySnapshot.docs) {
                const reviewData = docSnap.data();
                const authorProfile = await this.getUserProfile(reviewData.authorId);
                reviews.push({
                    id: docSnap.id,
                    ...reviewData,
                    author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                });
            }
            return reviews;
        } catch (error) {
            console.error('Error getting reviews:', error);
            throw error;
        }
    }

    async upvoteReview(submissionId, reviewId, userId) {
        try {
            const reviewRef = doc(this.db, 'submissions', submissionId, 'reviews', reviewId);
            const reviewSnap = await getDoc(reviewRef);
            if (!reviewSnap.exists()) throw new Error('Review not found');

            const reviewData = reviewSnap.data();
            const hasUpvoted = reviewData.upvotedBy.includes(userId);

            if (hasUpvoted) {
                // Remove upvote
                await updateDoc(reviewRef, {
                    upvotes: increment(-1),
                    upvotedBy: arrayRemove(userId)
                });
                return { upvotes: reviewData.upvotes - 1, upvoted: false };
            } else {
                // Add upvote
                await updateDoc(reviewRef, {
                    upvotes: increment(1),
                    upvotedBy: arrayUnion(userId)
                });
                return { upvotes: reviewData.upvotes + 1, upvoted: true };
            }
        } catch (error) {
            console.error('Error upvoting review:', error);
            throw error;
        }
    }

    async deleteSubmission(submissionId, userId) {
        try {
            const submissionRef = doc(this.db, 'submissions', submissionId);
            const submissionSnap = await getDoc(submissionRef);
            if (!submissionSnap.exists()) throw new Error('Submission not found');

            const submissionData = submissionSnap.data();
            if (submissionData.authorId !== userId) throw new Error('Unauthorized');

            // Delete reviews and ratings first
            const reviewsQuery = query(collection(this.db, 'submissions', submissionId, 'reviews'));
            const reviewsSnapshot = await getDocs(reviewsQuery);
            const deleteReviewPromises = reviewsSnapshot.docs.map(doc => doc.ref.delete());

            const ratingsQuery = query(collection(this.db, 'submissions', submissionId, 'ratings'));
            const ratingsSnapshot = await getDocs(ratingsQuery);
            const deleteRatingPromises = ratingsSnapshot.docs.map(doc => doc.ref.delete());

            await Promise.all([...deleteReviewPromises, ...deleteRatingPromises]);

            // Delete submission
            await submissionRef.delete();
            return true;
        } catch (error) {
            console.error('Error deleting submission:', error);
            throw error;
        }
    }

    // Real-time listeners for submissions
    listenToSubmissions(callback, featuredOnly = false) {
        let q = query(collection(this.db, 'submissions'), orderBy('createdAt', 'desc'));
        if (featuredOnly) {
            q = query(collection(this.db, 'submissions'), where('featured', '==', true), orderBy('createdAt', 'desc'));
        }
        return onSnapshot(q, async (querySnapshot) => {
            const submissions = [];
            for (const docSnap of querySnapshot.docs) {
                const submissionData = docSnap.data();
                const authorProfile = await this.getUserProfile(submissionData.authorId);
                submissions.push({
                    id: docSnap.id,
                    ...submissionData,
                    author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                });
            }
            callback(submissions);
        });
    }

    listenToSubmissionReviews(submissionId, callback) {
        const q = query(collection(this.db, 'submissions', submissionId, 'reviews'), orderBy('createdAt', 'desc'));
        return onSnapshot(q, async (querySnapshot) => {
            const reviews = [];
            for (const docSnap of querySnapshot.docs) {
                const reviewData = docSnap.data();
                const authorProfile = await this.getUserProfile(reviewData.authorId);
                reviews.push({
                    id: docSnap.id,
                    ...reviewData,
                    author: authorProfile ? { username: authorProfile.username, avatar: authorProfile.avatar } : { username: 'Unknown', avatar: '' }
                });
            }
            callback(reviews);
        });
    }
=======
>>>>>>> ee23802683eb6efe8ad810849a6cde25e6df7907
}

// Export singleton instance
export const firestoreService = new FirestoreService();
export { db };
