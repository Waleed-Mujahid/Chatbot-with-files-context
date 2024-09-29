import { toast } from 'sonner';
import Papa from 'papaparse';
import mammoth from 'mammoth';
import pdfToText from 'react-pdftotext';
import { useDocumentStore } from '@/hooks/useDocumentStore';
import { Document } from '@/types/document';

const imgToBase64 = (file: File) =>
    new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
    });

export function useDocuments() {
    const { setChatContext, setImageFiles, addDocument, deleteDocument, documents, imageFiles, removeChatContext } = useDocumentStore();

    const processFile = async (file: File) => {
        let content = '';

        if (file.type === 'application/pdf') {
            content = await pdfToText(file);
        } else if (
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.type === 'application/msword'
        ) {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            content = result.value;
        } else if (file.type === 'text/csv') {
            const text = await file.text();
            const result = Papa.parse(text, { header: true });
            content = JSON.stringify(result.data);
        } else if (file.type.startsWith('text/')) {
            content = await file.text();
        }

        setChatContext(file.name, content);

        const newDocument: Document = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            url: file.type.startsWith('image/') ? (await imgToBase64(file)) : URL.createObjectURL(file),
            content: content,
        };

        addDocument(newDocument);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = event.target.files;
        if (uploadedFiles) {
            const validFiles = Array.from(uploadedFiles).filter((file) =>
                ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv', 'text/',

                    'application/msword', 'image/'
                ].some(
                    (type) => file.type.startsWith(type)
                )
            );

            const imageFiles = Array.from(uploadedFiles).filter((file) => file.type.startsWith('image/'));

            if (validFiles.length !== uploadedFiles.length) {
                toast.error('Only image, text, DOC, DOCX, CSV, and PDF files are allowed!');
                return;
            }

            await Promise.all(validFiles.map(processFile));

            if (imageFiles.length > 0) {
                const dataTransfer = new DataTransfer();
                imageFiles.forEach((file) => dataTransfer.items.add(file));
                setImageFiles(dataTransfer.files);
            }

            toast.success('File(s) uploaded successfully');
        }
    };

    const handleDeleteDocument = (id: number) => {
        const documentToDelete = documents.find((doc) => doc.id === id);

        if (documentToDelete) {
            deleteDocument(id);
            removeChatContext(documentToDelete.name);  // Remove the key from chatContext

            // If the document is an image, remove it from imageFiles
            if (documentToDelete.type.startsWith('image/')) {
                if (imageFiles) {  
                    const remainingImages = Array.from(imageFiles).filter((file) => file.name !== documentToDelete.name);
                    const dataTransfer = new DataTransfer();
                    remainingImages.forEach((file) => dataTransfer.items.add(file));
                    setImageFiles(dataTransfer.files);
                }
            }

            toast.success('File deleted successfully');
        }
    };

    return { documents, handleFileUpload, handleDeleteDocument };
}
