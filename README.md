<p align="center">
  <img
    src="https://github.com/user-attachments/assets/c080e4ae-221e-422a-92db-a8525edeef07"
    alt="100 Days 100 Projects"
    width="60%"
  />
</p>

<img src="https://github.com/Mayur-Pagote/README_Design_Kit/blob/45123f007c79aa8d0c8d9b11b3ff72d6bf4744c7/Assets/Star%20Light%20Line.gif" width="100%">

Level up your **frontend skills** with this **100 Days of Web Development Challenge** using **HTML, CSS & JavaScript**. Build **mini-projects**, practice **daily coding**, and create a **portfolio-worthy collection**!

![HTML](https://img.shields.io/badge/HTML5-orange?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS3-blue?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=javascript)
![GitHub Repo Size](https://img.shields.io/github/repo-size/Shubham-cyber-prog/100-Days-Of-Web-Development?style=for-the-badge)
![GitHub Stars](https://img.shields.io/github/stars/Shubham-cyber-prog/100-Days-Of-Web-Development?style=for-the-badge)

🔗 **Join our Discord community:** [Click Here](https://discord.gg/BFTWMU6p)

---

## 📌 About This Challenge

This repository documents my **100 Days of Web Development journey**, where I:

- Learn and **practice frontend fundamentals** daily.
- Build **mini-projects & real-world apps**.
- Track progress with **interactive tools & visuals**.
- Strengthen **problem-solving & coding consistency**.

---

## ✨ Key Features

- **🎯 Daily Projects**: 100 carefully crafted mini-projects.
- **📊 Progress Tracker**: Interactive heatmap to visualize coding streaks.
- **🗂️ Project Compendium**: Searchable and filterable project list.
- **🔒 Login/Signup UI**: Sleek static authentication interface (dummy credentials only).

> 💡 _Note: The login/signup UI is for demonstration purposes only and does not store real data._

---

## 🔧 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, TypeScript
- **Version Control**: Git & GitHub
- **Backend**: NodeJS, ExpressJS, Python

---

## 🌟 Get Involved

- Fork this repo ⭐
- Contribute mini-projects or enhancements
- Share your progress on social media using **#100DaysOfWebDev**

## 🎯 Challenge Goals

- ✅ Master HTML, CSS & JavaScript fundamentals
- ✅ Build real-world frontend projects
- ✅ Improve GitHub contribution consistency
- ✅ Prepare for Open Source, Internships & GSoC
- ✅ Build a strong developer portfolio

---

## 📂 Repository Structure

```
100-Days-Of-Web-Development/
│
├── 📁 public/                             # Daily Projects
│   ├── 📁 Day 01
│   ├── 📁 Day 02
│   ├── 📁 Day 03... (and so on)
│   └── 📁 Day 100 + extended 50
│
├── 📁 website/                            # Zenith Portfolio Site
│   ├── 📁 assets/                         # Images, Fonts, Icons
│   ├── 📁 pages/                          # HTML Pages (Login, Home, Projects...)
│   ├── 📁 styles/                         # Modular CSS System
│   └── 📁 scripts/                        # Logic & Connectors
│
├── 📄 index.html                          # Entry Redirect (Auth Gate)
├── 📄 README.md                           # Documentation
└── 📄 CONTRIBUTING.md                     # Contribution Guidelines
```

---

## 🚀 Setup Guide for New Contributors

Welcome to the **100 Days of Web Development** challenge! Follow these steps to get started as a contributor:

### Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- Git installed on your system
- A code editor (e.g., VS Code, Sublime Text)
- A GitHub account

### Steps to Contribute

1. **Fork the Repository**: Click the "Fork" button on the top right of this repository's page on GitHub.
2. **Clone Your Fork**: Open your terminal and run:
   ```
   git clone https://github.com/your-username/100-Days-Of-Web-Development.git
   cd 100-Days-Of-Web-Development
   ```
3. **Set Up the Development Environment**:
   - Ensure you have Node.js installed (for any JS tooling if needed).
   - Open the project in your code editor.
   - For projects using external APIs, obtain necessary API keys (e.g., for weather apps).
   - **For Firebase-enabled projects**: Follow the Firebase setup guide below.
4. **Create a New Branch**: Always work on a new branch for your changes:
   ```
   git checkout -b feature/your-feature-name
   ```
5. **Make Your Changes**: Add your project or improvements following the repository structure.
6. **Test Your Changes**: Open the project in a browser to ensure it works correctly.
7. **Commit and Push**:
   ```
   git add .
   git commit -m "Add brief description of your changes"
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request**: Go to the original repository and create a PR with a clear description.

### Additional Tips

- Follow the project naming conventions (e.g., `day-XX-project-name`).
- Ensure your code is well-commented and follows best practices.
- Check the `CONTRIBUTING.md` file for more detailed guidelines.

---

## 📋 Project Template for Quick Start

To accelerate your development process, use the pre-built templates in the `templates/` folder. These provide a solid foundation for common project types.

### Available Templates

- **HTML Template**: Basic HTML structure with meta tags, header, and footer.
- **CSS Template**: Starter CSS with variables, utilities, and responsive design helpers.
- **JS Template**: JavaScript boilerplate with common functions and event handlers.
- **API Template**: Setup for projects involving external APIs (e.g., fetch requests).
- **Component Library**: Reusable UI components (buttons, forms, etc.).

### How to Use a Template

1. Navigate to the `templates/` folder.
2. Copy the desired template folder to your project directory (e.g., `BEGINNER/day-XX-your-project/`).
3. Rename files as needed and customize the content.
4. Integrate with your project's specific requirements.

### Example: Starting a New Todo List Project

```
cp -r templates/html-template BEGINNER/day-03-todo-list/
cp -r templates/css-template BEGINNER/day-03-todo-list/
cp -r templates/js-template BEGINNER/day-03-todo-list/
```

Then, modify the files to build your todo list functionality.

---

## 🔄 Git Workflow Guidelines

To maintain a clean and collaborative codebase, follow these Git workflow guidelines:

### Branching Strategy

- **Main Branch**: `main` is the production-ready branch. Only merge tested, reviewed code.
- **Feature Branches**: Use `feature/description` for new features or projects.
- **Bugfix Branches**: Use `bugfix/description` for bug fixes.
- **Hotfix Branches**: Use `hotfix/description` for urgent fixes.

### Commit Guidelines

- Write clear, concise commit messages (e.g., "Add responsive design to landing page").
- Use present tense (e.g., "Fix bug" not "Fixed bug").
- Reference issue numbers if applicable (e.g., "Fix #123: Resolve mobile layout issue").

### Pull Request Process

1. Ensure your branch is up-to-date with `main`:
   ```
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```
2. Create a PR with:
   - Descriptive title
   - Detailed description of changes
   - Screenshots/videos if UI changes
   - Testing instructions
3. Request reviews from maintainers.
4. Address feedback and make necessary changes.
5. Once approved, merge using "Squash and merge" to keep history clean.

### Best Practices

- Keep commits atomic (one logical change per commit).
- Avoid force pushes to shared branches.
- Regularly sync your fork with the upstream repository.
- Use `.gitignore` to exclude unnecessary files (e.g., `node_modules/`, `.env`).

---

## 🔥 Firebase Setup Guide

Some projects in this repository (such as the login system and Day 88) use **Firebase** for authentication and database functionality. To run these projects, you'll need to set up your own Firebase project.

### Why You Need Your Own Firebase Project

⚠️ **Security Notice**: Firebase credentials in this repository have been replaced with placeholders. For security and billing reasons, you must create your own Firebase project and use your own credentials.

### Step-by-Step Setup

#### 1. Create a Firebase Account

- Go to [Firebase Console](https://console.firebase.google.com/)
- Sign in with your Google account
- Click "Add Project" or "Create a Project"

#### 2. Create a New Firebase Project

- Enter a project name (e.g., "100-days-dev-project")
- Accept the terms and click "Continue"
- (Optional) Enable Google Analytics
- Click "Create Project" and wait for setup to complete

#### 3. Register Your Web App

- In your Firebase project dashboard, click the **Web icon** (`</>`) to add a web app
- Enter an app nickname (e.g., "My Web App")
- Check "Also set up Firebase Hosting" if you want to deploy (optional)
- Click "Register app"

#### 4. Get Your Firebase Configuration

- After registration, Firebase will display your configuration object:
  ```javascript
  const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.firebasestorage.app",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef",
    measurementId: "G-XXXXXXXXXX", // (if Analytics enabled)
  };
  ```
- **Copy this entire configuration object**

#### 5. Enable Firebase Authentication

- In Firebase Console, go to **Build** → **Authentication**
- Click "Get Started"
- Go to **Sign-in method** tab
- Enable the authentication methods you need:
  - **Email/Password** (for login.html)
  - **Anonymous** (for guest login and Day 88)
  - Others as needed (Google, GitHub, etc.)

#### 6. Enable Firestore Database (for Day 88)

- In Firebase Console, go to **Build** → **Firestore Database**
- Click "Create database"
- Choose **Start in test mode** (for development)
  - ⚠️ **Important**: Test mode allows unrestricted access. Change security rules before production!
- Select a Cloud Firestore location (choose closest to you)
- Click "Enable"

#### 7. Update Your Project Files

Replace the placeholder values in the following files with your Firebase configuration:

**For Login System** (`website/pages/login.html`):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace with your actual values
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

**For Day 88 Project** (`public/Day 88/index.html` and `public/Day 88/script.js`):

```javascript
const firebaseConfig =
  typeof __firebase_config !== "undefined"
    ? JSON.parse(__firebase_config)
    : {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID",
      };
```

#### 8. Security Rules (Important!)

Before deploying or sharing your project, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users only
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Best Practices

✅ **DO:**

- Create your own Firebase project for development and testing
- Keep your Firebase config separate from version control (use `.env` files for production)
- Set proper security rules before deploying
- Monitor usage in Firebase Console to avoid unexpected charges
- Use Firebase's free tier limits wisely

❌ **DON'T:**

- Share your Firebase credentials publicly
- Use someone else's Firebase project
- Leave security rules in "test mode" for production
- Commit sensitive credentials to GitHub

### Troubleshooting

**Error: "Firebase: Error (auth/invalid-api-key)"**

- Double-check that you've replaced ALL placeholder values with your actual Firebase config

**Error: "Missing or insufficient permissions"**

- Check your Firestore security rules
- Ensure authentication is properly enabled

**Login not working:**

- Verify Email/Password authentication is enabled in Firebase Console
- Check browser console for specific error messages

---


## 🏆 Hall of Fame

Thank you to everyone who has contributed to this project! 🙌
We appreciate your support, commits, issues, ideas, and pull requests 💜

<p align="center">
  <!-- Contributors from GitHub -->
  <a href="https://github.com/Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=Shubham-cyber-prog/100-Days-Of-Web-Development-ECWoC26" />
  </a>
</p>

## Accessibility

This project includes a built-in accessibility checker tool:

- Image alt text validator
- Color contrast checker
- Keyboard navigation testing
- WCAG 2.1 checklist

Open in browser:
accessibility-checker.html


> *Every contributor brings this project closer to excellence!*

