import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function InputSection({ input, handleInputChange, handleSendMessage, isLoading, fileInputRef, handleFileUpload }: {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="border-t border-border p-4 relative z-10">
            <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                <Input
                    name="input"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading} className="hover:bg-opacity-90 transition-colors">
                    {isLoading ? 'Sending...' : 'Send'}
                </Button>
                <Button onClick={() => fileInputRef.current?.click()} className="hover:bg-opacity-90 transition-colors">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                </Button>
                <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.txt,.doc,.docx,.csv, application/pdf"
                    multiple
                />
            </form>
        </div>
    );
}