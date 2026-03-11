# Component Architecture & LLD Principles

This document explains the specific responsibility, Low-Level Design (LLD) principle applied, and the exact Input/Output flow for every class in our backend `document` module.

---

## 1. `PdfExtractorService` (`1-text-extraction.service.ts`)
**What it does:** It receives a raw PDF file upload and uses a third-party library (`pdf-parse`) to rip out all the readable text from the document.
**LLD Applied:** **Single Responsibility Principle (SRP)**. This class has exactly one reason to exist and change: *extracting text from PDFs*. By isolating this, if we ever replace `pdf-parse` with a better library tomorrow, no other file in the application has to know or care.
**Functions:**
- `extract(file: Express.Multer.File)`
  - **Takes:** A raw binary PDF file object.
  - **Returns:** An object containing `{ text: string, numPages: number, info: object }`.

---

## 2. `TextSplitterService` (`2-chunking.service.ts`)
**What it does:** It receives a massive "wall of text" and mathematically fragments it into smaller, overlapping paragraphs (chunks) so that AI models can process them within their context limits.
**LLD Applied:** **Single Responsibility Principle (SRP)**. The algorithm for splitting text (recursive character splitting, chunk sizes, overlaps) is complex. By keeping this isolated, we can tweak the math of how big a chunk is without accidentally breaking the PDF extraction or Vector DB storage logic.
**Functions:**
- `split(text: string)`
  - **Takes:** A single massive string of raw text.
  - **Returns:** An array of strings (`string[]`), where each string is a ~1000 character chunk.

---

## 3. `EmbeddingService` (`3-embeddings.service.ts`)
**What it does:** It connects to Google's Gemini API to convert human-readable text strings into multi-dimensional number arrays (Vectors) representing semantic meaning.
**LLD Applied:** **Dependency Inversion & Adapter Pattern**. This class acts as a wrapper (Adapter) around the `GoogleGenerativeAIEmbeddings` library. The rest of our application just asks this "Adapter" for embeddings; it does not know we are explicitly using Gemini. If we want to switch to OpenAI tomorrow, we only change this one adapter file, and the rest of the application remains completely ignorant of the change.
**Functions:**
- `generateEmbeddings(chunks: string[])`
  - **Takes:** An array of text string chunks.
  - **Returns:** A 2D array of numbers (`number[][]`), where each sub-array is the mathematical vector for the corresponding text chunk.

---

## 4. `QdrantService` (`4-vector-db-storage.service.ts`)
**What it does:** It handles the direct network connection and data insertion into our Qdrant Cloud Vector Database.
**LLD Applied:** **Repository Pattern**. This class acts as our localized "Data Access Layer". The main application shouldn't know the specifics of how Qdrant requires data to be formatted or connected to. By hiding the DB operations behind this Repository class, we ensure our business logic stays clean of database-specific syntax.
**Functions:**
- `storeVectors(chunks: string[], embeddings: number[][], metadatas: any[], embeddingService: EmbeddingService)`
  - **Takes:** The raw text chunks, their generated number vectors, their descriptive metadata, and a reference to the active Embedding Adapter.
  - **Returns:** `void` (Nothing, it just successfully executes the storage command).

---

## 5. `DocumentService` (`document.service.ts`)
**What it does:** It receives the incoming HTTP request from the Controller and gracefully passes the data through the 4 core steps defined above.
**LLD Applied:** **Facade Pattern & Orchestrator**. Before refactoring, this file contained *all* the crazy logic. Now, it acts as a simple Facade (a clean, unified front-facing interface) masking the complex sub-system. It doesn't actually *do* any of the heavy lifting anymore; it simply "orchestrates" the order in which the other 4 micro-services execute.
**Functions:**
- `extractText(file: Express.Multer.File)`
  - **Takes:** The initial raw PDF upload file.
  - **Returns:** A clean, formatted JSON object sent back to the frontend UI containing the extracted text, total pages, number of chunks stored, and an array displaying every single chunk and its corresponding vector.
