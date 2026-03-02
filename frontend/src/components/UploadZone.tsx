import React, { useCallback, useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

interface UploadZoneProps {
    onFileSelect: (file: File) => void;
    isUploading: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelect, isUploading }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === 'application/pdf') {
                setFile(droppedFile);
                onFileSelect(droppedFile);
            } else {
                alert('Please upload a PDF file.');
            }
        }
    }, [onFileSelect]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
                onFileSelect(selectedFile);
            } else {
                alert('Please upload a PDF file');
            }
        }
    };

    return (
        <div
            className={`upload-zone animate-fade-in ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <input type="file" accept="application/pdf" onChange={handleChange} className="file-input" id="file-upload" />
            <label htmlFor="file-upload" className="upload-content">
                {file && !isUploading ? (
                    <div className="file-success animate-fade-in">
                        <CheckCircle2 size={48} className="icon-success" />
                        <h3>{file.name}</h3>
                        <p>Ready for extraction</p>
                    </div>
                ) : (
                    <div className="upload-prompt animate-fade-in">
                        <UploadCloud size={48} className={`icon-upload ${isUploading ? 'pulse' : ''}`} />
                        <h3>{isUploading ? 'Extracting Text...' : 'Select or drop PDF file'}</h3>
                        <p>{isUploading ? 'Please wait while we process your document...' : 'Supported formats: .pdf up to 50MB'}</p>
                    </div>
                )}
            </label>
        </div>
    );
};
