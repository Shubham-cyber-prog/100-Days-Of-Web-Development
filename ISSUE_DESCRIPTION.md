# Issue Description: Global Accessibility (A11y) and SEO Standardization

## Level: 4
## Target: `public/` directory (20+ folders)

### Objective
Standardize SEO and Accessibility across all static projects in the `public/` folder to improve portfolio quality, search engine ranking, and screen-reader compatibility.

### Changes Made
- **Audit & Standardization**: Performed a manual audit of 20 project folders (`Day 01` to `Day 100`).
- **SEO Enhancement**: Added unique `<meta name="description">` tags to each `index.html` to improve search engine indexing and click-through rates.
- **Accessibility Improvement**:
  - Added `aria-label` to interactive elements (buttons, inputs) that were using icons only.
  - Ensured `alt` tags are descriptive or set to empty for decorative images.
  - Standardized `lang="en"` and viewport meta tags where missing or inconsistent.
- **User Experience**: Improved keyboard navigability by ensuring interactive elements have proper roles and labels.

### Files Modified
1. `public/Day 01/index.html`
2. `public/Day 02/index.html`
3. `public/Day 03/index.html`
4. `public/Day 04/index.html`
5. `public/Day 05/index.html`
6. `public/Day 06/index.html`
7. `public/Day 07/index.html`
8. `public/Day 08/index.html`
9. `public/Day 10/index.html`
10. `public/Day 11/index.html`
11. `public/Day 12/index.html`
12. `public/Day 14/index.html`
13. `public/Day 15/index.html`
14. `public/Day 20/index.html`
15. `public/Day 30/index.html`
16. `public/Day 40/index.html`
17. `public/Day 50/index.html`
18. `public/Day 60/index.html`
19. `public/Day 70/index.html`
20. `public/Day 100/index.html`

### Verification
- Ran local static analysis checks for meta tag presence.
- Verified ARIA label correctness against icon intent.
- Ensured no breaking changes to styles or functionality.
