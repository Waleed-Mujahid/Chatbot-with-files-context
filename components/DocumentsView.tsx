import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Trash2, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import DocumentPreviewDialog from './DocumentPreviewDialog';
import { Document } from '@/types/document';

export default function DocumentsView({ documents, handleDeleteDocument, fileInputRef, handleFileUpload }: {
    documents: Document[];
    handleDeleteDocument: (id: number) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {documents.map((doc) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center text-sm sm:text-base">
                                        <span className="truncate">{doc.name}</span>
                                        <div className="flex gap-2">
                                            <DocumentPreviewDialog doc={doc} />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="icon" className="hover:bg-opacity-90 transition-colors">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the document.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteDocument(doc.id)}>
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {doc.type.startsWith('image/') ? (
                                        <img src={doc.url} alt={doc.name} className="w-full h-32 sm:h-40 object-cover rounded-md" />
                                    ) : (
                                        <p className="text-xs sm:text-sm text-muted-foreground mb-4">{doc.name}</p>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {documents.length === 0 && (
                <div className="text-center mt-8">
                    <AlertTriangle className="mx-auto h-12 w-12 text-warning" />
                    <h2 className="mt-2 text-lg font-semibold">No documents found</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Start by adding some documents to your collection.</p>
                </div>
            )}
        </>
    );
}
