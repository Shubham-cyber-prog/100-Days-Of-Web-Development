# SecureBank – Online Banking Dashboard

SecureBank is a modern, responsive **online banking dashboard** built using **HTML, CSS, and Vanilla JavaScript**.  
It simulates real-world banking features with local storage–based persistence and a clean, professional UI.

> This is a **demonstration project**. No real banking or financial operations are involved.

---

## Features

### Authentication
- User Registration & Login
- LocalStorage-based session persistence
- Password strength indicator
- Session persistence using LocalStorage
- Secure logout

### Dashboard
- Total balance overview
- Checking & Savings accounts
- Real-time balance updates after transactions
- Welcome message with dynamic date
- Eye toggle to hide/show balances
- Responsive navigation (desktop & mobile)

### Transactions
- Auto-generated sample transactions
- Transaction history table
- Filters by type (income / expense / transfer)
- Date-based filtering
- Recent transactions preview on dashboard

### Transfers & Payments
- Internal transfers (checking ↔ savings)
- External transfer simulation
- Bill payments (electricity, internet, credit card, etc.)
- Deposit funds modal

### Deposits
- Deposit funds modal
- Select target account
- Custom description support
- Transaction recorded instantly

### Profile Management
- View user profile details
- Edit personal information
- Persist profile data locally

### UI & UX
- Light / Dark mode with persistence
- Smooth section and card animations
- Toast notifications
- Mobile slide-out menu
- Profile & security modals

### Responsive Design
- Fully mobile-friendly
- Adaptive navigation
- Optimized layouts for tablets and desktops

---

## Tech Stack

- **HTML5**
- **CSS3** (Custom properties, animations, media queries)
- **JavaScript (ES6+)**
- **Font Awesome**
- **Google Fonts**
- **LocalStorage API**

---

## Project Structure

├── assets/
│   ├── accounts.png
│   ├── notifications.png
│   ├── overview.png
│   ├── payments.png
├   ├── profile-update.mp4
│   ├── profile.png
│   ├── signin.png
│   ├── signup.png
│   └── transfer.png
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── transactions.js
│   └── ui.js
└── README.md
