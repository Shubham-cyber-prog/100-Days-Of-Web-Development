# Video Conferencing App

A full-stack video conferencing application built with **MERN**, **Socket.IO**, **WebRTC**, and **Vite + React**. Users can create or join rooms, share video/audio, and connect in real time.

---

## 🚀 Features

- 🔐 Room creation with unique codes
- 🎥 Real-time video and audio streaming via WebRTC
- 👥 Multiple participants per room
- 🎤 Mute/Unmute microphone
- 📷 Toggle video on/off
- 🔌 Peer-to-peer connection using Socket.IO signaling
- 🧹 Auto cleanup on leave/disconnect

---

## 🧰 Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | Vite + React       |
| Backend     | Node.js + Express  |
| Realtime    | Socket.IO          |
| Database    | MongoDB + Mongoose |
| Media       | WebRTC             |

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/video-conferencing-app.git
cd video-conferencing-app

2. Install dependencies
Server
cd server
npm install


Client
cd client
npm install

Environment Setup
Server .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/video_conference


Client .env
VITE_SERVER_URL=http://localhost:5000

🧪 Running the App
Start MongoDB
Make sure MongoDB is running locally.
Start Server
cd server
npm run dev


Start Client
cd client
npm run dev


Visit: http://localhost:3000



video-conferencing-app/
├── client/         # Vite + React frontend
│   ├── components/
│   ├── socket.js
│   └── App.jsx
├── server/         # Express + Socket.IO backend
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── index.js




