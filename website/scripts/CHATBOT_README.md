# 🤖 Chatbot Assistant

This document describes the **Chatbot Assistant** feature added to the website for the **100 Days of Web Development** platform.

The chatbot is designed to improve user onboarding and engagement while keeping the implementation lightweight, modular, and open-source safe.

---

## 🎯 Purpose

The chatbot helps users:

- Understand the 100 Days of Web Development challenge
- Navigate the website and its workflow
- Get quick answers to common questions
- Feel guided instead of overwhelmed on first visit

---

## ✨ Features

- Floating chatbot widget available across the website
- Toggle-based open and close interaction
- Clean UI aligned with the website’s orange & white theme
- Predefined responses for common user queries
- Non-intrusive and responsive design
- Works on desktop and mobile devices

---

## 🛠️ Technical Overview

- **Implementation:** Frontend-only
- **Technologies:** Vanilla JavaScript, HTML, CSS
- **Architecture:** Modular component, isolated from core logic
- **Performance:** Lightweight, minimal DOM impact

### File Structure

website/
├── scripts/
│ └── chatbot.js ← behavior
├── styles/
│ └── components/
│ └── chatbot.css ← design
├── pages/
│ └── \*.html ← content
└── index.html ← entry point

---

## 🔐 Security & Open-Source Safety

- No API keys are used or exposed
- No third-party services are required
- Safe to include in a public repository
- No user data is collected or stored

---

## 🔮 Future Enhancements (Optional)

- AI-powered responses via a secure backend
- Smarter intent matching
- Accessibility improvements (keyboard navigation, ARIA roles)
- Conversation history persistence
- Context-aware guidance based on user progress

---

## 🧩 Maintainability Notes

- The chatbot is fully optional
- Removing it only requires deleting:
  - `website/scripts/chatbot.js`
  - `website/styles/components/chatbot.css`
- No existing functionality is modified or affected

---

## 📌 Scope of Contribution

This feature focuses on:

- Improving user experience
- Keeping changes minimal and maintainable
- Preparing a clean foundation for future enhancements
