import { Injectable, BadRequestException } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';

/**
 * LLD Principle Applied: Single Responsibility Principle (SRP)
 *
 * Reason: This service has exactly one reason to change: if the method for
 * extracting text from a PDF changes. By extracting this logic out of
 * DocumentService, we decouple the core orchestration logic from the
 * specific library (`pdf-parse`) used for parsing.
 */
@Injectable()
export class PdfExtractorService {
    /**
     * Extracts raw text and metadata from a PDF file buffer.
     *
     * @param file The uploaded multer file
     * @returns An object containing the cleaned text, total pages, and document info
     */
    async extract(file: Express.Multer.File) {
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

            return {
                text: cleanText,
                numPages: infoResult.total,
                info: infoResult.info,
            };
        } catch (error) {
            console.error('PDF Parse error:', error);
            throw new BadRequestException('Failed to parse PDF file');
        } finally {
            await parser.destroy();
        }
    }
}
