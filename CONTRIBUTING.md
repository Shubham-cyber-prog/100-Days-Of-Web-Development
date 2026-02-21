# Contributing to ECWoc ’26  
## 100 Days Of Web Development 🚀

Welcome to **100 Days Of Web Development**, an open-source initiative under **ECWoc ’26** aimed at helping beginners and intermediates grow their web development skills through daily challenges and real-world projects.

We’re excited to have you here! 🎉  
Every contribution—big or small—matters.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Who Can Contribute?](#who-can-contribute)
- [Ways to Contribute](#ways-to-contribute)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contribution Workflow](#contribution-workflow)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Code & Content Standards](#code--content-standards)
- [Commit Message Convention](#commit-message-convention)
- [Review Process](#review-process)
- [Code of Conduct](#code-of-conduct)
- [Need Help?](#need-help)
- [Acknowledgements](#acknowledgements)

---

## 📖 About the Project

**100 Days Of Web Development** is a structured learning challenge designed to cover:

- HTML, CSS, JavaScript
- Responsive Design
- Git & GitHub
- Frontend Projects
- Beginner-friendly concepts with hands-on practice

This repository is **community-driven**, beginner-friendly, and open to everyone participating in **ECWoc ’26**.

---

## 👥 Who Can Contribute?

Anyone can contribute!  
You don’t need to be an expert.

✔ Beginners  
✔ Students  
✔ Open-source enthusiasts  
✔ ECWoc ’26 participants  
✔ Frontend developers  

If you can **learn**, you can **contribute** 💙

---

## 🛠 Ways to Contribute

You can help in many ways:

### 📚 Content Contributions
- Add new daily challenges
- Improve explanations
- Add examples or diagrams
- Fix typos or grammar

### 💻 Code Contributions
- Add mini projects
- Improve existing code
- Optimize HTML/CSS/JS
- Improve responsiveness

### 📄 Documentation
- Improve README files
- Add learning resources
- Write guides or tutorials

### 🐞 Bug Fixes
- Fix broken links
- Resolve UI issues
- Correct code errors

### 💡 Ideas & Suggestions
- Suggest new challenge ideas
- Propose project improvements

---

## 🗂 Project Structure
```
100-days-web-projects/
│
├── 📁 README.md                           # Main project overview
├── 📁 progress-tracker.md                 # Check off completed projects
├── 📁 resources.md                        # Learning resources
│
├── 📁 BEGINNER (Days 1-30)                # Basic Projects
│   │
│   ├── 📁 day-01-personal-portfolio/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── README.md
│   │
│   ├── 📁 day-02-responsive-landing-page/
│   ├── 📁 day-03-todo-list/
│   ├── 📁 day-04-weather-app/
│   ├── 📁 day-05-calculator/
│   ├── 📁 day-06-quiz-app/
│   ├── 📁 day-07-expense-tracker/
│   ├── 📁 day-08-pomodoro-timer/
│   ├── 📁 day-09-note-taking-app/
│   ├── 📁 day-10-recipe-book/
│   ├── 📁 day-11-blog-website/
│   ├── 📁 day-12-ecommerce-product-page/
│   ├── 📁 day-13-chat-ui/
│   ├── 📁 day-14-music-player/
│   ├── 📁 day-15-drawing-app/
│   ├── 📁 day-16-password-generator/
│   ├── 📁 day-17-unit-converter/
│   ├── 📁 day-18-countdown-timer/
│   ├── 📁 day-19-tip-calculator/
│   ├── 📁 day-20-qr-code-generator/
│   ├── 📁 day-21-flashcards-app/
│   ├── 📁 day-22-markdown-previewer/
│   ├── 📁 day-23-currency-converter/
│   ├── 📁 day-24-bmi-calculator/
│   ├── 📁 day-25-random-quote-generator/
│   ├── 📁 day-26-image-gallery/
│   ├── 📁 day-27-dice-roller/
│   ├── 📁 day-28-rock-paper-scissors/
│   ├── 📁 day-29-memory-game/
│   └── 📁 day-30-tic-tac-toe/
│
├── 📁 INTERMEDIATE (Days 31-60)           # Intermediate Projects
│   │
│   ├── 📁 day-31-job-board/
│   ├── 📁 day-32-social-media-dashboard/
│   ├── 📁 day-33-real-estate-website/
│   ├── 📁 day-34-hotel-booking-system/
│   ├── 📁 day-35-food-delivery-app/
│   ├── 📁 day-36-fitness-tracker/
│   ├── 📁 day-37-event-management/
│   ├── 📁 day-38-booking-appointment-system/
│   ├── 📁 day-39-online-learning-platform/
│   ├── 📁 day-40-movie-database/
│   ├── 📁 day-41-github-profile-finder/
│   ├── 📁 day-42-stock-market-tracker/
│   ├── 📁 day-43-news-aggregator/
│   ├── 📁 day-44-chat-application/
│   ├── 📁 day-45-project-management-tool/
│   ├── 📁 day-46-ecommerce-cart/
│   ├── 📁 day-47-banking-dashboard/
│   ├── 📁 day-48-flight-booking-system/
│   ├── 📁 day-49-recipe-sharing-platform/
│   ├── 📁 day-50-blog-with-cms/
│   ├── 📁 day-51-portfolio-with-blog/
│   ├── 📁 day-52-task-management-board/
│   ├── 📁 day-53-file-uploader/
│   ├── 📁 day-54-code-editor/
│   ├── 📁 day-55-voice-notes-app/
│   ├── 📁 day-56-expense-splitter/
│   ├── 📁 day-57-habit-tracker/
│   ├── 📁 day-58-budget-planner/
│   ├── 📁 day-59-meal-planner/
│   └── 📁 day-60-travel-planner/
│
├── 📁 ADVANCED (Days 61-90)               # Advanced Projects
│   │
│   ├── 📁 day-61-fullstack-ecommerce/
│   ├── 📁 day-62-social-network/
│   ├── 📁 day-63-video-conferencing/
│   ├── 📁 day-64-online-code-editor/
│   ├── 📁 day-65-real-time-collaboration/
│   ├── 📁 day-66-stock-trading-simulator/
│   ├── 📁 day-67-multiplayer-game/
│   ├── 📁 day-68-ai-chatbot/
│   ├── 📁 day-69-blockchain-explorer/
│   ├── 📁 day-70-data-visualization-dashboard/
│   ├── 📁 day-71-crypto-wallet/
│   ├── 📁 day-72-iot-dashboard/
│   ├── 📁 day-73-machine-learning-ui/
│   ├── 📁 day-74-voice-assistant/
│   ├── 📁 day-75-ar-web-app/
│   ├── 📁 day-76-pwa-news-app/
│   ├── 📁 day-77-real-time-analytics/
│   ├── 📁 day-78-document-editor/
│   ├── 📁 day-79-email-client/
│   ├── 📁 day-80-project-management-saas/
│   ├── 📁 day-81-healthcare-portal/
│   ├── 📁 day-82-elearning-platform/
│   ├── 📁 day-83-recruitment-platform/
│   ├── 📁 day-84-real-time-chat-support/
│   ├── 📁 day-85-auction-platform/
│   ├── 📁 day-86-freelance-marketplace/
│   ├── 📁 day-87-music-streaming/
│   ├── 📁 day-88-video-streaming/
│   ├── 📁 day-89-smart-home-dashboard/
│   └── 📁 day-90-enterprise-crm/
│
├── 📁 CAPSTONE (Days 91-100)              # Final Projects
│   │
│   ├── 📁 day-91-92-microservices-project/
│   ├── 📁 day-93-94-open-source-contribution/
│   ├── 📁 day-95-96-fullstack-application/
│   ├── 📁 day-97-98-complex-dashboard/
│   └── 📁 day-99-100-master-project/
│
├── 📁 templates/                          # Reusable templates
│   ├── 📁 html-template/
│   ├── 📁 css-template/
│   ├── 📁 js-template/
│   ├── 📁 api-template/
│   └── 📁 component-library/
│
├── 📁 assets/                             # Shared assets
│   ├── 📁 images/
│   ├── 📁 icons/
│   ├── 📁 fonts/
│   └── 📁 styles/
│       ├── variables.css
│       ├── utilities.css
│       └── animations.css
│
├── 📁 tools/                              # Development tools
│   ├── 📁 generators/
│   │   ├── component-generator.js
│   │   └── project-scaffold.js
│   ├── 📁 scripts/
│   └── 📁 config/
│
└── 📁 packages.json
```


> Please follow the existing structure when adding new content.

---

## 🚀 Getting Started

1. **Fork** this repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/100-Days-Of-Web-Development.git

---

## ♿ Accessibility Guidelines

All projects must meet WCAG 2.1 AA accessibility standards. Our CI pipeline automatically tests accessibility using Lighthouse CI.

### Minimum Requirements

- **Accessibility Score**: Minimum 90/100 on Lighthouse
- **Color Contrast**: 4.5:1 ratio for normal text, 3:1 for large text
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Reader Support**: Proper semantic HTML and ARIA labels

### Common Accessibility Issues and Fixes

#### 1. Missing Image Alt Text
```html
<!-- Bad -->
<img src="photo.jpg">

<!-- Good -->
<img src="photo.jpg" alt="Team photo at hackathon">
```

#### 2. Poor Color Contrast
```css
/* Bad - contrast ratio 2.1:1 */
.text { color: #888; background: #fff; }

/* Good - contrast ratio 7.5:1 */
.text { color: #595959; background: #fff; }
```

#### 3. Missing Form Labels
```html
<!-- Bad -->
<input type="text" placeholder="Name">

<!-- Good -->
<label for="name">Name</label>
<input type="text" id="name" name="name">
```

#### 4. Missing Document Language
```html
<!-- Bad -->
<html>

<!-- Good -->
<html lang="en">
```

#### 5. Non-semantic Interactive Elements
```html
<!-- Bad -->
<div onclick="doSomething()">Click me</div>

<!-- Good -->
<button onclick="doSomething()">Click me</button>
```

### Running Lighthouse Locally

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run accessibility audit
lighthouse http://localhost:3000 --only-categories=accessibility --view
```

### Testing Keyboard Navigation

1. Use Tab key to navigate through all interactive elements
2. Ensure focus indicators are visible
3. Test with Enter/Space for activation
4. Escape should close modals/dialogs

### Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Accessibility](https://web.dev/learn/accessibility/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

