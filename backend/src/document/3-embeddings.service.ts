import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

/**
 * LLD Principle Applied: Dependency Inversion / Adapter Pattern
 *
 * Reason: Instead of the main DocumentService tightly coupling to the
 * `GoogleGenerativeAIEmbeddings` class, we provide a unified `EmbeddingService`.
 * If we later want to switch to OpenAI or a local HuggingFace model, we only
 * change this file. The DocumentService remains unaware of the underlying API provider.
 */
@Injectable()
export class EmbeddingService {
    private readonly _provider: GoogleGenerativeAIEmbeddings;

    constructor() {
        this._provider = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: "gemini-embedding-001",
        });
    }

    /**
     * Expose the raw Langchain embeddings provider so it can be passed into
     * VectorStores like Qdrant which expect an Embeddings instance.
     */
    get provider(): GoogleGenerativeAIEmbeddings {
        return this._provider;
    }

    /**
     * Generates numerical vector embeddings for an array of strings.
     *
     * @param chunks Array of text chunks to embed
     * @returns A 2D array of number floats representing the vectors
     */
    async generateEmbeddings(chunks: string[]): Promise<number[][]> {
        return await this._provider.embedDocuments(chunks);
    }
}
