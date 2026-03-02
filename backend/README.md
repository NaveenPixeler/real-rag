<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Real RAG Backend

This is the backend service for the Real RAG application, built with [NestJS](https://nestjs.com/). It serves as the primary engine for processing incoming PDF documents, extracting their text contents using `pdf-parse`, and eventually feeding them into the Retrieval-Augmented Generation pipeline.

## ⚙️ Prerequisites

- Node.js (v22 or later)
- npm or yarn

## 🚀 Setup & Installation

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file based on the example (if applicable)
# cp .env.example .env
```

## 🛠️ Running the Application

There are several ways to run the Nest application:

```bash
# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

By default, the API will be available at `http://localhost:3000`.

## 📚 API Endpoints Overview

Current implementation includes basic document ingestion:

- `POST /document/upload`
  - Accepts `multipart/form-data` with a `file` field containing a PDF.
  - Returns the parsed text string and the total number of pages extracted.

## 🧪 Testing

The NestJS framework is built with testing in mind. This repository includes configuration for both unit and end-to-end tests using Jest.

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Get test coverage
npm run test:cov
```

## 🧱 Project Structure

- `src/main.ts` - The entry point of the application.
- `src/app.module.ts` - The root module that imports feature modules like `DocumentModule`.
- `src/document/` - Contains the Controllers and Services handling the core business logic of document ingestion and parsing.

## 🛡️ Linting and Formatting

This project enforces strict code style guidelines:

```bash
npm run format # Formats code using Prettier
npm run lint   # Lints code using ESLint
```
