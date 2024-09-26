import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, FileText } from 'lucide-react';

export default function Header({ view, setView }: { view: 'chat' | 'documents'; setView: (view: 'chat' | 'documents') => void }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-border relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">Chat with Files</h1>
            <div className="flex">
                <Button
                    variant={view === 'chat' ? 'default' : 'outline'}
                    onClick={() => setView('chat')}
                    className="mr-2 hover:bg-opacity-90 transition-colors"
                >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                </Button>
                <Button
                    variant={view === 'documents' ? 'default' : 'outline'}
                    onClick={() => setView('documents')}
                    className="hover:bg-opacity-90 transition-colors"
                >
                    <FileText className="mr-2 h-4 w-4" />
                    Documents
                </Button>
            </div>
        </div>
    );
}
