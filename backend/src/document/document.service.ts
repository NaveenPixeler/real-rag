import { Injectable, BadRequestException } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

@Injectable()
export class DocumentService {
    async extractText(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        if (file.mimetype !== 'application/pdf') {
            throw new BadRequestException('Uploaded file is not a PDF');
        }

        const parser = new PDFParse({ data: file.buffer });
        try {
            const infoResult = await parser.getInfo();
            const textResult = await parser.getText();

            // Clean up the text a bit before chunking
            const cleanText = textResult.text.replace(/\n+/g, '\n').trim();

            const chunks = await this.chunkText(cleanText);

            // Initialize Gemini Embeddings
            const embeddings = new GoogleGenerativeAIEmbeddings({
                apiKey: process.env.GEMINI_API_KEY,
                model: "gemini-embedding-001",
            });

            // Generate embeddings for the chunks
            const embeddedVectors = await embeddings.embedDocuments(chunks);

            // Map chunks to their embeddings
            const chunksWithEmbeddings = chunks.map((chunk, index) => ({
                text: chunk,
                embedding: embeddedVectors[index],
            }));

            return {
                text: cleanText,
                numPages: infoResult.total,
                info: infoResult.info,
                chunks: chunksWithEmbeddings,
            };
        } catch (error) {
            console.error('PDF Parse error:', error);
            throw new BadRequestException('Failed to parse PDF file');
        } finally {
            await parser.destroy();
        }
    }

    private async chunkText(text: string): Promise<string[]> {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docs = await splitter.createDocuments([text]);
        return docs.map((doc: any) => doc.pageContent);
    }
}
