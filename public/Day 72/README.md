# IoT Event Monitoring Dashboard - Complete Website

A professional, modern, and futuristic web application for real-time monitoring of IoT sensor data during live events.

## 📋 Features

- ✅ **Real-Time Dashboard** - Live gauges and charts for temperature, sound, and crowd density
- ✅ **Multi-Page Website** - Landing page, authentication, dashboard, features, about, contact
- ✅ **Professional Design** - Futuristic dark theme with cyan and purple accents
- ✅ **Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- ✅ **Smart Alerts** - Threshold-based notifications for safety-critical events
- ✅ **Data Analytics** - Historical data visualization and trend analysis
- ✅ **Complete Documentation** - Privacy policy and terms & conditions included

## 📁 Project Structure

```
iot-complete-website/
├── index.html              # Landing Page
├── login.html              # Login Page
├── signup.html             # Sign Up Page
├── dashboard.html          # Real-Time Monitoring Dashboard
├── features.html           # Features Page
├── about.html              # About Page
├── contact.html            # Contact Page
├── privacy.html            # Privacy Policy
├── terms.html              # Terms & Conditions
├── css/
│   ├── style.css           # Main styles and design
│   ├── dashboard.css       # Dashboard-specific styles
│   └── responsive.css      # Mobile responsive styles
├── js/
│   ├── main.js             # Navigation and shared functions
│   ├── auth.js             # Authentication logic
│   ├── dashboard.js        # Real-time data simulation
│   └── form-handler.js     # Form handling (included in auth.js)
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required!

### Installation

1. **Download** the project ZIP file
2. **Extract** the folder to your computer
3. **Open** `index.html` in your web browser
4. That's it! The website is ready to use.

## 🔐 Demo Credentials

To test the authentication system, use these credentials:

- **Email:** demo@example.com
- **Password:** password123

Or create a new account directly on the Sign Up page.

## 📊 Dashboard Features

### Real-Time Gauges
- 🌡️ **Temperature Monitor** (20-50°C)
- 🔊 **Sound Level Meter** (0-120 dB)
- 👥 **Crowd Density Tracker** (0-100%)

### Live Charts
- Temperature trend analysis
- Sound level patterns
- Crowd density visualization

### Alert System
- Color-coded alerts (Green: Normal, Orange: Warning, Red: Critical)
- Real-time alert notifications
- Recent alerts history

### Statistics
- Average temperature
- Peak sound level
- Maximum crowd density
- Total alerts count

## 🎨 Design System

### Color Palette
- **Primary Background:** #0F172A (Dark Blue-Black)
- **Secondary Background:** #1E293B
- **Primary Accent:** #06B6D4 (Cyan)
- **Secondary Accent:** #A78BFA (Purple)
- **Text Primary:** #F1F5F9 (Light)
- **Text Secondary:** #CBD5E1 (Medium Gray)
- **Success:** #10B981 (Green)
- **Warning:** #F59E0B (Orange)
- **Danger:** #EF4444 (Red)

### Typography
- **Headings:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Body:** Same as headings
- **Font Sizes:** Responsive and scalable

## 🌐 Pages Overview

### Landing Page (index.html)
- Hero section with call-to-action
- Features highlights
- Statistics showcase
- Professional introduction

### Authentication (login.html, signup.html)
- Secure login form
- User registration
- Demo credentials display
- Form validation

### Dashboard (dashboard.html)
- Real-time monitoring
- Interactive gauges
- Live trend charts
- Alert management
- Statistics panels

### Information Pages (features.html, about.html)
- Comprehensive feature list
- Team information
- Technology stack
- Project roadmap

### Support Pages (contact.html)
- Contact form with validation
- Support information
- Social media links
- Business hours

### Legal Pages (privacy.html, terms.html)
- Complete privacy policy
- Terms & conditions
- Data protection details

## 💻 Technology Stack

### Frontend
- HTML5
- CSS3 (with animations and transitions)
- JavaScript (ES6+)
- Canvas API (for gauges)

### Features
- Client-side data simulation
- Real-time updates every 2 seconds
- LocalStorage for session management
- Responsive design with media queries
- Smooth animations and transitions

## 📱 Browser Compatibility

- ✅ Chrome (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers

## 🎯 Usage Guide

### First Time Visit
1. Open `index.html` in your browser
2. Explore the landing page
3. Click "Get Started" or "Login"
4. Use demo credentials to access the dashboard

### Dashboard Usage
1. Monitor real-time sensor values in gauges
2. View trends in live charts
3. Check recent alerts
4. Analyze statistics

### Navigation
- Use the top navigation bar to move between pages
- Mobile menu appears automatically on small screens
- Footer contains links to all pages

## 🔧 Customization

### Change Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-accent: #06B6D4;
    --secondary-accent: #A78BFA;
    /* ... other variables ... */
}
```

### Modify Sensor Ranges
Edit `js/dashboard.js`:
```javascript
const CONFIG = {
    temperature: { min: 20, max: 40, warning: 35, critical: 40 },
    sound: { min: 50, max: 85, warning: 90, critical: 100 },
    crowd: { min: 30, max: 75, warning: 80, critical: 90 }
};
```

### Update Content
Edit any HTML file to change text, images, or layout.

## 📈 Future Enhancements

- Real backend integration with Node.js
- MQTT protocol implementation
- WebSocket real-time updates
- Database integration for historical data
- Mobile app version
- Advanced analytics and ML predictions
- Multi-user collaboration features

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs and issues
- Suggest improvements
- Submit pull requests
- Share feedback

## 📞 Support & Contact

- **Email:** support@iotshield.com
- **Website:** www.iotshield.com
- **Phone:** +1 (555) 123-4567

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Project Lead** - System Architecture & IoT Specialist
- **Frontend Developer** - UI/UX Design & Web Development
- **Backend Developer** - Real-Time Systems & Data Processing

## 🎉 Credits

Built with ❤️ for Hack Energy 1.0 hackathon.

---

**Last Updated:** November 1, 2025

**Version:** 1.0.0

**Status:** ✅ Production Ready

## 🚀 Quick Start Checklist

- [ ] Download and extract the ZIP file
- [ ] Open index.html in browser
- [ ] Explore all pages using navigation
- [ ] Try logging in with demo credentials
- [ ] Check the dashboard with real-time data
- [ ] Test responsive design on mobile
- [ ] Read privacy policy and terms
- [ ] Provide feedback!

Enjoy your IoT Event Monitoring Dashboard! 🎊
