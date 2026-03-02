# Real RAG

An advanced Retrieval-Augmented Generation (RAG) application with a modern, responsive chat interface and powerful backend document processing.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node->=22.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E.svg)

## 📖 Overview

Real RAG provides a seamless way to interact with your documents. Upload PDFs, extract text, and chat intelligently with the content. The application is split into a high-performance **NestJS backend** for parsing and serving data, and a sleek, modern **React/Vite frontend** for an optimal user experience.

## ✨ Features

- **Document Processing**: Upload and extract text from PDF documents using robust backend parsers.
- **Modern UI/UX**: A clean, monochrome, and highly responsive chat interface.
- **Real-time Interaction**: fluid conversational UI for interacting with extracted document knowledge.
- **Scalable Architecture**: Monorepo-style structure separating frontend and backend for independent scaling and development.

## 🏗️ Architecture

This repository contains two main applications:

1. **[Frontend](./frontend/)**: A React application built with Vite, featuring real-time chat components, drag-and-drop file uploads, and a modern design system.
2. **[Backend](./backend/)**: A NestJS REST API responsible for handling file uploads, PDF text extraction, and serving data to the client.

## 🚀 Quick Start

Ensure you have Node.js (v22+) installed.

### 1. Clone the repository
```bash
git clone https://github.com/NaveenPixeler/real-rag.git
cd real-rag
```

### 2. Start the Backend
```bash
cd backend
npm install
npm run start:dev
```
*The backend will be available at `http://localhost:3000`*

### 3. Start the Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will be available at `http://localhost:5173`*

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, branch naming conventions, and the process for submitting Pull Requests to us.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
