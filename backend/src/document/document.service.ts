import { Injectable } from '@nestjs/common';
import { PdfExtractorService } from './1-text-extraction.service';
import { TextSplitterService } from './2-chunking.service';
import { EmbeddingService } from './3-embeddings.service';
import { QdrantService } from './4-vector-db-storage.service';

/**
 * LLD Principle Applied: Facade Pattern & Orchestrator
 *
 * Reason: This service no longer handles the gritty details of parsing PDFs,
 * fragmenting strings, or dealing with Qdrant APIs. Instead, it provides a 
 * simple Facade to the controller: `extractText(file)`. Inside, it acts as an 
 * orchestrator, coordinating the flow of data between our highly-specialized
 * micro-services.
 */
@Injectable()
export class DocumentService {
    constructor(
        private readonly pdfExtractor: PdfExtractorService,
        private readonly textSplitter: TextSplitterService,
        private readonly embeddingService: EmbeddingService,
        private readonly qdrantService: QdrantService,
    ) {}

    async extractText(file: Express.Multer.File) {
        // 1. Extract raw text and metadata (SRP)
        const extraction = await this.pdfExtractor.extract(file);

        // 2. Chunk the text (SRP)
        const chunks = await this.textSplitter.split(extraction.text);

        // 3. Generate embeddings (Adapter Pattern)
        const embeddedVectors = await this.embeddingService.generateEmbeddings(chunks);

        // 4. Create metadata array for Qdrant
        const metadatas = chunks.map((_, index) => ({
            source: file.originalname,
            chunkIndex: index,
        }));

        // 5. Store in Vector DB (Repository Pattern)
        await this.qdrantService.storeVectors(chunks, embeddedVectors, metadatas, this.embeddingService);

        // Map chunks to their embeddings for the UI response
        const chunksWithEmbeddings = chunks.map((chunk, index) => ({
            text: chunk,
            embedding: embeddedVectors[index],
            metadata: metadatas[index],
        }));

        return {
            text: extraction.text,
            numPages: extraction.numPages,
            info: extraction.info,
            chunksStored: chunks.length,
            chunks: chunksWithEmbeddings,
        };
    }
}
