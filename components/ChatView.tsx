import React from 'react';
import { Message } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import { BotIcon, UserIcon } from 'lucide-react';
import ReactMarkdown from "react-markdown";

export default function ChatView({ messages, messagesEndRef }: { messages: Message[]; messagesEndRef: React.RefObject<HTMLDivElement> }) {
    return (
        <>
            {messages.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                className={`flex items-start gap-3 ${message.role === 'assistant' ? 'bg-muted' : ''} p-4 rounded-lg`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex-shrink-0">
                                    {message.role === 'assistant' ? (
                                        <BotIcon className="h-6 w-6 text-primary" />
                                    ) : (
                                        <UserIcon className="h-6 w-6 text-secondary" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <ReactMarkdown>{message.content}</ReactMarkdown>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground text-center">Start a conversation or upload files to send.</p>
                </div>
            )}
        </>
    );
}