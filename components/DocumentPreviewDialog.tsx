import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Document } from '@/types/document';

export default function DocumentPreviewDialog({ doc }: { doc: Document }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{doc.name}</DialogTitle>
                </DialogHeader>
                {doc.type.startsWith('image/') ? (
                    <img src={doc.url} alt={doc.name} className="w-full object-contain rounded-md" />
                ) : (
                    <pre className="whitespace-pre-wrap">{doc.content}</pre>
                )}
            </DialogContent>
        </Dialog>
    );
}
