import React, { useState } from 'react';
import type { ExtractionResponse } from '../services/api';

interface ExtractionResultProps {
    result: ExtractionResponse;
    fileSize: number;
    onReset: () => void;
}

export const ExtractionResult: React.FC<ExtractionResultProps> = ({ result, fileSize, onReset }) => {
    const [viewMode, setViewMode] = useState<'text' | 'chunks'>('text');

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
                    {result.chunks && (
                        <div className="stat-item">
                            <span className="stat-label">Chunks</span>
                            <span className="stat-value">{result.chunks.length}</span>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {result.chunks && result.chunks.length > 0 && (
                        <div className="toggle-group" style={{ display: 'flex', gap: '4px', background: 'var(--color-bg)', padding: '4px', borderRadius: '8px' }}>
                            <button
                                onClick={() => setViewMode('text')}
                                className={`btn ${viewMode === 'text' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '4px 12px', fontSize: '0.875rem' }}
                            >
                                Full Text
                            </button>
                            <button
                                onClick={() => setViewMode('chunks')}
                                className={`btn ${viewMode === 'chunks' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ padding: '4px 12px', fontSize: '0.875rem' }}
                            >
                                Chunks
                            </button>
                        </div>
                    )}
                    <button onClick={onReset} className="btn btn-secondary">
                        Upload Another
                    </button>
                </div>
            </div>

            <div className="text-content">
                {viewMode === 'text' ? (
                    result.text || 'No extractable text found in this document.'
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {result.chunks?.map((chunk, index) => (
                            <div key={index} style={{ padding: '16px', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>CHUNK {index + 1}</span>
                                    <span>{chunk.text.length} chars</span>
                                </div>
                                <div style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '12px' }}>{chunk.text}</div>
                                {chunk.embedding && (
                                    <details style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                                        <summary style={{ cursor: 'pointer', outline: 'none', fontWeight: 600 }}>View Embedding Vector ({chunk.embedding.length} dimensions)</summary>
                                        <div style={{
                                            marginTop: '8px',
                                            padding: '8px',
                                            background: 'rgba(0,0,0,0.1)',
                                            borderRadius: '4px',
                                            fontFamily: 'monospace',
                                            wordBreak: 'break-all',
                                            maxHeight: '100px',
                                            overflowY: 'auto'
                                        }}>
                                            [{chunk.embedding.map(v => v.toFixed(6)).join(', ')}]
                                        </div>
                                    </details>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
