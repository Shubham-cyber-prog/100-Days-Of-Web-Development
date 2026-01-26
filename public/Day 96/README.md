# AI Chat App (Local LLM)

A full-stack **AI-powered chat application** built using a **locally hosted large language model (LLM)** via **Ollama**, with a modern **Next.js frontend** and an **Express.js streaming backend**.

This project demonstrates how to build a **ChatGPT-like experience** without relying on paid cloud APIs — everything runs locally.

---

## ✨ Key Features

* 💬 **Real-time streaming responses** (token-by-token typing)
* 🧠 **Local LLM inference** using Ollama (no API keys, no billing)
* 🗂 **Multiple chat conversations** with sidebar navigation
* 🔄 **Model switching** (Qwen, Gemma, DeepSeek)
* ⚡ **Fast, modern UI** built with Next.js + Tailwind CSS
* 🔌 **Express backend** with streaming support

---

## 🧱 Tech Stack

### Frontend

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* Fetch API with streaming (`ReadableStream`)

### Backend

* **Node.js**
* **Express.js**
* **Ollama Local API**

### AI Models (Local)

* `qwen3:8b` (default)
* `gemma3:4b`
* `deepseek-r1:8b`

---

## 🏗 Architecture Overview

```
Frontend (Next.js)
   │
   │  POST /chat/stream
   ▼
Backend (Express)
   │
   │  stream=true
   ▼
Ollama Local Server
   │
   ▼
Local LLM (Qwen / Gemma / DeepSeek)
```

---

## 🚀 Getting Started

### 1️⃣ Install Ollama

Download and install Ollama:
👉 [https://ollama.com](https://ollama.com)

Pull at least one model:

```bash
ollama pull qwen3:8b
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🧪 Example API Usage

```http
POST /chat/stream
Content-Type: application/json

{
  "message": "Explain AI in simple terms",
  "model": "qwen3:8b"
}
```

The response is streamed incrementally to the client.

---

## 🎯 Why This Project Matters

Most AI apps rely on **paid cloud APIs**. This project shows:

* How to run **LLMs locally**
* How to implement **real-time streaming UX**
* How to design a **scalable chat architecture**
* How to build **production-grade AI apps** without external dependencies

---

## 📌 Portfolio Description (Short)

> Built a full-stack AI chat application using a locally hosted open-source LLM via Ollama, featuring real-time streaming responses, multi-chat support, and model switching. Implemented a Next.js frontend and an Express streaming backend to deliver a ChatGPT-like experience without relying on paid APIs.

---

## 📌 Resume Bullet Points

* Developed a full-stack AI chat application using **Next.js**, **Express**, and **Ollama**
* Implemented **real-time token streaming** for ChatGPT-style responses
* Integrated **multiple open-source LLMs** with dynamic model switching
* Designed a clean, responsive UI with **Tailwind CSS**
* Eliminated cloud dependency by running LLM inference locally

---

## 🔮 Future Improvements

* Persist chat history using localStorage or a database
* User authentication
* File upload + RAG (PDF Q&A)
* Deploy frontend publicly with backend on a local or self-hosted server

---

## 🏁 Final Notes

This project focuses on **practical AI engineering**, real-time UX, and system design — making it ideal for portfolios, interviews, and learning modern AI application development.
