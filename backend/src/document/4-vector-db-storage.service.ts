import { Injectable } from '@nestjs/common';
import { QdrantVectorStore } from '@langchain/qdrant';
import { EmbeddingService } from './embedding.service';

/**
 * LLD Principle Applied: Repository Pattern & Single Responsibility Principle.
 * 
 * Reason: This service acts as the data access layer (Repository) specifically
 * for Vector Embeddings. By separating this from the DocumentService, we isolate 
 * the database connection logic. If we migrate from Qdrant Cloud to a local 
 * Docker instance, or swap the VectorDB entirely, the changes are confined here.
 */
@Injectable()
export class QdrantService {
    /**
     * Stores an array of pre-generated vector embeddings into the Qdrant DB.
     * 
     * @param chunks Array of plain text strings
     * @param embeddings Array of number arrays representing the embedded chunks
     * @param metadatas Array of metadata objects matching the array structure
     * @param embeddingService Reference to our Embedding adapter to initialize the VectorStore
     */
    async storeVectors(
        chunks: string[],
        embeddings: number[][],
        metadatas: any[],
        embeddingService: EmbeddingService
    ): Promise<void> {

        if (!process.env.QDRANT_URL || !process.env.QDRANT_API_KEY) {
            throw new Error("Qdrant variables (QDRANT_URL or QDRANT_API_KEY) are missing in .env");
        }

        // Initialize the Langchain VectorStore Adapter
        const vectorStore = new QdrantVectorStore(embeddingService.provider, {
            url: process.env.QDRANT_URL,
            apiKey: process.env.QDRANT_API_KEY,
            collectionName: "real_rag_docs",
        });

        // Map chunks and metadata into Langchain Document objects
        const documents = chunks.map((chunk, index) => ({
            pageContent: chunk,
            metadata: metadatas[index]
        }));

        // Store the already-generated vectors directly to avoid double API calls to Gemini
        await vectorStore.addVectors(embeddings, documents);
    }
}
