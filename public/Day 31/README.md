
# 💼 Job Board – Full Stack MERN Application

A full-stack Job Board platform where **employers can post jobs and manage applicants**, and **jobseekers can apply to jobs and track application status**.

Built using the **MERN stack** with **role-based authentication**, **JWT security**, and a **modern Tailwind CSS UI**.

---

## 🚀 Features

### 👤 Authentication & Roles
- JWT-based authentication
- Role-based access control:
  - **Employer**
  - **Job Seeker**
- Protected frontend routes

### 🧑‍💼 Employer Features
- Post new jobs
- View all jobs posted by employer
- View applicants per job
- Accept / reject job applications
- Employer dashboard

### 👨‍💻 Job Seeker Features
- Browse all available jobs
- Apply to jobs
- Prevent duplicate applications
- Track application status (Pending / Accepted / Rejected)
- My Applications dashboard

### 🎨 UI & UX
- Fully responsive UI
- Built with **Tailwind CSS v4**
- Clean card-based layouts
- Status badges and loading states
- User-friendly forms with validation

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- Tailwind CSS v4

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication

---

## 📂 Project Structure

# Job Board – Modern Job Listing Platform

A fully responsive, modern **Job Board web application** built using **HTML, CSS, and Vanilla JavaScript**.  
It allows users to browse jobs, apply filters, sort listings, save jobs, and switch between light & dark themes — all without any backend.

---

## Features

### Job Search & Filters
- Search jobs by **title, company, description, or skills**
- Filter by:
  - Location
  - Job Type (Full Time, Part Time, Internship, Contract)
- Clear all filters instantly

### Sorting Options
- Newest First
- Salary (High → Low / Low → High)
- Experience (Low → High / High → Low)
- Title (A–Z / Z–A)

### Save Jobs (LocalStorage)
- Save & remove jobs using bookmarks
- View saved jobs anytime
- Persistent data using browser `localStorage`

### Dark / Light Mode
- One-click theme toggle
- Theme preference stored in `localStorage`
- Smooth animated transitions

### Layout Controls
- Grid View & List View toggle
- Fully responsive (mobile, tablet & desktop)

### Notifications
- Custom toast notifications for:
  - Save / remove job
  - Apply job action
  - Saved jobs view

### Empty State Handling
- Clean UI when no jobs match filters
- Reset search option provided

---

## 🛠️ Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling, variables, dark mode, responsiveness  
- **JavaScript (ES6)** – Logic, filtering, sorting, localStorage  
- **Font Awesome** – Icons

---

## 📂 Project Structure
job-board/
├── assets
├   ├── dark.png
├   ├── light.png
├── index.html
├── README.md
├── script.js
└── style.css

