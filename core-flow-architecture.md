# Core Flow Architecture

This document outlines the core architecture of our RAG (Retrieval-Augmented Generation) ingestion pipeline. 
The entire process of ingesting a document is broken down into 4 explicit, chronological steps.

## Pipeline Flow

When a user uploads a PDF, the `DocumentService` (Coordinator) passes the file through the following 4 distinct steps:

### Step 1: Text Extraction (`1-text-extraction.service.ts`)
**Purpose:** Read the raw binary PDF file and convert it into a single, massive string of plain text so the computer can understand the contents.
**Tool Used:** `pdf-parse`

### Step 2: Chunking (`2-chunking.service.ts`)
**Purpose:** AI models have limited "Context Windows" (how much text they can read at once). We must take the massive string of text from Step 1 and slice it into smaller, overlapping "chunks" (like paragraphs) that the AI can easily digest.
**Tool Used:** Langchain `RecursiveCharacterTextSplitter`

### Step 3: Embeddings (`3-embeddings.service.ts`)
**Purpose:** AI models don't understand English; they understand numbers. We take each "chunk" of text from Step 2 and ask an LLM to convert the semantic meaning of that chunk into a massive array of numbers (a Vector).
**Tool Used:** Gemini `GoogleGenerativeAIEmbeddings`

### Step 4: Vector DB Storage (`4-vector-db-storage.service.ts`)
**Purpose:** Storing thousands of arrays of numbers in a standard SQL database is incredibly slow for searching. We must take those Vectors from Step 3 and store them in a specialized Vector Database that is optimized for mathematically finding "similar" numbers.
**Tool Used:** `QdrantVectorStore` (Langchain) + Qdrant Cloud
