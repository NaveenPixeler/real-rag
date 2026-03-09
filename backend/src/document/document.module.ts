import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { PdfExtractorService } from './1-text-extraction.service';
import { TextSplitterService } from './2-chunking.service';
import { EmbeddingService } from './3-embeddings.service';
import { QdrantService } from './4-vector-db-storage.service';

@Module({
  providers: [
    DocumentService,
    PdfExtractorService,
    TextSplitterService,
    EmbeddingService,
    QdrantService,
  ],
  controllers: [DocumentController]
})
export class DocumentModule {}
