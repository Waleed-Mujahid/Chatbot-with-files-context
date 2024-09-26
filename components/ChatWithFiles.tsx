'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { toast } from 'sonner';
import Header from './Header';
import BackgroundAnimation from './BackgroundAnimation';
import ChatView from './ChatView';
import DocumentsView from './DocumentsView';
import InputSection from './InputSection';
import { useDocuments } from '@/hooks/useDocuments';
import { useDocumentStore } from '@/hooks/useDocumentStore';

export default function ChatWithFiles() {
    const { documents, imageFiles, chatContext, restoreChatContext } = useDocumentStore();
    const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat({
        onError: () => toast.error("You've been rate limited, please try again later!"),
        body: { chatContext: JSON.stringify(chatContext) },
    });
    const [view, setView] = useState<'chat' | 'documents'>('chat');

    // File upload and chat context management
    const { handleFileUpload, handleDeleteDocument } = useDocuments();

    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Restore chat context on component mount
    useEffect(() => {
        restoreChatContext();
    }, [restoreChatContext]);

    // Handle sending message with attachments (if any)
    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const options = imageFiles ? { experimental_attachments: imageFiles } : {};
        setView('chat');
        handleSubmit(event, options);
    };

    return (
        <div className="relative flex flex-col justify-between min-h-screen bg-background text-foreground">
            <Header view={view} setView={setView} />
            <BackgroundAnimation />
            <div className="flex-1 overflow-y-auto p-4 relative z-10">
                {view === 'chat' ? (
                    <ChatView messages={messages} messagesEndRef={messagesEndRef} />
                ) : (
                    <DocumentsView
                        documents={documents}
                        handleDeleteDocument={handleDeleteDocument}
                        fileInputRef={fileInputRef}
                        handleFileUpload={handleFileUpload}
                    />
                )}
            </div>
            <InputSection
                input={input}
                handleInputChange={handleInputChange}
                handleSendMessage={handleSendMessage}
                isLoading={isLoading}
                fileInputRef={fileInputRef}
                handleFileUpload={handleFileUpload}
            />
        </div>
    );
}
