# Real RAG Frontend

A modern, responsive, and minimalist chat interface built with [React 19](https://react.dev/) and [Vite](https://vitejs.dev/). This application connects to the Real RAG NestJS backend to upload PDF documents and interact with them in real-time.

## 🚀 Technologies Used

- **React 19**
- **Vite** (for fast HMR and optimized builds)
- **Lucide React** (for crisp, minimal SVG icons)
- **Vanilla CSS / Custom Design System**

## 🧩 Structure

The UI revolves around two primary states:
1. **Document Upload**: A drag-and-drop zone (`UploadZone.tsx`) for users to provide a PDF.
2. **Chat Interface**: A monochrome, pill-shaped chat input system built for readability and a modern aesthetic.

## 🛠️ Setup & Installation

Ensure you have Node.js (v22 or later) installed.

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create a `.env` file referencing the backend URL
# VITE_API_URL=http://localhost:3000
```

## ⚡ Running the Application

Vite provides an extremely fast development server.

```bash
# Start the development server (default port 5173)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## 💅 Styling and UI Philosophy

This application adopts a "2026-standard" design methodology:
- **Monochrome & High Contrast**: Avoiding standard blues/reds in favor of sleek blacks, whites, and subtle grays.
- **Micro-interactions**: Smooth transitions on hover states, particularly on submit buttons and input containers.
- **Fluid Geometry**: Using dynamic border-radii depending on multiline text input to preserve a "pill" or "rounded rectangle" shape gracefully.

## 🧹 Code Quality

This project is configured using strict ESLint rules tailored for modern React:

```bash
npm run lint
```
