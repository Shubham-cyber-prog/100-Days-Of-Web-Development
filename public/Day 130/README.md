# AI-Powered Language Translation App

A **fully local, privacy-first AI-powered language translation application** built using the **LLaMA 3 model via Ollama**.
This app allows users to translate text between languages using a clean, modern UI with light/dark mode — all **without relying on cloud APIs**.

---

## ✨ Key Highlights

* 🔒 **Runs 100% locally** (no API keys, no cloud dependency)
* ⚡ Powered by **LLaMA 3 (8B)** using **Ollama**
* 🌐 Supports multiple languages
* 🌓 Light / Dark mode with persistence
* 📋 Copy translated text instantly
* 🧹 Clear input & output with one click
* 📱 Responsive, side-by-side editor layout

---

## 🖼️ Preview

**Input & Output side-by-side with theme toggle**

> Designed to feel like a real-world translation tool (similar to Google Translate / DeepL)

---

## 🏗️ Project Architecture

```
Browser (HTML, CSS, JS)
        ↓
Express Backend (Node.js)
        ↓
Ollama Local API (localhost:11434)
        ↓
LLaMA 3 Model (Running on your machine)
```

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Express.js
* CORS

### AI / ML

* **LLaMA 3 (8B)**
* **Ollama** (local model runner)

---

## 📁 Project Structure

```
Day 130/
├── client/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── node_modules/
│
└── README.md
```

---

## 🚀 Features

### 🔤 Language Translation

* Translate text from one language to another using LLaMA
* Context-aware and natural translations

### 🌓 Light / Dark Mode

* Toggle theme with one click
* Preference saved in `localStorage`

### 📋 Copy Translation

* Copy translated text to clipboard instantly

### 🧹 Clear Button

* Clear both input and output fields

### 📱 Responsive UI

* Side-by-side layout on desktop
* Stacked layout on mobile devices

---

## ⚙️ Setup Instructions (Step-by-Step)

### ✅ 1. Prerequisites

Make sure you have:

* **Node.js v18+**
* **Ollama installed**
* At least **8 GB RAM** (16 GB recommended)

---

### ✅ 2. Install Ollama

Download and install Ollama from:
👉 [https://ollama.com](https://ollama.com)

Verify installation:

```bash
ollama --version
```

---

### ✅ 3. Download LLaMA Model

```bash
ollama pull llama3:8b
```

Test it:

```bash
ollama run llama3
```

If you see the `>>>` prompt, the model is running correctly.

---

### ✅ 4. Backend Setup

Navigate to the backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm run dev
```

You should see:

```
Server running on http://localhost:5000
```

---

### ✅ 5. Test Backend (Optional but Recommended)

In **PowerShell**, run:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:5000/translate" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{
    "text": "Hello, how are you?",
    "from": "English",
    "to": "Hindi"
  }'
```

Expected output:

```json
{
  "translated": "नमस्ते, आप कैसे हैं?"
}
```

---

### ✅ 6. Run Frontend

Simply open:

```
client/index.html
```

in your browser.

⚠️ Make sure:

* Ollama is running
* Backend server is running

---

## 🧪 Sample Text for Testing

```
Artificial intelligence is transforming the way people interact with technology. From language translation and voice assistants to healthcare diagnostics and self-driving vehicles, AI systems are becoming an integral part of everyday life. These systems are designed to learn from data, adapt to new information, and perform tasks that traditionally required human intelligence.
```

---

## 🔒 Privacy & Security

* No user data is sent to the cloud
* All translations are processed **locally**
* Ideal for offline and privacy-sensitive use cases

---
