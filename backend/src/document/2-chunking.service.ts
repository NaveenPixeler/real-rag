import { Injectable } from '@nestjs/common';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

/**
 * LLD Principle Applied: Single Responsibility Principle (SRP)
 *
 * Reason: Text chunking is an algorithm dependent on context window limits
 * and semantic strategies. Placing it here means changes to chunk size, overlap,
 * or splitting strategy (e.g., semantic vs recursive) do not affect text
 * extraction or vector storage logic.
 */
@Injectable()
export class TextSplitterService {
    /**
     * Splits a large string of text into smaller context chunks.
     *
     * @param text The complete raw text string
     * @returns An array of string chunks
     */
    async split(text: string): Promise<string[]> {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docs = await splitter.createDocuments([text]);
        return docs.map((doc: any) => doc.pageContent);
    }
}
