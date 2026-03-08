# 🤖 AI-Powered Customer Support Chatbot

A modern **AI-powered customer support chatbot** built from scratch using **Ollama** and **JavaScript**.
The chatbot supports **FAQ grounding**, **real-time AI responses**, and a **dark/light mode UI**, closely mimicking real-world customer support systems.

---

## ✨ Features

* 💬 **Back-and-forth chat interface** (real chat bubbles)
* 🧠 **FAQ grounding** (answers from predefined business FAQs first)
* 🤖 **AI fallback** using a locally hosted LLM via **Ollama**
* 🌗 **Dark / Light mode** with persistence
* ⚡ **Real-time responses**
* 🛡️ **Graceful error handling** (never hangs on “Typing…”)
* 🔒 **Local AI inference** (no paid APIs, privacy-friendly)

---

## 🏗️ Tech Stack

| Layer    | Technology                   |
| -------- | ---------------------------- |
| Frontend | HTML, CSS, JavaScript        |
| Backend  | Node.js, Express             |
| AI Model | Ollama (Mistral)             |
| Styling  | Custom CSS (Dark/Light mode) |

---

## 📁 Project Structure

```
ai-support-chatbot/
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server/
│   ├── index.js
│   ├── faqs.js
│   └── package.json
│
└── README.md
```

---

## 🧠 How It Works

1. User sends a message from the chat UI
2. Backend checks if the query matches any **FAQs**
3. If found → returns FAQ response (fast & deterministic)
4. If not → forwards query to **Ollama LLM**
5. AI-generated response is sent back to the UI
6. UI updates with clean chat bubbles

---

## 🚀 Getting Started (Local Setup)

### ✅ Prerequisites

Make sure you have the following installed:

* **Node.js** (v18+ recommended)
* **Ollama** → [https://ollama.com/download](https://ollama.com/download)

---

### 🔹 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/ai-support-chatbot.git
cd ai-support-chatbot
```

---

### 🔹 Step 2: Install Ollama Model

```bash
ollama pull mistral
```

Run once to verify:

```bash
ollama run mistral
```

---

### 🔹 Step 3: Setup Backend

```bash
cd server
npm install
npm install node-fetch
```

Start the server:

```bash
node index.js
```

You should see:

```
Server running on http://localhost:5000
```

---

### 🔹 Step 4: Run Frontend

Open this file directly in your browser:

```
client/index.html
```

✅ Your chatbot is now live locally.

---

## 🌗 Dark / Light Mode

* Toggle using the 🌙 / ☀️ icon
* Preference is stored in `localStorage`
* Automatically persists across reloads

---

## 📦 Deployment Guide

### 🚀 Frontend Deployment (Vercel / Netlify)

You can deploy **only the frontend** easily.

#### Option 1: Vercel

1. Push code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import the repository
4. Set **Root Directory** → `client`
5. Deploy

#### Option 2: Netlify

1. Drag & drop the `client` folder
2. Done 🎉

⚠️ Note: Backend must still run locally or on a server.

---

### 🚀 Backend Deployment (Optional)

To deploy backend:

* Use **Railway**, **Render**, or **EC2**
* Ensure Ollama is available on the server (or replace with cloud LLM)

---

## 🔐 Environment Notes

* No API keys required
* AI runs **locally via Ollama**
* Safe for demos and portfolios

---

## 🧪 Sample FAQs

```js
- Password reset
- Refund policy
- Contact support
- International shipping
```

(Defined in `server/faqs.js`)

---

## 🛠️ Future Improvements

* Chat memory / conversation context
* Typing indicator animation
* Streaming responses
* User authentication
* Admin dashboard for FAQs
* React / Next.js frontend
* Docker support

---
