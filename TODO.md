# User Dashboard for Progress Tracking Implementation

## Tasks to Complete

- [ ] Update `website/pages/dashboard.html`: Add sections for user stats, progress heatmap, project list, and profile settings modal
- [ ] Update `website/scripts/pages/dashboard.js`: Enhance to load user data, render progress heatmap, update stats, handle profile edits
- [ ] Create `website/styles/pages/dashboard.css`: Styles for dashboard layout, progress grid, stats cards, charts, responsive design
- [ ] Update `website/scripts/firestore.js`: Add `getUserStats` method for aggregated statistics
- [ ] Update `index.html`: Add "Dashboard" link in navigation menu, visible only for logged-in users
- [ ] Test dashboard functionality (load stats, update progress, profile edits) and ensure auth integration
- [ ] Verify responsive design and mobile compatibility

# Project Submission and Review System Implementation

## Tasks to Complete

- [ ] Create `website/pages/submissions.html`: New page with submission form, submissions list, and review interface
- [ ] Create `website/scripts/pages/submissions.js`: Handle form submission, load submissions with reviews/ratings, real-time updates
- [ ] Create `website/styles/pages/submissions.css`: Styles for submission forms, review cards, star ratings, and responsive design
- [ ] Update `website/scripts/firestore.js`: Add submitProject, getSubmissions, addReview, rateProject methods with real-time listeners
- [ ] Update `website/pages/projects.html`: Add navigation link to submissions page and featured projects section
- [ ] Test submission functionality, review/rating system, and moderation
- [ ] Ensure real-time updates work and UI is responsive
