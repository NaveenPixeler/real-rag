// Types for our extraction response
export interface ExtractionResponse {
    text: string;
    numPages: number;
    info: any;
    chunks?: { text: string; embedding: number[] }[];
}

export const extractPDF = async (file: File): Promise<ExtractionResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3001/document/extract', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to extract PDF text');
    }

    return response.json();
};
