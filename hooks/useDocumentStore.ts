import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Document } from '@/types/document';

interface DocumentStoreState {
    documents: Document[];
    imageFiles: FileList | null;
    chatContext: { [key: string]: string };
    addDocument: (doc: Document) => void;
    deleteDocument: (id: number) => void;
    setImageFiles: (files: FileList | null) => void;
    restoreChatContext: () => void;
    setChatContext: (key: string, value: string) => void;
    removeChatContext: (key: string) => void;
}

function base64ToFile(base64: string, filename: string, mimeType: string): Promise<File> {
    return fetch(base64)
        .then((res) => res.arrayBuffer())
        .then((buffer) => new File([buffer], filename, { type: mimeType }));
}

export const useDocumentStore = create<DocumentStoreState>()(
    persist(
        (set, get) => ({
            documents: [],
            imageFiles: null,
            chatContext: {},

            addDocument: (doc) =>
                set((state) => ({
                    documents: [...state.documents, doc],
                })),

            deleteDocument: (id) =>
                set((state) => ({
                    documents: state.documents.filter((doc) => doc.id !== id),
                })),

            setImageFiles: (files) => set({ imageFiles: files }),

            restoreChatContext: async () => {
                const storedContext = sessionStorage.getItem('document-storage');
                if (storedContext) {
                    const parsedContext = JSON.parse(storedContext).state.chatContext;
                    set({ chatContext: parsedContext });
                }

                const documents = get().documents;
                const imageFilesPromises = documents
                    .filter((doc) => doc.type.startsWith('image/') && doc.url.startsWith('data:image'))
                    .map((doc) =>
                        base64ToFile(doc.url, doc.name, doc.type)
                    );

                const imageFilesArray = await Promise.all(imageFilesPromises);

                const fileList = new DataTransfer();
                imageFilesArray.forEach((file) => fileList.items.add(file));

                set({ imageFiles: fileList.files });

            },

            setChatContext: (key, value) =>
                set((state) => ({
                    chatContext: { ...state.chatContext, [key]: value },
                })),

            removeChatContext: (key) =>
                set((state) => {
                    const newChatContext = { ...state.chatContext };
                    delete newChatContext[key];
                    return { chatContext: newChatContext };
                }),
        }),
        {
            name: 'document-storage',
        }
    )
);
