import { Injectable, BadRequestException } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';

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
            return {
                text: textResult.text,
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
