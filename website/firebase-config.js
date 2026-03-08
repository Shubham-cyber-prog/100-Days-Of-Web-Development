/**
 * Firebase Configuration
 * This file initializes Firebase for the 100 Days of Web Development application
 * with Firestore for persistent progress tracking and real-time updates
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, query, orderBy, limit, onSnapshot, writeBatch } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

// Firebase Configuration - Replace with your project credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Initialize Firebase services and check authentication state
 * @returns {Promise<Object>} Returns user info if authenticated
 */
export async function initializeFirebase() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    isAuthenticated: true
                });
            } else {
                resolve({
                    isAuthenticated: false
                });
            }
        }, (error) => {
            reject(error);
        });
    });
}

/**
 * Get current authenticated user
 * @returns {Object|null} Current user or null
 */
export function getCurrentUser() {
    return auth.currentUser;
}

export default {
    app,
    auth,
    db,
    initializeFirebase,
    getCurrentUser
};
