import { useState } from 'react';
import { UploadZone } from './components/UploadZone';
import { ExtractionResult } from './components/ExtractionResult';
import { extractPDF, type ExtractionResponse } from './services/api';

function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ExtractionResponse | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setError(null);
    setFileSize(file.size);
    try {
      const data = await extractPDF(file);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <header className="app-header animate-fade-in">
        <h1>Document Ingestion</h1>
        <p>Real-time PDF extraction engine for vector storage processing.</p>
      </header>

      <main style={{ width: '100%' }}>
        {!result ? (
          <UploadZone onFileSelect={handleFileSelect} isUploading={isUploading} />
        ) : (
          <ExtractionResult result={result} fileSize={fileSize} onReset={handleReset} />
        )}

        {error && (
          <div className="animate-fade-in" style={{ color: '#ff4444', textAlign: 'center', marginTop: '1rem' }}>
            <p>Error: {error}</p>
            <button onClick={handleReset} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Try Again</button>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
