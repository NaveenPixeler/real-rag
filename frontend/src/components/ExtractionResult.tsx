import React from 'react';
import type { ExtractionResponse } from '../services/api';

interface ExtractionResultProps {
    result: ExtractionResponse;
    fileSize: number;
    onReset: () => void;
}

export const ExtractionResult: React.FC<ExtractionResultProps> = ({ result, fileSize, onReset }) => {
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="result-card animate-fade-in">
            <div className="result-header">
                <div className="stats-container">
                    <div className="stat-item">
                        <span className="stat-label">Pages</span>
                        <span className="stat-value">{result.numPages}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">File Size</span>
                        <span className="stat-value">{formatBytes(fileSize)}</span>
                    </div>
                    {result.info?.Author && (
                        <div className="stat-item">
                            <span className="stat-label">Author</span>
                            <span className="stat-value" style={{ fontSize: '1rem', marginTop: 'auto' }}>{result.info.Author}</span>
                        </div>
                    )}
                </div>
                <button onClick={onReset} className="btn btn-secondary">
                    Upload Another
                </button>
            </div>

            <div className="text-content">
                {result.text || 'No extractable text found in this document.'}
            </div>
        </div>
    );
};
